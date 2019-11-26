const fs = require("fs");
const StreamController = require("./StreamController");
const Transcoder = require("../modules/Transcoder");
const LocalStorage = require("../modules/LocalStorage");
const Parser = require("../modules/Parser");

const Script = {
  trimVideos: () => {
    const files = fs.readdirSync("videos");
    files.forEach(fileName => {
      const newFileName = Parser.removeWhiteSpace(fileName);
      fs.rename(`videos/${fileName}`, `videos/${newFileName}`, err => {
        if (err) throw err;
        console.log(`videos/${newFileName} 공백 제거!`);
      });
    });
  },

  uploadVideos: async () => {
    // video directory는 서버의 최상위에 존재하는 디렉토리여야 한다.
    const files = fs.readdirSync("videos");

    // Storage에 videos 디렉토리 내의 원본 영상 업로드
    console.log("업로드 시작!");
    await StreamController.uploadVideos("videos", files);
    console.log("업로드 완료!\n");

    // nCloud Transcoder API에 Job 생성을 요청한다.
    console.log("Transcode Job생성 요청!");
    try {
      await StreamController.requestJobs(files);
      console.log("Transcoder Job생성 요청완료!\n");
      return true;
    } catch (err) {
      console.log(`Transcoder Job생성 요청실패!\n${err}\n`);
      return false;
    }
  },

  createStream: async jobId => {
    // 현재 Job에 대한 fileName 조회
    const { fileName, status } = await Transcoder.getJobInfo(jobId);

    if (status === "FAILED") {
      console.log("Transcoder API - FAILED callback");
      return false;
    }
    if (status === "PROGRESSING") {
      console.log("Transcoder API - FAILED callback");
      return false;
    }

    const files = [fileName];

    // 현재 Job이 완성되었다는 응답값을 받으면 해당 영상을 다운로드한다.
    console.log("Segmenter 서버에 해당 영상 다운로드!");
    await StreamController.downloadVideos("videos", files);
    console.log("Segmenter 서버에 영상 다운로드 완료!");

    // 트랜스코딩된 영상들을 스트림 데이터로 분할하기
    console.log("Segmenter 서버에서 분할 작업 시작!");
    await StreamController.createSegments("videos", files);
    console.log("Segmenter 서버에서 분할 작업 완료!");

    // 스트림 데이터 스토리지에 업로드하기
    console.log("Segmenter 서버에서 분할 파일 업로드 시작!");
    await StreamController.uploadSegments("videos", files);
    console.log("Segmenter 서버에서 분할 파일 업로드 완료!");

    // TODO: 스트림 데이터 DB에 연동하기
    console.log("Segmenter 서버에서 DB연동 시작!");
    StreamController.insertURLtoDB(files);

    // 로컬 영상 삭제하기
    // console.log("영상 삭제 시작!");
    // LocalStorage.removeVideos("videos", files);

    // 스토리지 영상 삭제하기
    console.log("스토리지 영상 삭제 시작!");
    StreamController.removeVideos(files);

    return true;
  }
};

module.exports = Script;
