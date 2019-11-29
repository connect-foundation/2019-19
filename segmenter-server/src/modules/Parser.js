const path = require("path");

const Parser = {
  isVideo: fileName => {
    const extension = fileName.slice(fileName.length - 3);
    const regExp = new RegExp("(mp4|avi|mkv|flv$)", "i");
    return regExp.test(extension);
  },

  removeExtension: fileName => {
    return fileName.slice(0, fileName.length - 4);
  },

  createStoragePath: fileName => {
    return `/videos/${fileName}`;
  },

  createLocalDirPath: (videosDir, name) => {
    const videoNames = ["360p.mp4", "480p.mp4", "720p.mp4"];
    const list = videoNames.reduce((acc, val) => {
      acc.push(path.resolve(videosDir, name, val));
      return acc;
    }, []);

    return list;
  },

  removeWhiteSpace: fileName => {
    return fileName.replace(/\s+/g, "");
  }
};

module.exports = Parser;
