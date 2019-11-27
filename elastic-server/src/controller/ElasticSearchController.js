
require('dotenv').config();
const table_name = {movie : process.env.movie_table};
const es_videoId = process.env.es_videoId;
const es_likes = process.env.es_likes;
const es_category = process.env.es_category;
const es_name = process.env.es_name;
const query = require('../utils/query.js');

const filter_Size = 40;
const Search_Size = 40;

const FilterController = {

    filter_controller : async function(target,order,category_list) {

        let resp = null;

        if(target===es_videoId || target===es_likes){

            resp = await query.filter_pipe(target,order,query.get_filtering, filter_Size);
        }
        else if(target==es_category){

            resp = await query.filter_pipe(target,null,query.get_category, filter_Size, category_list);
        }
        
        console.log(resp);

    }
};
//FilterController.filter_controller(es_category,"desc",['스포츠','게임']);
//FilterController.filter_controller(es_videoId,"asc");   //비디오 번호순
//FilterController.filter_controller(es_likes,"desc");    //좋아요 순
//FilterController.filter_controller("reg_date","desc");  //최신 등록 컨텐츠 순