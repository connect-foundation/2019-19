const { client } = require('./elastic_connection.js');
const index = process.env.index;
const type = '_doc';
(function init() {
  Promise.resolve()
    .then(deleteIndex, handleError)
    .then(createIndex, handleError)
    .then(checkStatus, handleError)
    .then(closeIndex, handleError)
    .then(putSettings, handleError)
    .then(putMapping, handleError)
    .then(openIndex, handleError);
})();
function deleteIndex() {
  console.log('Deleting old index ...');
  return client.indices
    .delete({
      index: index,
      ignore: [404],
    })
    .then(handleResolve);
}
function createIndex() {
  console.log('Creating new index ...');
  return client.indices
    .create({
      index: index,
      body: {
        settings: {
          index: {
            number_of_replicas: 0, // for local development
          },
        },
      },
    })
    .then(handleResolve);
}
// This isn't strictly necessary, but it solves a problem with closing
// the index before it has been created
function checkStatus() {
  console.log('Checking status ...');
  return client.cluster
    .health({
      index: index,
    })
    .then(handleResolve);
}
function closeIndex() {
  console.log('Closing index ...');
  return client.indices
    .close({
      index: index,
    })
    .then(handleResolve);
}
function putSettings() {
  console.log('Put settings ...');
  return client.indices
    .putSettings({
      index: index,
      body: {
        settings: {
          analysis: {
            analyzer: {
              autocomplete: {
                tokenizer: 'autocomplete',
                filter: ['lowercase'],
              },
              autocomplete_search: {
                tokenizer: 'lowercase',
              },
              korean: {
                filter: ['npos_filter', 'nori_readingform', 'lowercase'],
                tokenizer: 'nori_user_dict',
              },
            },
            tokenizer: {
              autocomplete: {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 30,
                token_chars: ['letter', 'digit', 'whitespace'],
              },
              nori_user_dict: {
                mode: 'mixed',
                type: 'nori_tokenizer',
                user_dictionary: 'userdic_ko.txt',
              },
            },
            filter: {
              npos_filter: {
                type: 'nori_part_of_speech',
                stoptags: [
                  'E',
                  'IC',
                  'J',
                  'MAG',
                  'MM',
                  'SP',
                  'SSC',
                  'SSO',
                  'SC',
                  'SE',
                  'XPN',
                  'XSA',
                  'XSN',
                  'XSV',
                  'UNA',
                  'NA',
                  'VSV',
                ],
              },
            },
          },
        },
      },
    })
    .then(handleResolve);
}
function putMapping() {
  console.log('Put mapping ...');
  return client.indices
    .putMapping({
      index: index,
      body: {
        _source: {
          enabled: true,
        },
        properties: {
          name: {
            type: 'text',
            analyzer: 'autocomplete',
            search_analyzer: 'korean',
          },
          likes: { type: 'long' },
          reg_date: { type: 'date' },
          streaming_url: { type: 'text' },
          thumbnail_video_url: { type: 'text' },
          thumbnail_img_url: { type: 'text' },
          video_id: { type: 'long' },
          category: {
            type: 'text',
            analyzer: 'autocomplete',
            search_analyzer: 'korean',
          },
        },
      },
    })
    .then(handleResolve);
}
function openIndex() {
  console.log('Open index ...');
  return client.indices
    .open({
      index: index,
    })
    .then(handleResolve);
}
function handleResolve(body) {
  if (!body.error) {
    console.log('\x1b[32m' + 'Success' + '\x1b[37m');
  } else {
    console.log('\x1b[33m' + 'Failed' + '\x1b[37m');
  }
  return Promise.resolve();
}
function handleError(err) {
  console.error(JSON.stringify(err.body, null, 2));
  return Promise.reject();
}
