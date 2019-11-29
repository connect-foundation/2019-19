const AWS = require('aws-sdk');
const fs = require('fs');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.access_key,
  secretAccessKey: process.env.secret_key,
});

const S3 = new AWS.S3({
  endpoint,
  region,
});

const bucket_name = 'elasticstorage';
const local_file_path = './out.json';

(async () => {
  let object_name = 'sample-folder/';
  // create folder
  await S3.putObject(
    {
      Bucket: bucket_name,
      Key: object_name,
    },
    function(err, data) {
      if (err) console.log('err :  ', err, err.stack);
      else console.log('success :  ', data);
    },
  ).promise();

  object_name = 'movie_select.json';

  // upload file
  await S3.putObject({
    Bucket: bucket_name,
    Key: object_name,
    ACL: 'public-read',
    // ACL을 지우면 전체공개가 되지 않습니다.
    Body: fs.createReadStream(local_file_path),
  }).promise();
})();
