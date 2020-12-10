grok 터널을 통해 aws 보안 그룹 포트를 열지 않고 private 서버에서 통신 테스트를 진행할 수 있다.

https://dashboard.ngrok.com/get-started/setup

사용 예:

```sh
./ngrok http 3000
```

이렇게 하면 `http://f6dcc40f9c5a.ngrok.io/` 이러한 임의 배정된 외부의 주소와 로컬호스트의 해당 주소 사이의 터널을 뚫어주므로 외부에서 개발 서버와의 통신 api 테스트를 할 수 있다.