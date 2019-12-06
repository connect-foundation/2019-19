const fetch = require("node-fetch");
require("dotenv").config();

const Signature = require("./Signature");
const Parser = require("./Parser");
const Job = require("./Job");

// Transcoder 모듈
const Transcoder = {
  requestJob: async fileName => {
    const URL = "https://vodtranscoder.apigw.ntruss.com/api/v2/jobs";
    const timestamp = Date.now();

    // API 요청을 위한 시그네처
    const signature = Signature.create(
      process.env.SECRET_KEY,
      "POST",
      "/api/v2/jobs",
      String(timestamp),
      process.env.ACCESS_KEY
    );

    // Job 정보설정
    const name = Parser.removeExtension(fileName);
    const path = Parser.createStoragePath(fileName);
    const job = Job.createJob(name, path, process.env.BUCKET_NAME);

    // Transcoder에 Job생성을 요청
    const data = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
        "x-ncp-iam-access-key": process.env.ACCESS_KEY,
        "x-ncp-apigw-api-key": process.env.API_KEY,
        "x-ncp-apigw-signature-v2": signature,
        "x-ncp-apigw-timestamp": timestamp
      }
    });
    const result = await data.json();
    console.log(`${fileName}요청상태: ${result.error.message}`);
  },

  getJobInfo: async jobId => {
    const URL = `https://vodtranscoder.apigw.ntruss.com/api/v2/jobs/${jobId}`;
    const timestamp = Date.now();

    // API 요청을 위한 시그네처
    const signature = Signature.create(
      process.env.SECRET_KEY,
      "GET",
      `/api/v2/jobs/${jobId}`,
      String(timestamp),
      process.env.ACCESS_KEY
    );

    // Transcoder에 Job정보를 요청
    const data = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-apigw-api-key": process.env.API_KEY,
        "x-ncp-iam-access-key": process.env.ACCESS_KEY,
        "x-ncp-apigw-signature-v2": signature
      }
    });
    const result = await data.json();

    // 상태와 파일네임 반환
    const { status } = result.jobs[0];
    const { fileName } = result.jobs[0].inputs[0].metadata;
    return { status, fileName };
  }
};

module.exports = Transcoder;
