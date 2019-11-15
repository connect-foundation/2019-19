const fetch = require("node-fetch");
require("dotenv").config();

const Signature = require('./Signature');
const Parser = require('./Parser');
const Job = require('./Job');

// API 요청 정보
const URL = "https://vodtranscoder.apigw.ntruss.com/api/v2/jobs";
const timestamp = Date.now();

// API 요청을 위한 시그네처
const signature = Signature.createSignature(
  process.env.SECRET_KEY,
  "POST",
  "/api/v2/jobs",
  String(timestamp),
  process.env.ACCESS_KEY
);

// Transcoder 모듈
const Transcoder = {
  requestJob: async (fileName) => {
    // Job 정보설정
    const name = Parser.removeExtension(fileName)
    const path = Parser.createStoragePath(fileName);
    const job = Job.createJob(
      name,
      path,
      process.env.BUCKET_NAME
    );

    // Transcoder에 Job생성을 요청
    const data = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
        "x-ncp-iam-access-key": process.env.ACCESS_KEY,
        "x-ncp-apigw-api-key": process.env.API_KEY,
        "x-ncp-apigw-signature-v2": signature,
        "x-ncp-apigw-timestamp": timestamp,
      }
    });
    const result = await data.json();
    console.log(`${fileName}요청상태: ${result.error.message}`);
  },
}

module.exports = Transcoder;
