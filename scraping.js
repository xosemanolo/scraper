const axios = require('axios');
const cheerio = require('cheerio');


axios.get('https://careers.linkedin.com/reach/howtoapply').then((res) => {
    const $ = cheerio.load(res.data);

    console.log($('.banner-subheadline').html())
})