const axios = require('axios');
const cheerio = require('cheerio');

const encodeUrl = require('encodeurl');

const queryWord = '영화 리뷰';

const getHtml = async () => {
  try {
    const data = await axios.get(
      `https://www.youtube.com/results?search_query=${encodeUrl(queryWord)}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    const ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $('div');

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        title: $(this)
          .find('a')
          .attr('title'),
        url: `https://youtube.com/${$(this)
          .find('a')
          .attr('href')}`,
        image_url: $(this)
          .find('img')
          .attr('src'),
        image_alt: $(this)
          .find('p.poto a img')
          .attr('alt'),
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => console.log(res));
