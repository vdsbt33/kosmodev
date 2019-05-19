create schema HabiTracK;
use HabiTracK;

create table HAB_KEYHAB (
  kha_identi int not null auto_increment,
  kha_name varchar(100) not null,
  kha_descri varchar(3000) default '',
  kha_crdate datetime not null,
  kha_eddate datetime,
  
  primary key (kha_identi)
);
