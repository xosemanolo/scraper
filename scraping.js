const axios = require('axios');
// let twilio = require('twilio');
const cheerio = require('cheerio');

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let message;

getLinkDetails = async () => {
    console.log('first')
        let res = await axios.get('https://careers.linkedin.com/reach/howtoapply')
        // console.log(res)
            const $ = cheerio.load(res.data);
            message = $('.banner-subheadline').text();
            console.log('second',message) 
         await client.messages.create({
            to: process.env.CELL_PHONE_NUMBER,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: message
        })
        // .then(message => console.log(message.sid));
        .catch(err => {
            console.log(err);
            return null;
        });
        console.log('done')
}
getLinkDetails()

// axios.get('https://careers.linkedin.com/reach/howtoapply').then((res) => {
    
// })






// .then((resp) => {
//     console.log(resp)
//     client.messages.create({
//         to: process.env.TWILIO_PHONE_NUMBER,
//         from: process.env.CELL_PHONE_NUMBER,
//         body: message
//     })
// })
// .then(message => console.log(message.sid));





