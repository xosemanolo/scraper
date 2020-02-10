const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config({path: __dirname + '/.env'})

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let message;
let task = cron.schedule('2 * * * *', () => {
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
            .then(message => console.log(message.sid))
            .catch(err => {
                console.log(err);
                return null;
            });
            console.log('done')
    }
    getLinkDetails()
})

task.start()
//async await promise built inside cron scheduler
//
//
//
//




