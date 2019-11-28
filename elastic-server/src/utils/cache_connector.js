const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key
});

const S3 = new AWS.S3({
    endpoint,
    region
});

const bucket_name = process.env.bucket_name;
const MAX_KEYS = 300;

const params = {
    Bucket: bucket_name,
    MaxKeys: MAX_KEYS
};


module.exports.S3 = S3;
module.exports.params = params;