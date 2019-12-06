var elasticsearch = require('elasticsearch');
require('dotenv').config();

const port = process.env.elasticsearch_port;
const protocol = 'http';
const hostUrls = [
    process.env.public_ip

];

const hosts = hostUrls.map(function(host) {
    return {
        protocol: protocol,
        host: host,
        port: port
    };
});

const client = new elasticsearch.Client({
    hosts: hosts
});


module.exports.client = client;
