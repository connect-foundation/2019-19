require('dotenv').config();

const tableName = { movie: process.env.movie_table };
const esVideoId = process.env.es_videoId;
const esLikes = process.env.es_likes;
const esCategory = process.env.es_category;
const esName = process.env.es_name;
const query = require('../utils/query.js');

const filterSize = 40;
const searchSize = 40;

const ElasticSearch = {
  async filterController(target, order, categoryList) {
    let resp = null;

    if (target === esVideoId || target === esLikes) {
      resp = await query.filterPipe(
        target,
        order,
        query.getFiltering,
        filterSize,
      );
    } else if (target === esCategory) {
      resp = await query.filterPipe(
        target,
        null,
        query.getCategory,
        filterSize,
        categoryList,
      );
    }
    console.log(resp);
    return resp;
  },
};

// const SearchController = {
//   async getResult(column, order, target) {
//     let resp = '';
//     resp = await query.filterPipe(
//       column,
//       order,
//       query.getSearch,
//       filterSize,
//       null,
//       target,
//     );
//     console.log(resp);
//   },
// };

// SearchController.getResult(esName, 'asc', 'Aspernatur veritatis quia');

// FilterController.filterController(esCategory, 'desc', ['스포츠', '게임']);
// ElasticSearch.filterController(esCategory, 'desc', ['스포츠']);
// FilterController.filterController(esVideoId, 'asc'); //비디오 번호순
// FilterController.filterController(esLikes, 'desc'); // 좋아요 순
// FilterController.filterController("reg_date","desc");  //최신 등록 컨텐츠 순

module.exports = ElasticSearch;
