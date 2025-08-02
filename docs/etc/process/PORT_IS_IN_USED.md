## 포트가 이미 열려있는 경우

이미 로컬 클라이언트 서버 3000이 열려있는 경우 다음 포트인 3001번에 열리긴 하는데, 기존 포트를 사용하고 싶다면 (프로세스가 제대로 종료되지 않았을 때) 해당 포트에 열려있는 서버를 강제로 종료해주어야 함.

```
// 포트에 열려있는 프로세스 확인
$ lsof -i :3000

// 결과
COMMAND   PID USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
node    12341  kjh   20u  IPv6 0x6138a6155560fd3a      0t0  TCP *:hbci (LISTEN)

// 프로세스 종료
$ kill -9 12341
```
