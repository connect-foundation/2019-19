# <center> 안봐도 비디오 </center>

<center><img src="https://i.imgur.com/Zogwm5Y.png"></center>

### 소개
> #### Netflix clone project
> 컨텐츠 맞춤 추천을 기반으로 세상 모든 비디오를 스트리밍하는 서비스입니다.
- [Documentations](https://github.com/connect-foundation/2019-19/wiki)
- [Demo](http://www.abdvideo.ml/)
### 개발기간
- 2019.11.4 ~ 진행중

### 팀원
- [김민성](https://github.com/minsung1129)
- [김한비](https://github.com/KKambi)
- [신정수](https://github.com/jngsoo)
- [윤경호](https://github.com/zoomspeed)

### 개발환경
- Node (12.13.0) + Express (4.16.1)
- React (16.11.0) + Webpack (4.41.2)
- npm (6.13.0)
- Elastic Search + Logstash + mySQL
- nCloud
    - App Server + DB Server + Segmenter Server
    - Object Storage (Logstash Json)
    - Object Storage (Thumbnails & Streaming Data)
    - CDN+
    - VOD Transcoder

### 설치
1. 각 서버에 필요한 패키지 설치
```bash
npm install
```

2. 리액트 빌드
```bash
#client-server
npm run build
```

3. 환경변수 설정
```
#api-server
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_SECRET=
GOOGLE_OAUTH_CALLBACK_URL=
JWT_SECRET_KEY=
CLIENT_SERVER_URL=

#segmenter-server
ACCESS_KEY=
SECRET_KEY=
BUCKET_NAME=
API_KEY=
PRESET360ID=
PRESET480ID=
PRESET720ID=

#elastic-server
access_key=
secret_key=
search_dir=
bucket_name=
movie_table=
public_ip=
index=
es_videoId=
es_likes=
es_category=
es_name=
```

### 기능
#### client-server
- 메인 영상 썸네일
- 장르별 영상 카로셀
- 비디오 플레이어

#### api-server
- 컨텐츠 정보에 대한 API 응답

#### elastic-server
- elastic search 검색엔진을 사용, DSL쿼리 적용
- logstash로 로그수집 및 분석가능 
- shell script, crontab schedule으로 벌크로 가져온 데이터 1분마다 sync
- (추후 가능하면 Kibana로 데이터 시각화)
- API 호출로 해당 쿼리의 JSON 파일 응답 
#### segmenter-server
- 원본 영상 업로드
- nCloud VOD Transcoder를 통한 트랜스코딩(360, 480, 720p)
- 트랜스코딩된 영상을 다운로드받아, 스트리밍 데이터로 분할(m3u8 + ts)
- 스트리밍 데이터 업로드
