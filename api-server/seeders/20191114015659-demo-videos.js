const videoCategoryDomain = [
  '스포츠',
  '과학기술',
  '여행',
  '음악',
  '엔터테인먼트',
  '교육',
  '코미디',
  '뷰티/패션',
  '영화/애니메이션',
  '게임',
  '노하우/스타일',
  '뉴스/정치',
  '애완동물/동물',
];

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

const demoData = [];
for (let i = 0; i < 200; i += 1) {
  const tempVideo = casual.random_element(videoStreamingUrlDomain);
  const videoObj = {
    video_id: null,
    name: casual.title,
    category: casual.random_element(videoCategoryDomain),
    likes: casual.integer(1, 500),
    reg_date: new Date(Date.now()),
    thumbnail_img_url: `https://picsum.photos/id/${i}/1600/640`,
    thumbnail_video_url: tempVideo,
    streaming_url: tempVideo,
  };
  demoData.push(videoObj);
}

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('videos', data, {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('videos', null, {});
  },
};
