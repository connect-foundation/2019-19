const youtubedl = require('youtube-dl');
const casual = require('casual');
const fs = require('fs');
const data = require('./data.js');

const demoData = [];

const videoStreamingUrlDomain = [
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
];

Object.values(data).forEach((e, i) => {
  e.forEach(ee => {
    const url = ee;
    youtubedl.getInfo(url, (err, info) => {
      if (err) throw err;
      const tempVideo = casual.random_element(videoStreamingUrlDomain);
      const videoObj = {
        video_id: +info.id,
        name: info.fulltitle,
        category: Object.keys(data)[i],
        likes: info.like_count,
        reg_date: info.upload_date,
        thumbnail_img_url: info.thumbnail,
        thumbnail_video_url: tempVideo,
        streaming_url: tempVideo,
      };
      demoData.push(videoObj);

      const stringJson = `${JSON.stringify(videoObj)}\n`;
      fs.open('test.json', 'a', '666', function(err, id) {
        if (err) {
          console.log('file open err!!');
        } else {
          fs.write(id, stringJson, null, 'utf8', function(err) {
            console.log('file was saved!');
          });
        }
      });
    });
  });
});
