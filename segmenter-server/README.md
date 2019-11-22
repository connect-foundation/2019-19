# Segmenter-Server

## 개발 기간
2019.11.11 ~ 2019.11.20

## 개발 환경
- node (12.13.0)
- npm (6.13.0)
- fluent-ffmpeg (library)
- aws-sdk (library)
- nCloud (cloud)
  - Server
  - Object Storage
  - CDN+
  - VOD Transcoder

---

## 설치 및 사용
1. repository 다운로드 및 패키지 설치
    ```shell
    git clone
    npm install
    ```

2. 환경변수 설정
    ```
    ACCESS_KEY={ncloud API인증키의 Access Key ID}
    SECRET_KEY={ncloud API인증키의 Secret Key}
    BUCKET_NAME={Object Storage Bucket Name}
    API_KEY={ncloud API Gateway에서 발급받은 API KEY}
    PRESET360ID={Transcoder에서 360p 트랜스코딩을 위한 프리셋ID}
    PRESET480ID={Transcoder에서 480p 트랜스코딩을 위한 프리셋ID}
    PRESET720ID={Transcoder에서 720p 트랜스코딩을 위한 프리셋ID}
    ```

3. 스트리밍 데이터를 생성할 원본 영상 파일을 `videos/` 폴더에 위치

4. 서버 실행
   
5. {host}/api/videos에 HTTP POST 요청

## 작동 과정
***Segmenter Server에 저장되는 원본 및 중간산출물은 삭제됩니다***

1. 원본 영상 파일들을 Object Storage에 업로드
2. VOD Transcoder API에 해당 영상들을 360/480/720p로 트랜스코딩해달라는 Job을 요청
3. VOD Transcoder는 해당 영상들을 트랜스코딩하고, 이를 Storage에 저장
4. 개별 Job이 완료되면, 그에 대한 콜백으로 HTTP POST 요청이 {host}/api/segment에 전송
5. 트랜스코딩이 완료된 개별 파일을 fluent-ffmpeg를 이용하여 스트림 데이터로 분할
6. 스트림 데이터를 Storage에 업로드
7. CDN+이 업로드된 스트림 데이터를 캐싱하여 사용자에게 제공

---

## 개선할 점
1. 원본영상 및 중간산출물을 Segmenter Server에서만 지우는 게 아니라, Object Storage에서도 지워야 함
2. 현재 5개 미만의 비디오만 테스트해본 상태. 대량의 비디오를 한꺼번에 업데이트할 경우 작동하지 않을 수 있음. `예상되는 제한: 12회 (Transcoder API가 초당 12회 요청 제한)`
3. Segmenter Server에 원본 비디오를 어떻게 위치시킬 것인가? 전송? 업로드? 서버 내 크롤링?
4. CDN이 정상적으로 캐싱할 수 있도록, 스트림 데이터만을 Storage에서 `Public 권한` 부여할 것