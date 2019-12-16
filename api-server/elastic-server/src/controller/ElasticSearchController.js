require('dotenv').config();
const table_name = { movie: process.env.movie_table };
const es_videoId = process.env.es_videoId;
const es_likes = process.env.es_likes;
const es_category = process.env.es_category;
const es_name = process.env.es_name;
const query = require('../utils/query.js');

const ElasticSearch = {
  /**
   * 
   * @param {string} column     video 테이블 안에 있는 column 이름
   * @param {string} order      "asc", "desc" 둘 중 하나만
   * @param {Array} category_list 카테고리 조회할 때만 쓰는거라 배열형태 (column 인자에 category 안쓰면 없어도 되는 인자?)
                       ['게임','스포츠'] or ['게임'] 단어 개수 딱 맞아야됨 ex) '음'으로 검색하면 '음악' 검색 안되고 '음악'으로 검색해야됨
**/

  filterController: async function(column, order, category_list, sort) {
    const SEARCH_SIZE = 40;
    let result = null;

    if (column === es_videoId || column === es_likes) {
      result = await query.get_filtering(column, order, SEARCH_SIZE);
    } else if (column == es_category) {
      result = await query.get_category(
        category_list,
        order,
        SEARCH_SIZE,
        sort,
      );
    }
    return result;
  },

  // 무조건 video 테이블만 뒤짐 | 초성만 넣어도 검색 됨
  /**
   *
   * @param {string} column ex) "name"
   * @param {string} target ex) "동영상제목?"
   * @param {string} order  ex) "asc", "desc"
   */
  getResult: async function(column, target, order) {
    const SEARCH_SIZE = 40;
    let result = '';
    result = await query.get_search(column, target, order, SEARCH_SIZE);
    return result;
  },
  getFiveRecentVideos: async () => {
    const result = await query.get_recent_videos(5);
    return result;
  },
  getPopularVideos: async () => {
    const result = await query.get_popular_videos(25);
    return result;
  },
  recommendContents: async size => {
    const result = await query.recommend_contents(size);
    return result;
  },
};

module.exports = ElasticSearch;
