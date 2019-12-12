const youtubedl = require("youtube-dl");
const fs = require("fs");
const data = require("./data.js");

Object.values(data).forEach(category => {
  category.forEach(url => {
    const video = youtubedl(
      url,
      // Optional arguments passed to youtube-dl.
      ["--format=18"],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname }
    );

    // Will be called when the download starts.
    video.on("info", function(info) {
      console.log("Download started");
      console.log(`filename: ${info._filename}`);
      console.log(`size: ${info.size}`);

      video.pipe(fs.createWriteStream(`../videos/${info.id}.mp4`));
    });
  });
});
