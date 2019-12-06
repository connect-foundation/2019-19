const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);

const Parser = require("./Parser");

const Segmenter = {
  createSegment: async (videosDir, fileName) => {
    // 비디오 정보
    const fileNameWithoutExt = Parser.removeExtension(fileName);
    const resolutionFilePathList = Parser.createLocalDirPath(
      videosDir,
      fileNameWithoutExt
    );

    const resolutions = [];
    resolutionFilePathList.forEach(resolutionFilePath => {
      const resolutionFilename = Parser.removeExtension(resolutionFilePath);

      console.log(`${resolutionFilePath} ffmpeg encoding 시작!`);
      const segmenter = ffmpeg(resolutionFilePath, { timeout: 432000 })
        .addOptions([
          // "-threads 2", // cpu 사용율을 제한하기 위한 스레드 제한
          "-start_number 0",
          "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
          "-level 3.0",
          "-hls_time 10", // 10 second segment duration
          "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
          "-f hls" // HLS format
        ])
        .output(`${resolutionFilename}.stream.m3u8`);

      resolutions.push(
        new Promise((resolve, reject) => {
          segmenter.run();

          segmenter.on("end", function() {
            console.log("성공!");
            resolve();
          });

          segmenter.on("error", function(err) {
            console.error("Error while ffmpeg processing:", err);
            reject();
          });
        })
      );
    });

    await Promise.all(resolutions);
  }
};

module.exports = Segmenter;
