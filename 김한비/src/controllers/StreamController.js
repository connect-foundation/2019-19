const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Storage = require('../modules/Storage');
const Transcoder = require('../modules/Transcoder');
const Parser = require('../modules/Parser');

const videoNames = ['360p.mp4', '480p.mp4', '720p.mp4'];

const StreamController = {
  // Object storage에 영상들 업로드하는 함수
  uploadVideos: async (videoDir) => {
    // 특정 디렉토리의 파일 목록 불러오기
    const files = fs.readdirSync(videoDir);
    const regExp = new RegExp("(mp4|avi|mkv|flv$)", 'i');

    // Upload 작업의 Promise 배열 만들기
    const uploads = files.reduce((acc, fileName) => {
      const isVideo = regExp.test(fileName)
    
      if (isVideo === false) {
        console.log("There is non-video file!");
        return acc;
      }
    
      const localFilePath = path.resolve(videoDir, fileName);
      acc.push(Storage.uploadVideo(fileName, localFilePath));
      return acc;
    }, []);

    // Upload 작업 병렬 처리
    await Promise.all(uploads);

    // 파일 목록 반환
    return files;
  },
  
  // Transcoder API에 다수의 Job 생성 요청 보내는 함수
  requestJobs: async (files) => {
    // requestJob 작업의 Promise 배열 만들기
    const requests = files.map((fileName) => {
      return Transcoder.requestJob(fileName);
    });

    // requestJob 작업 병렬 처리
    await Promise.all(requests);
  },

  // Object Storage에서 분할할 비디오를 다운로드하는 함수
  downloadVideos: async (files) => {
    const totalDownloads = files.reduce((acc, fileName) => {
      const dirName = Parser.removeExtension(fileName)
      const bucketPath = process.env.BUCKET_NAME + "/transcoded/" + dirName;
      
      // downloadVideo 작업들을 push
      videoNames.forEach((videoName) => {
        acc.push(Storage.downloadVideo(dirName, videoName, bucketPath));
      });
      return acc;
    }, []);

    // downloadVideo 작업 병렬 처리
    await Promise.all(totalDownloads);
  },
}

module.exports = StreamController;
