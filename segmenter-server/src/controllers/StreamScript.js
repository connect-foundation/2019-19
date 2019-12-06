const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Storage = require("../modules/Storage");
const LocalStorage = require("../modules/LocalStorage");
const Transcoder = require("../modules/Transcoder");
const Parser = require("../modules/Parser");
const Segmenter = require("../modules/Segmenter");

const videoNames = ["360p.mp4", "480p.mp4", "720p.mp4"];

const StreamScript = {
  // Object storage에 영상들 업로드하는 함수
  uploadVideos: async (videosDir, files) => {
    // Upload 작업의 Promise 배열 만들기
    const uploads = files.reduce((acc, fileName) => {
      if (Parser.isVideo(fileName) === false) {
        console.log("There is non-video file!");
        return acc;
      }

      const localFilePath = path.resolve(videosDir, fileName);
      acc.push(Storage.uploadVideo(fileName, localFilePath));
      return acc;
    }, []);

    // Upload 작업 병렬 처리
    await Promise.all(uploads);

    // 파일 목록 반환
    return files;
  },

  // 최초 원본 영상들을 삭제하는 함수
  removeOriginalVideos: videosDir => {
    LocalStorage.removeVideo(videosDir);
  },

  // localVideoDir의 비디오들을 삭제하는 함수
  removeVideos: async (videosDir, files) => {
    files.forEach(fileName => {
      const fileDir = Parser.removeExtension(fileName);
      const fileDirPath = `${videosDir}/${fileDir}`;
      LocalStorage.removeVideo(fileDirPath);
    });
  },

  // localVideoDir 디렉토리를 삭제하는 함수
  removeSegments: async (videosDir, files) => {
    files.forEach(fileName => {
      const fileDir = Parser.removeExtension(fileName);
      const fileDirPath = `${videosDir}/${fileDir}`;
      LocalStorage.removeSegment(fileDirPath);
      LocalStorage.removeVideoDir(fileDirPath);
    });
  },

  // Transcoder API에 다수의 Job 생성 요청 보내는 함수
  requestJobs: async files => {
    // requestJob 작업의 Promise 배열 만들기
    const requests = files.map(fileName => {
      return Transcoder.requestJob(fileName);
    });

    // requestJob 작업 병렬 처리
    await Promise.all(requests);
  },

  // Object Storage에서 분할할 비디오를 다운로드하는 함수
  downloadVideos: async files => {
    const totalDownloads = files.reduce((acc, fileName) => {
      const dirName = Parser.removeExtension(fileName);
      const bucketPath = process.env.BUCKET_NAME + "/transcoded/" + dirName;

      // downloadVideo 작업들을 push
      videoNames.forEach(videoName => {
        acc.push(Storage.downloadVideo(dirName, videoName, bucketPath));
      });
      return acc;
    }, []);

    // downloadVideo 작업 병렬 처리
    await Promise.all(totalDownloads);
  },

  // Object Storage에서 분할할 비디오를 다운로드하는 함수
  downloadVideo: async fileName => {
    const totalDownloads = [];
    const dirName = Parser.removeExtension(fileName);
    const bucketPath = process.env.BUCKET_NAME + "/transcoded/" + dirName;

    // downloadVideo 작업들을 push
    videoNames.forEach(videoName => {
      totalDownloads.push(
        Storage.downloadVideo(dirName, videoName, bucketPath)
      );
    });

    // downloadVideo 작업 병렬 처리
    await Promise.all(totalDownloads);
  },

  // 다운로드받은 360/480/720p 영상들을 분할하는 함수
  createSegments: async (videosDir, files) => {
    const listSize = files.length;
    for (let i = 0; i < listSize; i++) {
      const fileName = files[i];
      await Segmenter.createSegment(videosDir, fileName);
    }
  },

  uploadSegments: async (videosDir, files) => {
    let uploads = [];

    files.forEach(fileName => {
      const fileDir = `${videosDir}/${Parser.removeExtension(fileName)}`;
      const streams = fs.readdirSync(fileDir);

      // Upload 작업의 Promise 배열 만들기
      streams.forEach(stream => {
        const localFilePath = path.resolve(fileDir, stream);
        uploads.push(Storage.uploadVideo(stream, localFilePath, fileDir));
      });
    });

    // Upload 작업 병렬 처리
    await Promise.all(uploads);
  }
};

module.exports = StreamScript;
