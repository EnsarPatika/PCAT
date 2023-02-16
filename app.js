const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs'); // For EJS

app.use(express.static('public')); // For Static folder in EXPRESS

const mylogger = (req, res, next) => {
  // Mıddleware function
  console.log('Mylogger');
  next();
};

// app.use(mylogger);

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/addphoto', (req, res, next) => {
  res.render('addphoto');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}...`);
});
