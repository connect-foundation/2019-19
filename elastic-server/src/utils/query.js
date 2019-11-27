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



module.exports.filter_pipe = filter_pipe;
module.exports.get_filtering = get_filtering;
