const express = require("express");
const router = express.Router();

const StreamController = require("../src/controllers/StreamController");

// 원본영상을 업로드하고, Job생성을 요청
router.post("/videos", async (req, res, next) => {
  const result = await StreamController.uploadVideos();
  res.json({ result });
});

// 스트림 데이터를 생성
router.post("/segments", async (req, res, next) => {
  const result = await StreamController.createStreams();
  res.json({ result });
});

// Job 상태변경에 대한 알림을 받은 뒤, 개별항목에 대해 스트림 데이터 생성
router.post("/segment", async (req, res, next) => {
  const { jobId } = req.body;
  const result = await StreamController.createStream(jobId);
  res.json({ result });
});

module.exports = router;
