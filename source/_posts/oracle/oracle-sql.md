---
layout: post
title:  "Oracle SQL 记录"
date:   2018-05-08
categories: Levan update
tags: oracle sql
keywords: oracle sql
---

```
create table tbl_company_emp
(
empno NUMBER(4) PRIMARY KEY NOT NULL,
ename VARCHAR2(10 BYTE),
job VARCHAR2(9 BYTE),
mgr NUMBER(4),
hiredate DATE,
sal NUMBER(7,2),
comm NUMBER(7,2),
deptno NUMBER(4)
);

```
<!-- more -->
```


--添加列
ALTER table tbl_company_emp add description varchar2(200) null;

select * from tbl_company_emp;

insert into tbl_company_emp (empno) values  (1);


create or replace package pkg_emp as 
       type tmp_tbl is table of emp%rowtype index by binary_integer;
       type emprectyp is record(
            emp_no number,
            sal number
       )
       
       procedure fire_employye(p_emp_id number);
       
end pkg_emp;

create or replace package body pkg_emp as
       procedure fire_employye(p_emp_id number) is 
         begin
              delete form emp where empno=emp_id;
         end;
end pkg_emp

create or replace package pkg_test is 
       procedure add_data(p_empno in tbl_company_emp.empno%type, 
       p_ename  tbl_company_emp.ename%type,
       p_job  tbl_company_emp.job%type);
       
       procedure update_data(p_empno tbl_company_emp.empno%type, 
       p_ename  tbl_company_emp.ename%type,
       p_job  tbl_company_emp.job%type);
end pkg_test;

--特别注意分号结尾！！！！
create or replace package body pkg_test is

       procedure add_data(p_empno in tbl_company_emp.empno%type, 
       p_ename  tbl_company_emp.ename%type,
       p_job  tbl_company_emp.job%type) 
       is
       v_empnocount NUMBER;
       begin 
         select count(*) into v_empnocount from tbl_company_emp where empno = p_empno;
         if v_empnocount = 0
           then
             
             insert into tbl_company_emp (empno) values  (p_empno);
             end if;
       end;
       
       procedure update_data(p_empno tbl_company_emp.empno%type, 
       p_ename  tbl_company_emp.ename%type,
       p_job  tbl_company_emp.job%type) 
       is 
       begin
         update TBL_COMPANY_EMP set ename= p_ename, job = p_job  where empno=p_empno;
       end;
end pkg_test;

select * from TBL_COMPANY_EMP;


begin
 pkg_test.update_data('0489', 'dfgs', 'sdg');
end;



update TBL_COMPANY_EMP set ename='abc',job='job' where empno='1'


declare
empno TBL_COMPANY_EMP.Empno%type := 44;
job TBL_COMPANY_EMP.Job%type := 'gggg';
ename TBL_COMPANY_EMP.ename%type := 'rrr';
dml_sql varchar(2000) := 'update TBL_COMPANY_EMP set :setValSql where :conditionSql';
set_val_sql varchar(2000) :='';
condition_sql  varchar(2000) :='';
begin
      set_val_sql := set_val_sql || ',job='''||job||'''';
  if job <> ''
    then
      set_val_sql := set_val_sql || ',job='||job;
      end if;
      
      set_val_sql := set_val_sql || ',ename='''||ename||'''';
  if ename <> ''
    then
      set_val_sql := set_val_sql || ',ename='||ename;
      end if;
  DBMS_OUTPUT.PUT_LINE(set_val_sql);
  set_val_sql := substr(set_val_sql,2);
  condition_sql := ' empno='||empno;
  
  DBMS_OUTPUT.PUT_LINE(set_val_sql);
  DBMS_OUTPUT.PUT_LINE(condition_sql);
  execute immediate dml_sql using set_val_sql,condition_sql;
end;

--动态sql
create or replace function get_tablecount(table_name in varchar2)
return pls_integer
is
  sql_query varchar2(9999) := 'select count(*) from ' || table_name;
  l_return pls_integer;
  begin
    execute immediate sql_query into l_return;
    return l_return;
    end;

declare
    v_count pls_integer;
   begin
     v_count := get_tablecount('tbl_company_emp');
     DBMS_OUTPUT.PUT_LINE('tbl_company_emp count:' || v_count);
     end;
```
