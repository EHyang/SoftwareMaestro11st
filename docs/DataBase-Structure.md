# Table

## members

### 1. STRUCTURE

| 이름        | 형식         | 옵션                                     | 비고                           |
| ----------- | ------------ | ---------------------------------------- | ------------------------------ |
| num         | int          | auto_increment,<br>Not Null, Primary key |                                |
| google_id   | varchar(45)  | Not Null                                 |                                |
| token       | varchar(500) | Not Null                                 | 회원 가입시 저장               |
| my_key      | varchar(45)  | Not Null                                 | 회원 가입시 발급               |
| lastest_use | varchar(45)  | Not Null                                 | 접속시마다 업데이트            |
| state       | int          | Not Null, default = 0                    | 0 = 일반 1 = 접촉자 2 = 확진자 |
| degree      | int      | Not Null   |    |
| origin      | varchar(45)  | Not Null   |                |
| isolation | dataetime ||


### 2. SQL

```sql
 create table members (
	`num` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`google_id` VARCHAR(45) NOT NULL,
	`token` VARCHAR(500) NOT NULL,
	`my_key` VARCHAR(45) NOT NULL,
	`lastest_use` VARCHAR(45) NOT NULL,
	`state` INT DEFAULT 0 NOT NULL,
        `degree` INT DEFAULT 0,
        `origin` VARCHAR(45),
        `isolation` DATETIME
  );
```

------------------------------------

## Scan

### 1. STRUCTURE

| 이름      | 형식        | 옵션                                     | 비고                  |
| --------- | ----------- | ---------------------------------------- | --------------------- |
| my_key    | varchar(45) | Not Null, Primary Key                                 |                       |
| scan_key  | varchar(45) | Not Null, Primary Key                                 |                       |
| scan_time | datetime    | Not Null                                 | 14일 이후 데이터 삭제 |

### 2. SQL

```sql
  CREATE TABLE scan (
	`my_key` VARCHAR(45) NOT NULL,
	`scan_key` VARCHAR(45) NOT NULL,
	`scan_time` datetime NOT NULL,
        PRIMARY KEY (my_key, scan_key)
  );
```

---

## Hospital

### 1. STRUCTURE

| 이름 | 형식        | 옵션                                     | 비고 |
| ---- | ----------- | ---------------------------------------- | ---- |
| num  | int         | auto_increment,<br>Not Null, Primary key |      |
| name | varchar(50) | Not Null                                 |      |
| x    | varchar(80) | Not Null                                 |      |
| y    | varchar(80) | Not Null                                 |      |

### 2. SQL

```sql
CREATE TABLE hospital (
    `num` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `x` VARCHAR(80) NOT NULL,
    `y` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(50) NOT NULL
);
```

--------------------------------------

# Database

## ID / PW

  + id : dotdaDBadmin
  + pw : dotda1234

### connect in EC2 server

```
  mysql -u dotdaDBadmin -p -h dotda-public-db-dev.cmloh3khu1qp.ap-northeast-2.rds.amazonaws.com
```