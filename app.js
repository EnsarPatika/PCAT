const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const app = express();
const Photo = require('./models/Photo.js');
app.set('view engine', 'ejs'); // For EJS

mongoose.connect('mongodb://127.0.0.1:27017/PCAT');

app.use(express.static('public')); // For Static folder in EXPRESS
app.use(express.urlencoded({ extended: true })); // For Post request encoding in EXPRESS
app.use(express.json()); // For Post request json formated in EXPRESS
const mylogger = (req, res, next) => {
  // Mıddleware function
  console.log('Mylogger');
  next();
};

// app.use(mylogger);

app.get('/', async (req, res, next) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/addphoto', (req, res, next) => {
  res.render('addphoto');
});
app.post('/photos', async (req, res, next) => {
  await Photo.create(req.body);
  res.redirect('/');
});
app.get('/photopage/:id', async (req, res, next) => {
  const photo = await Photo.find({ _id: req.params.id });
  res.render('photo', {
    photo,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}...`);
});
