
const Parser = {
  removeExtension: (fileName) => {
    return fileName.slice(0, fileName.length-4)
  },

  createStoragePath: (fileName) => {
    return "/videos/" + fileName;
  }
}

module.exports = Parser;
