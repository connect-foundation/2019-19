const casual = require('casual');

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

const demoData = [];
for (let i = 0; i < 200; i++) {
  const videoObj = {
    video_id: null,
    name: `영상 ${i}`,
    category: casual.random_element(videoCategoryDomain),
    likes: casual.integer(1, 500),
    reg_date: new Date(Date.now()),
    url: 'https:www.naver.com',
  };
  demoData.push(videoObj);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('videos', demoData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('videos', null, {});
  },
};
