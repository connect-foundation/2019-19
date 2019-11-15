
const Job = {
  // 16:9 비율로만 트랜스코딩
  createJob: (inputFileName ,inputFilePath, bucketName) => ({
    jobName: "transcode-360-720",
    inputs: [
      {
        inputBucketName: bucketName,
        inputFilePath: inputFilePath
      }
    ],
    output: {
      outputBucketName: bucketName,
      outputFilePath: "/transcoded/" + inputFileName,
      thumbnailOn: "true",
      thumbnailBucketName: bucketName,
      thumbnailFilePath: "/thumbnails/",
      thumbnailFileFormat: "PNG",
      thumbnailAccessControl: "PRIVATE",
      outputFiles: [
        {
          presetId: "9b3b91bb-04c9-11e8-8379-00505685080f",
          outputFileName: "360p",
          accessControl: "PRIVATE"
        },
        {
          presetId: "9b7e8e2d-04c9-11e8-8379-00505685080f",
          outputFileName: "480p",
          accessControl: "PRIVATE"
        },
        {
          presetId: "9ba0951e-04c9-11e8-8379-00505685080f",
          outputFileName: "720p",
          accessControl: "PRIVATE"
        }
      ]
    }
  }),
}

module.exports = Job;
