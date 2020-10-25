"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const db = new DB("sqlitedb")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

process.env.TZ='UTC';

// Registers user
router.post('/register', function (req, res) {
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});

// Registers Admin
router.post('/register-admin', function (req, res) {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});

// router.post('/save-userSelection', function (req, res) {
//     db.insertAdmin([
//         req.body.fly_from,
//         req.body.email,
//         bcrypt.hashSync(req.body.password, 8),
//         1
//     ],
//         function (err) {
//             if (err) return res.status(500).send("There was a problem registering the user.")
//             db.selectByEmail(req.body.email, (err, user) => {
//                 if (err) return res.status(500).send("There was a problem getting user")
//                 let token = jwt.sign({ id: user.id }, config.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                 });
//                 res.status(200).send({ auth: true, token: token, user: user });
//             });
//         });
// });

// Login
router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send({ auth: false, message: 'Incorrect Email' });
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({ fieldName: 'password', auth: false, message: 'Incorrect password' });
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
})

/*
  Fetch weather detail from metaweather api for the given date and city.
*/
router.post('/fetchWeather', (req, res) => {
    const url = "https://www.metaweather.com/api/location/" + req.body.woeid + '/' + req.body.date;

    const get_data = async url => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();

            res.status(200).send({ auth: true, json });
        } catch (error) {
            console.dir(error)
            res.status(500).send('Error on the server.');
        }
    };

    get_data(url);
})



const get_formatedDate = (timestamp) => { 
    let formattedTime = new Date(timestamp * 1000);
   

    formattedTime = formattedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: "Europe/London" })
    
    return formattedTime;
}

/*
  Search flights for the selected option from skypicker/kiwi.  
*/
router.post('/searchFlights', (req, res) => {
    let current_url = new URL('https://api.skypicker.com/flights');

    current_url.searchParams.append('fly_from', req.body.fly_from);
    current_url.searchParams.append('fly_to', req.body.fly_to);
    current_url.searchParams.append('date_from', req.body.date_from);
    current_url.searchParams.append('partner', 'picky')

    //Request max_stopovers, one_for_city are static now, it can be added as a filter in FE to make more dynamic.
    current_url.searchParams.append('max_stopovers', 1)
    current_url.searchParams.append('one_for_city', 1)


    const get_data = async current_url => {
        try {
            const response = await fetch(current_url);
            let result = await response.json();
            const currency = result.currency;

            for (let i = 0, len = result.data.length; i < len; i++) {

                let price = result.data[i].price.toLocaleString('nl-nl', { style: 'currency', currency: currency })

                result.data[i].formattedPrice = price;
                result.data[i].departureTime = get_formatedDate(result.data[i].dTime)
                result.data[i].arrivalTime = get_formatedDate(result.data[i].aTime)
            }

            res.status(200).send({ result });
        } catch (error) {
            console.dir(error)
            res.status(500).send('Error on the server.');
        }
    };

    get_data(current_url);
})

app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
});