const express = require("express");

const router = express.Router();

const Script = require("../src/controllers/Script");

// 원본영상을 업로드하고, Job생성을 요청
router.post("/videos", async (req, res) => {
  Script.trimVideos();
  const result = await Script.uploadVideos();
  res.json({ result });
});

// Job 상태변경에 대한 알림을 받은 뒤, 개별항목에 대해 스트림 데이터 생성
router.post("/segment", async (req, res) => {
  const { jobId } = req.body;

  Script.createStream(jobId);
  res.json({ result: "요청성공!" });
});

module.exports = router;
