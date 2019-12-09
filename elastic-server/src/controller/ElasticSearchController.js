<<<<<<< HEAD
require('dotenv').config();

const tableName = { movie: process.env.movie_table };
const esVideoId = process.env.es_videoId;
const esLikes = process.env.es_likes;
const esCategory = process.env.es_category;
const esName = process.env.es_name;
const query = require('../utils/query.js');

const filterSize = 40;
const searchSize = 40;

const FilterController = {
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
=======
require('dotenv').config();

const tableName = { movie: process.env.movie_table };
const esVideoId = process.env.es_videoId;
const esLikes = process.env.es_likes;
const esCategory = process.env.es_category;
const esName = process.env.es_name;
const query = require('../utils/query.js');

const filterSize = 40;
const searchSize = 40;

const FilterController = {
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
  },
};

const SearchController = {
  async getResult(column, order, target) {
    let resp = '';
    resp = await query.filterPipe(
      column,
      order,
      query.getSearch,
      filterSize,
      null,
      target,
    );
    console.log(resp);
  },
};

// SearchController.getResult(esName, 'asc', 'Aspernatur veritatis quia');

// FilterController.filterController(esCategory, 'desc', ['스포츠', '게임']);
FilterController.filterController(esCategory, 'desc', ['스포츠']);
// FilterController.filterController(esVideoId, 'asc'); //비디오 번호순
// FilterController.filterController(esLikes, 'desc'); // 좋아요 순
// FilterController.filterController("reg_date","desc");  //최신 등록 컨텐츠 순

module.export = FilterController;
=======

require('dotenv').config();
const table_name = {movie : process.env.movie_table};
const es_videoId = process.env.es_videoId;
const es_likes = process.env.es_likes;
const es_category = process.env.es_category;
const es_name = process.env.es_name;

const query = require('../utils/query.js');

const FILTER_SIZE = 40;
const SEARCH_SIZE = 40;

const FilterController = {

    filter_controller : async function(column,order,category) {

        let resp = null;
        if(column===es_videoId || column===es_likes){

            resp = await query.get_filtering(column, order, FILTER_SIZE);
        }
        else if(category==es_category){

            
            resp = await query.get_category(column, order, FILTER_SIZE);
        }
        console.log(resp);
        return resp;

>>>>>>> 7d103901d5f63078c32a9c5e700affd191b780b9
    }

<<<<<<< HEAD
    console.log(resp);
  },
};

=======
>>>>>>> 7d103901d5f63078c32a9c5e700affd191b780b9
const SearchController = {
  async getResult(column, order, target) {
    let resp = '';
    resp = await query.filterPipe(
      column,
      order,
      query.getSearch,
      filterSize,
      null,
      target,
    );
    console.log(resp);
  },
};

<<<<<<< HEAD
// SearchController.getResult(esName, 'asc', 'Aspernatur veritatis quia');

// FilterController.filterController(esCategory, 'desc', ['스포츠', '게임']);
FilterController.filterController(esCategory, 'desc', ['스포츠']);
// FilterController.filterController(esVideoId, 'asc'); //비디오 번호순
// FilterController.filterController(esLikes, 'desc'); // 좋아요 순
// FilterController.filterController("reg_date","desc");  //최신 등록 컨텐츠 순

module.export = FilterController;
=======
    get_result: async function(column,target,order){

        let resp = "";
        resp = await query.get_search(column,target,order,SEARCH_SIZE);
        
        //console.log(resp);
        return resp;
    }

    
}   
//console.log(query.get_filtering("name","asc"));
//console.log(query.get_category(['게','코']),'asc');
//console.log(query.get_search("category","게","asc",SEARCH_SIZE));
//console.log(query.get_search("name","Au",FILTER_SIZE));

//console.log(SearchController.get_result("name","Au","asc"));
//console.log(SearchController.get_result('category','게','asc'));
//console.log(FilterController.filter_controller(['게임','코미디'],'asc','category'));
//console.log(FilterController.filter_controller('name','asc'));
>>>>>>> 7d103901d5f63078c32a9c5e700affd191b780b9
