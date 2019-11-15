const StreamController = require('./controllers/StreamController');

(async () => {
  
  // video directory는 서버의 최상위에 존재하는 디렉토리여야 한다.
  // console.log("업로드시작!");
  // const files = await StreamController.uploadVideos('videos');
  // console.log("업로드완료!\n");
  
  // console.log("Transcode Job생성 요청!");
  // await StreamController.requestJobs(files);
  // console.log("Transcoder Job생성 요청완료!\n");
  
  // // 임시 목업 파일
  // const files = [
  //   "남자가을코디 블레이저 남친룩 7가지 코디(3분 세로룩북).mp4",
  //   "Beef - 11704.mp4",
  //   "Food - 24999.mp4"
  // ]

  // TODO: 현재 Job이 완성되었다는 응답값을 받은 뒤, 이를 실행해야 한다...
  console.log("Segmenter 서버에 해당 영상 다운로드!");
  await StreamController.downloadVideos(files);
  console.log("Segmenter 서버에 영상 다운로드 완료!");

  // console.log("Segmeneter 서버에서 분할 작업 시작!")

  // console.log("Segmeneter 서버에서 분할 작업 완료!");
})();



