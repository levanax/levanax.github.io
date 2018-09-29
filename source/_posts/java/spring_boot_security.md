---
layout: post
title: Spring boot+ mybatis + Spring security 集成
date: 2018-09-28 13:22:12
categories: Levan update
tags: Spring
keywords: Spring security
---

# Spring boot+ mybatis + Spring security 集成

项目使用 Maven 管理依赖

## 引入 Spring Security 库

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
    <version>2.0.4.RELEASE</version>
</dependency>
<dependency>
	<groupId>com.google.guava</groupId>
	<artifactId>guava</artifactId>
	<version>26.0-jre</version>
</dependency>
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-lang3</artifactId>
	<version>3.8</version>
</dependency>
```

<!--more -->

## 新建 AppUserDetailsAuthenticationProvider 类

类继承 AbstractUserDetailsAuthenticationProvider，代码如下:

```java
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
// 省略其他

@Component
public final class AppUserDetailsAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
@NonNull
@Autowired
IAuthenticationService userAuthenticationService;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails,
    		UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
    }

    /**
     * 根据token 查出 user对象，提供给spring security 以验证权限
     */
    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
    		throws AuthenticationException {
    	final Object token = authentication.getCredentials();
    	return Optional
    		      .ofNullable(token)
    		      .map(String::valueOf)
    		      //查出的对象，同时会进行权限判断
    		      .flatMap(userAuthenticationService::findByToken)
    		      .orElseThrow(() -> new UsernameNotFoundException("Cannot find user with authentication token=" + token));
    }

}
```

该类作用 给 spring security 提供一个 service 获取 指定类型'org.springframework.security.core.userdetails.UserDetails' 的对象，用于检查权限

## 新建 IAuthenticationService

```java
public interface IAuthenticationService {

      // 登入时，build 一个 UserDetails对象，存入 内存/Redis
	  Optional<String> login(String username, String password);

	  Optional<UserDetails> findByToken(String token);

	  void logout(UserDetails user);
}
```

## 新建 AuthenticationServiceImpl

实现 IAuthenticationService 接口

```java
import org.springframework.security.core.userdetails.User;
// ...

@Service
public class AuthenticationServiceImpl implements IAuthenticationService {
	/**
	 * key : token
	 * value: user
	 */
	private static Map<String,UserDetails> users;
	static{
		users=  new HashMap<String,UserDetails>();
	}

	@Autowired
	private IUserService userService;

	@Override
	public Optional<String> login(String username, String password) {
		String token = null;
		Integer userID = userService.login(username, password);
		if(Util.isNotNull(userID)) {
		    String uuid = UUID.randomUUID().toString();
		    token = uuid + username;
		    List<String>  roles = userService.queryRoles(userID);
		    String[] rolesTemp = roles.toArray(new String[roles.size()]);
			UserDetails userDetails = User.withUsername(username).password(password).roles(rolesTemp).build();
			users.put(token, userDetails);
		}
		return Optional.ofNullable(token);
	}

	/**
	 * 返回一个 spring 用于判断的 userDetials 对象
	 */
	@Override
	public Optional<UserDetails> findByToken(String token) {
		return Optional.ofNullable(users.get(token));
	}

	@Override
	public void logout(UserDetails user) {
	}
}
```

注意： UserDetails， 使用 org.springframework.security.core.userdetails.User 类 build() 方法生成

## 新建 NoRedirectStrategy

```java
import org.springframework.security.web.RedirectStrategy;
// ...
public class NoRedirectStrategy implements RedirectStrategy {

	@Override
	public void sendRedirect(HttpServletRequest arg0, HttpServletResponse arg1, String arg2) throws IOException {
		// TODO Auto-generated method stub

	}

}
```

## 新建 AppAuthenticationProcessingFilter

```java
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import static com.google.common.net.HttpHeaders.AUTHORIZATION;
// ...

public final class AppAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {
	private static final String BEARER = "Bearer";

