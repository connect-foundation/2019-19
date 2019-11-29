const elasticsearch = require('elasticsearch');
require('dotenv').config();

const port = process.env.elasticsearch_port;
const protocol = 'http';
const hostUrls = [process.env.public_ip];

const hosts = hostUrls.map(function(host) {
  return {
    protocol,
    host,
    port,
  };
});

const client = new elasticsearch.Client({
  hosts,
});

module.exports.client = client;
