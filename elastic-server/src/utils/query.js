const {client} = require('./elastic_connection.js');

const filter_pipe = async (column,order,func,size, category_list,target) =>{
    let result = await func(column,order,size, category_list,target);

    return result.hits.hits;
}

async function get_filtering(column, order, size){
 
    return await client.search({
        index: process.env.index,
        type: 'data',
        sort : [`${column}:${order}`],
        body: {
            size : size,
            query: {
                match_all: {}
            
            }
        }
    }).then(function(resp){
        return resp;
    },function(err){
        return err;
    })

};

async function get_category(column, order, size, category_list){

    return await client.search({
        index: process.env.index,
        type: 'data',
        //sort : [`${column}:${order}`],
        body: {
            size : size,
            query: {                
                match: {
                    category : {
                        
                        query : category_list.join(" "),
                        operator : "or"
                        
                    }
                }
            
            }
        }
    }).then(function(resp){
        return resp;
    },function(err){
        return err;
    })
}



async function get_search(column, order, size,category_list,target){
 

    //console.log("@@@@@  ",target,column,size,order);
    return await client.search({
        index: process.env.index,
        type: 'data',
        sort : [`${column}:${order}`],
        body: {
            size : size,
            query: {
                match : {
                    name : 'Quisquam voluptas odit'
                }
            
            }
        }
    }).then(function(resp){
        return resp;
    },function(err){
        return err;
    })

};



module.exports.filter_pipe = filter_pipe;
module.exports.get_filtering = get_filtering;
module.exports.get_category = get_category;
module.exports.get_search = get_search;