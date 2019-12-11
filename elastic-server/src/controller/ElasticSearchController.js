require('dotenv').config();
const table_name = {movie : process.env.movie_table};
const es_videoId = process.env.es_videoId;
const es_likes = process.env.es_likes;
const es_category = process.env.es_category;
const es_name = process.env.es_name;
const query = require('../utils/query.js');



const FilterController = {
  FILTER_SIZE : 40,
  filter_controller : async function(column,order,category_list) {
    
    let resp = null;
    if(column===es_videoId || column===es_likes || column==es_name){
      resp = await query.get_filtering(column, order, this.FILTER_SIZE);
    }
    else if(column==es_category){
      resp = await query.get_category(category_list, order, this.FILTER_SIZE);
    }
    console.log(resp);
    return resp;

    }
};

const SearchController = {
  
  SEARCH_SIZE : 40,
  get_result: async function(column,target,order){
    
    let resp = "";
    resp = await query.get_search(column,target,order,this.SEARCH_SIZE);
        
    console.log(resp);
    return resp;
  }  
}   

//console.log(SearchController.get_result("name","Au","asc"));
//console.log(SearchController.get_result('category','게','asc'));
//console.log(FilterController.filter_controller('category','asc',['음악']));
//console.log(FilterController.filter_controller('name','asc'));

module.exports.FilterController = FilterController;