	protected AppAuthenticationProcessingFilter(RequestMatcher requiresAuthenticationRequestMatcher) {
		super(requiresAuthenticationRequestMatcher);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

		final String param = ofNullable(request.getHeader(AUTHORIZATION)).orElse("");

		final String token = ofNullable(param).map(value -> removeStart(value, BEARER)).map(String::trim)
				.orElseThrow(() -> new BadCredentialsException("Missing Authentication Token"));

		final Authentication auth = new UsernamePasswordAuthenticationToken(token, token);
		return getAuthenticationManager().authenticate(auth);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		super.successfulAuthentication(request, response, chain, authResult);
		chain.doFilter(request, response);
	}

}
```

## 新建 AppBasicAuthenticationEntryPoint

```java
public class AppBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {


	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		super.commence(request, response, authException);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		this.setRealmName("TEST_REALM");
		super.afterPropertiesSet();
	}

}
```

认证服务

## 新建 AppSecurityConfigurer.java

```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class AppSecurityConfigurer extends WebSecurityConfigurerAdapter {

	private static final RequestMatcher PUBLIC_URLS = new OrRequestMatcher(new AntPathRequestMatcher("/public/**"),
			new AntPathRequestMatcher("/user/login"));

	private static final RequestMatcher PROTECTED_URLS = new NegatedRequestMatcher(PUBLIC_URLS);

	AppUserDetailsAuthenticationProvider provider;

	AppSecurityConfigurer(final AppUserDetailsAuthenticationProvider provider) {
		super();
		this.provider = requireNonNull(provider);
	}

	/**
	 * 配置 认证服务
	 */
	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(provider);
	}

	@Override
	public void configure(final WebSecurity web) {
		web.ignoring().requestMatchers(PUBLIC_URLS);
	}

	/**
	 * 配置 spring security ，url 权限分配
	 * 跨域设置 .cors()
	 *
	 */
	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		String[] putAntPatternsByAdmin = { "/products/{id}" };
		String[] deleteAntPatternsByAdmin = { "/products/**" };
		http.sessionManagement().sessionCreationPolicy(STATELESS).and().exceptionHandling()
				// this entry point handles when you request a protected page and you are not
				// yet
				// authenticated
				.defaultAuthenticationEntryPointFor(forbiddenEntryPoint(), PROTECTED_URLS).and()

				// role config
				.authorizeRequests().antMatchers(HttpMethod.PUT, putAntPatternsByAdmin).hasRole("ADMIN").and()
				.authorizeRequests().antMatchers(HttpMethod.DELETE, deleteAntPatternsByAdmin).hasRole("ADMIN").and()
				// provider
				.authenticationProvider(provider)
				.addFilterBefore(restAuthenticationFilter(), AnonymousAuthenticationFilter.class).authorizeRequests()

				// cors
				.requestMatchers(PROTECTED_URLS).authenticated().and().cors().and().csrf().disable().formLogin()
				.disable()
				// http 认证
				.httpBasic().realmName("TEST_REALM").authenticationEntryPoint(getBasicAuthEntryPoint())
				// ...
				.and().logout().disable();
	}

	@Bean
	AppAuthenticationProcessingFilter restAuthenticationFilter() throws Exception {
		final AppAuthenticationProcessingFilter filter = new AppAuthenticationProcessingFilter(PROTECTED_URLS);
		filter.setAuthenticationManager(authenticationManager());
		filter.setAuthenticationSuccessHandler(successHandler());
		return filter;
	}

	@Bean
	SimpleUrlAuthenticationSuccessHandler successHandler() {
		final SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
		successHandler.setRedirectStrategy(new NoRedirectStrategy());
		return successHandler;
	}

	/**
	 * Disable Spring boot automatic filter registration.
	 */
	@Bean
	FilterRegistrationBean disableAutoRegistration(final AppAuthenticationProcessingFilter filter) {
		final FilterRegistrationBean registration = new FilterRegistrationBean(filter);
		registration.setEnabled(false);
		return registration;
	}

	@Bean
	AuthenticationEntryPoint forbiddenEntryPoint() {
		return new HttpStatusEntryPoint(FORBIDDEN);
	}

	/**
	 * ref:
	 * https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#cors
	 * spring security @CrossOrigin setting
	 *
	 * @return
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		long maxAge = 60;
		configuration.setMaxAge(maxAge);
		configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	/**
	 * 认证
	 * http://websystique.com/spring-security/secure-spring-rest-api-using-basic-authentication/
	 *
	 * @return
	 */
	@Bean
	public AppBasicAuthenticationEntryPoint getBasicAuthEntryPoint() {
		return new AppBasicAuthenticationEntryPoint();
	}
}
```
