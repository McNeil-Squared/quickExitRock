'use strict';

try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const pics = require('./pics.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// // serve static files in the public directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// pug template engine (formerly Jade)
 app.set('view engine','pug');
 app.set('views', __dirname + '/views');

app.get('/', function(req,res) {
  res.render('index');
});

app.get('/about', function(req,res) {
  res.render('about', {title: 'About Quick Exit'});
});

app.get('/gallery', function(req,res) {
  res.render('gallery', {title: 'Photo Gallery', gallery: pics.gallery});
});

app.get('/contact', function(req,res) {
  res.render('contact', {title: 'Contact Us'});
});

/*app.get('/test', function(req,res) {
  res.render('test', {gallery: pics.gallery});
});*/

app.post('/send', function(req,res) {
  console.log(req.body.name);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });
  const options = {
    from: 'SmellydogCodingNoReply@gmail.com',
    to: req.body.email,
    cc: 'angie.visnesky@gmail.com',
    subject: req.body.subject,
    text: 'This is a message from ' + req.body.name + ': ' + req.body.message
  }
  transporter.sendMail(options, function(error, info) {
    if (error) {
        console.log(error);
        res.send('Uh Oh!  Something went wrong!  Please click refresh and try again.')
    } else {
        console.log('Message sent: ' + info.response);
        res.send('Message successfully sent!  We will be contacting you shortly.');
    };
  });
});

// error pages
app.use(function (req, res, next) {
  res.status(404).redirect('/');
  // res.status(404).render('error',{status: '404', text1: 'Oh hai!  Sorry I couldn\'t find that page that you were looking for.', text2: 'But if you want to click the back button and try something else that\'s cool too.', title: "404"});
});

// app.use(function (err, req, res, next) {
//   res.status(500).render('error',{status: '500', text1: 'Uh oh.  It looks like something went wrong.  Just wait a couple minutes and try again.', text2: 'If you keep ending up back here, please tell Smellydog about it.', title: "500"});
//   console.log(err);
// });

// server
app.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});