const fs = require('fs');
const path = require('path');
const Parser = require('../modules/Parser');

const LocalStorage = {
  removeVideo: (localVideoDir) => {
    const files = fs.readdirSync(localVideoDir);
    files.forEach((fileName) => {
      if (Parser.isVideo(fileName)){
        const filePath = `${localVideoDir}/${fileName}`;
        if (fs.existsSync(filePath)){
          fs.unlinkSync(filePath, (err) => {
            if (err) {
              console.log(`${filePath} 파일 삭제 에러~${err}`)
            }
          });
        }
      }
    })
  },

  removeSegment: (localVideoDir) => {
    const files = fs.readdirSync(localVideoDir);
    files.forEach((fileName) => {
      const filePath = `${localVideoDir}/${fileName}`;
      if (fs.existsSync(filePath)){
        fs.unlinkSync(filePath, (err) => {
          if (err) {
            console.log(`${filePath} 파일 삭제 에러~${err}`)
          }
        });
      }
    })
  },

  removeVideoDir: (localVideoDir) => {
    if (fs.existsSync(localVideoDir)){
      try {
        fs.rmdirSync(localVideoDir);
      } catch(err) {
        console.log(`${localVideoDir} 디렉토리 삭제 에러~${err}`);
      }
    }
  }
};

module.exports = LocalStorage;
