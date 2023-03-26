const Photo = require('.././models/Photo.js');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/PCAT');
mongoose.set('strictQuery',true)

exports.getAllphotos = async (req, res, next) => {
  console.log(req.query)
  let page = req.query.page || 1;
  let pagePerPhoto = 2;
  let totalPhoto = await (await Photo.find({}).sort('-createdDate')).length;
  let totalPage = Math.ceil(totalPhoto/pagePerPhoto)
  let photos = await Photo.find({}).sort('-createdDate').skip((page-1)*pagePerPhoto).limit(pagePerPhoto);

  // const photos = await Photo.find({}).sort('-createdDate');
  res.render('index', {
    photos,
    page,
    pagePerPhoto,
    totalPage
  });
};

exports.getPhoto = async (req, res, next) => {
    const photo = await Photo.find({ _id: req.params.id });
    res.render('photo', {
      photo,
    });
  }

exports.addPhoto = async (req, res, next) => {
    // console.log(req.files.image);
    const uploadway = '/public/upload';
    console.log(__dirname)
  
    if (!fs.existsSync(__dirname + '/..' + uploadway)) {
      fs.mkdirSync(__dirname + '/..' + uploadway);
    }
    let imagevar = req.files.image;
    let imageName = req.files.image.name;
    let uploadPath = __dirname + '/..'+ uploadway + '/' + imageName;
    imagevar.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/upload/'+ imageName ,
      });
      res.redirect('/');
    });
  
    // await Photo.create(req.body);
  }

exports.updatePhoto = async (req, res, next) => {
    // console.log("Ensarr",req.body.title,req.body.description)
    const photo = await Photo.find({ _id: req.params.id });
    // const photo = await Photo.find({ _id: '63f6907591a1746c54924a17' })
    // photo.title = req.body.title
    // photo.description = req.body.description
    // photo.save()
    await Photo.findByIdAndUpdate(req.params.id ,{
      title: req.body.title,
      description : req.body.description
    })
    res.redirect(`/photopage/${req.params.id}`)
  }

exports.deletePhoto = async (req, res, next) => {
    const photo = await Photo.find({ _id: req.params.id });
    let deletedPhoto = __dirname + '/../' + 'public' + photo[0].image
    fs.unlinkSync(deletedPhoto);
    await Photo.deleteOne({ _id: req.params.id }); 
    res.redirect('/')
  }

