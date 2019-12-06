const { client } = require('./elastic_connection.js');

const filterPipe = async (column, order, func, size, categoryList, target) => {
  const result = await func(column, order, size, categoryList, target);

  return result.hits.hits;
};

async function getFiltering(column, order, size) {
  const data = await client
    .search({
      index: process.env.index,
      type: '_doc',
      sort: [`${column}:${order}`],
      body: {
        size,
        query: {
          match_all: {},
        },
      },
    })
    .then(
      function(resp) {
        return resp;
      },
      function(err) {
        return err;
      },
    );
  return data;
}

async function getCategory(column, order, size, categoryList) {
  const data = await client
    .search({
      index: process.env.index,
      type: '_doc',
      sort: [`${column}:${order}`],
      body: {
        size,
        query: {
          match: {
            category: {
              query: categoryList.join(' '),
              operator: 'or',
            },
          },
        },
      },
    })
    .then(
      function(resp) {
        return resp;
      },
      function(err) {
        return err;
      },
    );
  return data;
}

async function getSearch(column, order, size, categoryList, target) {
  // console.log("@@@@@  ",target,column,size,order);
  const data = await client
    .search({
      index: process.env.index,
      type: '_doc',
      sort: [`${column}:${order}`],
      body: {
        size,
        query: {
          match: {
            name: 'Quisquam voluptas odit',
          },
        },
      },
    })
    .then(
      function(resp) {
        return resp;
      },
      function(err) {
        return err;
      },
    );
  return data;
}

module.exports.filterPipe = filterPipe;
module.exports.getFiltering = getFiltering;
module.exports.getCategory = getCategory;
module.exports.getSearch = getSearch;
