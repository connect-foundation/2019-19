const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();

// AWS S3 정보
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";

// AWS S3 설정
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
});

const S3 = new AWS.S3({
  endpoint,
  region
});

const Storage = {
  uploadVideo: async (localFilePath, videoName, fileDir, options) => {
    const dirName = "videos";
    const bucketPath = fileDir
      ? `${process.env.BUCKET_NAME}/${fileDir}`
      : `${process.env.BUCKET_NAME}/${dirName}`;
    const ACL = options ? options.ACL : "private";

    // 파일 업로드
    try {
      await S3.putObject({
        Bucket: bucketPath,
        Key: videoName,
        ACL,
        Body: fs.createReadStream(localFilePath)
      }).promise();
    } catch (err) {
      console.log(`S3 에러: ${err}`);
      return false;
    }

    console.log(`${videoName} 업로드 완료!`);
    return true;
  },

  downloadVideo: async (localDirPath, videoName, bucketPath) => {
    // 해당 비디오의 폴더가 존재하지 않으면 생성
    if (fs.existsSync(localDirPath) === false) {
      fs.mkdirSync(localDirPath);
    }

    // Storage부터 해당 비디오 다운로드 시작
    const outStream = fs.createWriteStream(`${localDirPath}/${videoName}`);
    const inStream = S3.getObject({
      Bucket: bucketPath,
      Key: videoName
    }).createReadStream();
    inStream.pipe(outStream);

    // 다운로드가 완료되면 메세지 출력!
    await new Promise((resolve, reject) => {
      inStream
        .on("end", () => {
          console.log(`${bucketPath} -> ${videoName} 다운로드 완료!`);
          resolve();
        })
        .on("error", err => {
          console.log(`${bucketPath} -> ${videoName} 다운로드 에러!`);
          console.log(`${err}`);
          reject();
        });
    });
  },

  // bucketPath/ 에 있는 특정 영상들 삭제
  deleteObjects: params => {
    S3.deleteObjects(params, (err, data) => {
      if (err) console.log(err, err.stack);
    });
  }
};

module.exports = Storage;
