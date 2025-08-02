# Docker Compose 서비스 네트워크 및 컨테이너 간 통신 가이드

## docker-compose.yml 에서 서비스와 네트워크

Docker Compose는 기본적으로 `docker-compose.yml` 파일에 정의된 서비스들을 하나의 사용자 정의 네트워크에 연결함. 이 내부 네트워크 내에서 각 서비스는 `서비스 이름`을 호스트 이름처럼 사용하여 다른 서비스에 접근 가능.

```yml
services:
  mysql: # <-- (1) 서비스 이름 (다른 컨테이너에서 접근 시 사용)
    image: mysql:8.0
    container_name: fight-club-mysql # <-- (2) 컨테이너 이름 (도커 내부 관리용)
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_password # <-- (3) MySQL root 사용자 비밀번호 초기 설정
      MYSQL_DATABASE: mysql_database_name # <-- (4) 초기 생성될 데이터베이스 이름
      MYSQL_USER: my_user_name # <-- (5) 초기 생성될 일반 사용자 이름
      MYSQL_PASSWORD: my_pass_word # <-- (6) 초기 생성될 일반 사용자 비밀번호
    ports:
      # - 'mysql_host_port:mysql_container_port' # <-- (7) 포트 매핑 (외부 접근용, 외부에서 접근 할 이유가 없으니 굳이 열어둘 필요 없음)
    networks:
      - fight-club # <-- (8) 컨테이너 네트워크 (내부 통신용)

  spring:
    ...
    depends_on:
      - mysql # <-- (9) MySQL 컨테이너가 먼저 시작되도록 의존성 설정
    ...
    networks:
      - fight-club # <-- (10) Spring 컨테이너도 동일 네트워크에 참여
```

여기서 `mysql:` `spring:` 이 서비스 이름 부분이 네트워크 별칭 즉 호스트 이름이 됨.

- 서비스 이름 (예: `mysql`, `spring`): docker-compose.yml 파일에서 각 서비스 정의의 최상단에 오는 이름입니다. 이 이름이 `네트워크 별칭(alias)`이자 다른 컨테이너가 해당 서비스에 접근할 때 사용할 호스트 이름이 됨.
- 컨테이너 이름 (예: `fight-club-mysql`): container_name으로 지정하는 이름은 Docker 내부에서 해당 컨테이너를 식별하고 관리하는 용도로 사용됩니다. 컨테이너 간 통신 시 호스트 이름으로 사용되지 않음.

Docker Compose 네트워크 내에서 다른 서비스(spring)가 MySQL 서비스에 접근할 때 사용하는 호스트 이름은 컨테이너 이름이 아닌 서비스 이름이 된다는 것.

### Spring application.yml 데이터소스 설정

```yml
spring:
  ...
  datasource:
    url: jdbc:mysql://{mysql_service_name}:{mysql_host_port}/{mysql_database_name}
      username: my_user_name
      password: my_pass_word
      driver-class-name: com.mysql.cj.jdbc.Driver
```

- `{mysql_service_name}`: docker-compose.yml에 정의된 MySQL `서비스 이름`인 `mysql`이 들어감.
- `{mysql_container_port}`: MySQL 컨테이너 내부에서 MySQL 서버가 실제로 리스닝하는 포트. MySQL의 기본 포트는 `3306`으로 docker-compose.yml의 ports 설정(HOST_PORT:CONTAINER_PORT) 중 CONTAINER_PORT 값과 동일함.
  - 예를들어 3306:3306 이면 mysql_container_port 은 3306
  - 외부로 통하는 포트가 변경된 3307:3306 이라도 mysql_container_port 은 여전히 3306
- 물론 mysql 과 spring 이 docker-compose 네트워크에 포함되어 있다면 `내부 통신`이 가능하므로 `포트 매핑`이 필요없다.

### 포트

앞서 말했듯이 Docker Compose는 기본적으로 정의된 서비스들을 하나의 사용자 정의 네트워크에 연결함. 따라서 컨테이너 외부에서 직접 mysql 을 접근할 이유가 없다면 굳이 포트 매핑으로 외부 포트를 열어 둘 필요가 없음. 동일한 네트워크에 연결된 서비스끼리는 내부 통신으로.
