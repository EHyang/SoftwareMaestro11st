# API

## 1. 로그인 및 회원가입

  + 주소 : [3.34.117.4:3000/login](http://3.34.117.4:3000/login)
  + 방식 : post
  + 요청 : { 'google_id' : string, 'token' : string }
  + 응답
    - 성공 { 'res' : my_key, 'state' : (0,1,2) 현재 상태 }
    - 실패 { 'res' : '-1', 'state' : '-1' }


## 2. 스캔 데이터 삽입

  + 주소 : [3.34.117.4:3000/scan](http://3.34.117.4:3000/scan)
  + 방식 : post
  + 요청 : [ { 'my_key' : string, 'scan_key' : string, 'scan_time' : datetime }, { 'my_key' : string, 'scan_key' : string, 'scan_time' : datetime }, ... ]
  + 응답 : { 'res' : '(0 성공, -1 실패)' }

## 3. 선별진료소 정보

  + 주소 : [3.34.117.4:3000/hospital_check](http://3.34.117.4:3000/hospital_check)
  + 방식 : get
  + 응답 : [ { 'num' : int, 'name': string, 'x': double, 'y': double, 'phone': string }, ... ]

## 4. 확진 정보 등록

  + 주소 : [3.34.117.4:3000/confirmed](http://3.34.117.4:3000/confirmed)
  + 방식 : post  
  + 요청 : { 'my_key' : string }
  + 응답 : { 'res' : '(0 성공, -1 실패)' }

## 5. 접촉 상태 확인

  + 주소 : [3.34.117.4:3000/state](http://3.34.117.4:3000/state)
  + 방식 : post
  + 요청 : { 'my_key' : string }
  + 응답 :
    - 성공 { 'res' : (0,1,2) 현재 상태 }
    - 실패 { 'res' : '-1' }

## 6. 지역별 누적 확진 현황

  + 주소 : [3.34.117.4:3000/local](http://3.34.117.4:3000/local)
  + 방식 : get
  + 응답 :
    - 성공 
```json
{
  'seoul': string,
  'busan': string,
  'daegu': string, 
  'incheon': string, 
  'gwangju': string, 
  'daejeon': string, 
  'ulsan': string, 
  'sejong': string, 
  'gyeonggi': string, 
  'gangwon': string, 
  'chungbuk': string,
  'chungnam': string,
  'jeonbuk': string,
  'jeonnam': string,
  'gyeongbuk': string,
  'gyeongnam': string,
  'jeju': string,
  'quarantine': string,
}
```
    - 실패 { 'res' : '-1' }


## 7. 일일 누적 확진 현황

  + 주소 : [3.34.117.4:3000/count](http://3.34.117.4:3000/count)
  + 방식 : get
  + 응답 :
    - 성공
```json
{
  'confirmed': string,
  'confirmed_up': string,
  'examined': string,
  'examined_up': string,
  'normal': string,
  'normal_up': string,
  'dead': string,
  'dead_up': string,
  'time': string,
}
```
    - 실패 { 'res' : '-1' }

