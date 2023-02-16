const express = require('express');
const app = express();

app.use(express.static('public'));

const mylogger = (req, res, next) => {
  console.log('Mylogger');
  next();
};

app.use(mylogger);

app.get('/', (req, res, next) => {
  let photo = {
    id: 1,
    description: 'Profile photo',
    isAded: true,
  };
  res.send(photo);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}...`);
});
