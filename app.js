const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const methodOverride = require('method-override')
const app = express();
const Photo = require('./models/Photo.js');
const fileUpload = require('express-fileupload');
const { METHODS } = require('http');
const photocontroller = require('./controllers/photocontroller.js')
const pagecontroller = require('./controllers/pagecontroller.js')

// EJS
app.set('view engine', 'ejs'); // For EJS

// DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/PCAT');
mongoose.set('strictQuery',true)

// MIDDLEWARE
app.use(express.static('public')); // For Static folder in EXPRESS
app.use(express.urlencoded({ extended: true })); // For Post request encoding in EXPRESS
app.use(express.json()); // For Post request json formated in EXPRESS
app.use(fileUpload());
app.use(methodOverride('_method',{methods:['POST','GET']}))
//ROUTES
const mylogger = (req, res, next) => {
  // Mıddleware function
  console.log('Mylogger');
  next();
};

// app.use(mylogger);

app.get('/', photocontroller.getAllphotos);
app.get('/about', pagecontroller.getAboutPage);
app.get('/addphoto', pagecontroller.getAddPage);
app.post('/photos', photocontroller.addPhoto);
app.get('/photopage/:id', photocontroller.getPhoto);
app.get('/photopage/edit/:id', pagecontroller.getEditPhotoPage);
app.put('/photopage/:id', photocontroller.updatePhoto);
app.delete('/photopage/:id', photocontroller.deletePhoto);
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}...`);
});
