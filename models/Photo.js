const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdDate: {
        type: Date,
        default: new Date().setHours(new Date().getHours() + 3)
    }
  });

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo