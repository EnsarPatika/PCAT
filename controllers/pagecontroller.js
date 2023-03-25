const Photo = require('.././models/Photo.js');


exports.getAboutPage = (req, res, next) => {
  res.render('about');
};

exports.getAddPage = (req, res, next) => {
  res.render('addphoto');
};

exports.getEditPhotoPage = async (req, res, next) => {
    const photo = await Photo.find({ _id: req.params.id });
    res.render('photoedit', {
      photo,
    });
  }
