<p align="center">
  <img src="https://i.imgur.com/wf2hHlL.png">
</p>
<br>
<center>
<p align="center">
        <a href="https://github.com/connect-foundation/2019-19/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
        <img src="https://img.shields.io/github/issues/connect-foundation/2019-19"/>
        </a>
        <a href="https://github.com/connect-foundation/2019-19/wiki">
        <img src="https://img.shields.io/badge/documentation-yes-brightgreen"/>
        </a>
        <img src="https://img.shields.io/badge/License-MIT-brightgreen"/>
</p>
</center>



### 소개
> #### :tv:  Netflix clone project
> 컨텐츠 맞춤 추천을 기반으로 세상 모든 비디오를 스트리밍하는 서비스입니다.
> 


#### [:point_right: Homepage](http://www.abdvideo.ml/)

#### [:memo:  Documentations](https://github.com/connect-foundation/2019-19/wiki)

#### :tv: Demo Video (click :point_down:)

[![[부스트캠프 2019 19조 - 안봐도 비디오] 데모 동영상](http://img.youtube.com/vi/XcDHMs2Ni4k/0.jpg)](http://www.youtube.com/watch?v=XcDHMs2Ni4k "Demo Video")

<hr>

### 개발기간
- 2019.11.4 ~ 2019.12.19

### 팀원

| [김민성](https://github.com/minsung1129)     | [김한비](https://github.com/KKambi)   | [신정수](https://github.com/jngsoo)    |[윤경호](https://github.com/zoomspeed)|
| -------- | -------- | -------- |----|

### 개발환경
- Node (12.13.0) + Express (4.16.1)
- React (16.11.0) + Webpack (4.41.2)
- npm (6.13.0)
- Elastic Search + Logstash + MySQL
- nCloud
    - Server
        - App Server 
        - DB Server 
        - Segmenter Server
    - Object Storage (Logstash JSON)
    - Object Storage (Thumbnails videos & Streaming Data)
    - CDN+
    - VOD Transcoder




### 설치
1. 각 서버에 필요한 패키지 설치
```bash
#/api-server
npm install
#/client-server
npm install
```

2. 리액트 빌드
```bash
#client-server
npm run build
```

3. 환경변수 및 인프라 관련 설정
- `/api-server/.env`
- `/segmenter-server/.env`
- `/api-server/config/config.json`

### 기능
#### client-server
- 메인 영상 썸네일
- 영상별로 좋아요 & 찜하기
- 회원별로 추천기능
- 영상 검색 기능
- 장르별 영상 카로셀
- 비디오 플레이어
- 무한 스크롤

#### api-server
- 컨텐츠 정보에 대한 API 응답
- 구글 로그인

#### elastic-server
- elastic search 검색엔진을 사용, DSL쿼리 적용
- logstash로 로그수집 및 분석가능 
- shell script, crontab schedule으로 벌크로 가져온 데이터 1분마다 sync
- API 호출로 해당 요청에 대한 JSON 형식의 응답 

#### segmenter-server
- 원본 영상 업로드
- nCloud VOD Transcoder를 통한 트랜스코딩(360p, 480p, 720p)
- 트랜스코딩된 영상을 다운로드받아, 스트리밍 데이터로 분할(m3u8 + ts)
- 영상 정보 및 스트리밍 데이터 url(CDN+) DB에 저장
- 스트리밍 데이터 업로드
