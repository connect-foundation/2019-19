
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

    }
};

const SearchController = {

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