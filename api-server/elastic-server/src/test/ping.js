const {client} = require('../utils/elastic_connection.js');


client.ping({
    requestTimeout: 30000
}, function(error) {
    if (error) {
        console.trace('Error:', error);
    } else {
        console.log('Connected!');
    }
    // on finish
    client.close();
});