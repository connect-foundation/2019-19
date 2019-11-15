const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

const Storage = require('./Storage');
const Parser = require('./Parser');

const Segmenter = {

}

// 비디오 정보
const videoPath = path.join(__dirname, "../videos/");
const testPath = path.join(
  videoPath,
  "/슈퍼맨이 돌아왔다 302회 티저 - 월벤져스네.mp4"
);

// 스트림 데이터로 분할하는 작업 시작
console.log("ffmpeg encoding");
ffmpeg(testPath, { timeout: 432000 })
  .addOptions([
    "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
    "-level 3.0",
    "-hls_time 10", // 10 second segment duration
    "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
    "-f hls" // HLS format
  ])
  .output(videoPath + "test.m3u8")
  .on("end", function() {
    console.log("성공!")
  })
  .on("error", function(err) {
    console.error("Error while ffmpeg processing:", err);
  })
  .run();

module.exports = Segmenter;
