const fs = require("fs");

const StreamScript = require("./StreamScript");
const Transcoder = require("../modules/Transcoder");

const StreamController = {
  uploadVideos: async () => {
    // video directory는 서버의 최상위에 존재하는 디렉토리여야 한다.
    const files = fs.readdirSync("videos");

    // Storage에 videos 디렉토리 내의 원본 영상 업로드
    console.log("업로드 시작!");
    await StreamScript.uploadVideos("videos", files);
    console.log("업로드 완료!\n");

    // nCloud Transcoder API에 Job 생성을 요청한다.
    console.log("Transcode Job생성 요청!");
    try {
      await StreamScript.requestJobs(files);
      console.log("Transcoder Job생성 요청완료!\n");
      return true;
    } catch (err) {
      console.log(`Transcoder Job생성 요청실패!\n${err}\n`);
      return false;
    }
  },

  createStream: async jobId => {
    try {
      // 현재 Job에 대한 fileName 조회
      const fileName = await Transcoder.getFileNameOfJob(jobId);

      // fileName 조회를 할 수 없다면, 실패
      if (fileName === false) {
        throw new Error("fileName이 없는 콜백!");
      }

      const files = [fileName];

      // 현재 Job이 완성되었다는 응답값을 받으면 해당 영상을 다운로드한다.
      console.log("Segmenter 서버에 해당 영상 다운로드!");
      await StreamScript.downloadVideos(files);
      console.log("Segmenter 서버에 영상 다운로드 완료!");

      // 트랜스코딩된 영상들을 스트림 데이터로 분할하기
      console.log("Segmeneter 서버에서 분할 작업 시작!");
      await StreamScript.createSegments("videos", files);
      console.log("Segmeneter 서버에서 분할 작업 완료!");

      // 360/480/720p 원본영상 삭제하기
      console.log("360/480/720 원본영상 삭제 시작!");
      await StreamScript.removeVideos("videos", files);
      console.log("360/480/720 원본영상 삭제 완료!");

      // 스트림 데이터 스토리지에 업로드하기
      console.log("Segmenter 서버에서 분할 파일 업로드 시작!");
      await StreamScript.uploadSegments("videos", files);
      console.log("Segmenter 서버에서 분할 파일 업로드 완료!");

      // 스트림 데이터 삭제하고 디렉토리까지 지우기
      console.log("Segmenter 서버에서 스트림 데이터 삭제 시작!");
      await StreamScript.removeSegments("videos", files);
      console.log("Segmenter 서버에서 스트림 데이터 삭제 완료!");

      // 원본 영상 삭제하기
      console.log("원본영상 삭제 시작!");
      StreamScript.removeOriginalVideos("videos");
      console.log("원본영상 삭제 완료!\n");

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};

module.exports = StreamController;
