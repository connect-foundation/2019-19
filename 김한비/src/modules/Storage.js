const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
require('dotenv').config();

// AWS S3 정보
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

// AWS S3 설정
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
})

const S3 = new AWS.S3({
  endpoint,
  region,
})

const Storage = {
  uploadVideo: async (name, localFilePath) => {
    let dirName = 'videos';

    // 파일 업로드
    await S3.putObject({
        Bucket: process.env.BUCKET_NAME + "/" + dirName,
        Key: name,
        Body: fs.createReadStream(localFilePath)
    }).promise();  

    console.log(`${name} 업로드 완료!`);
  },

  downloadVideo: async (dirName, videoName, bucketPath) => {
    // 해당 비디오의 폴더가 존재하지 않으면 생성
    const localDirPath = path.join(__dirname, dirName);
    !fs.existsSync(localDirPath) && fs.mkdirSync(localDirPath)

    // Storage부터 해당 비디오 다운로드 시작
    let outStream = fs.createWriteStream(localDirPath + '/' + videoName);
    let inStream = S3.getObject({
        Bucket: bucketPath,
        Key: videoName
    }).createReadStream(); 
    inStream.pipe(outStream);

    // 다운로드가 완료되면 메세지 출력!
    await new Promise((resolve) => {
      inStream.on('end', () => {
        console.log(`${bucketPath} -> ${videoName} 다운로드 완료!`);
        resolve();
      })
    });
  },
}

module.exports = Storage;
