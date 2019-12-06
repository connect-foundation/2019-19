const fs = require("fs");
const Parser = require("../modules/Parser");

const LocalStorage = {
  removeVideos: (videosDir, files) => {
    files.forEach(fileName => {
      const fileNameWithoutExt = Parser.removeExtension(fileName);
      const productsPath = `${videosDir}/${fileNameWithoutExt}`;
      const products = fs.readdirSync(productsPath);
      products.forEach(productName => {
        const productPath = `${productsPath}/${productName}`;
        if (fs.existsSync(productPath)) {
          fs.unlinkSync(productPath, err => {
            if (err) {
              console.log(`${productPath} 파일 삭제 에러~${err}`);
            }
          });
        }
      });

      if (fs.existsSync(productsPath)) {
        fs.rmdirSync(productsPath);
      }
    });
  }
};

module.exports = LocalStorage;
