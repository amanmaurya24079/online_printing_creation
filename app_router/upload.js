const express = require('express');
const appRouter = express.Router();
const multer = require("multer");
const path = require("path");
const mail=require("../services/mail")

appRouter.get('/',(req, res) => {

    res.status(200).json("server is on live on 3000 ")
});


appRouter.post('/send_mail',(req, res) => {

  console.log("data===",req.query)
    mail(req.query.emial,JSON.stringify(req.query))
    res.status(200).json(" Mail send successfully ")
});



const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
      }

  })


  appRouter.use('/profile', express.static('upload/images'));
  appRouter.post("/upload",upload.single('profile'), (req, res) => {
    
 
    
res.json({
        success: 1,  
        profile_url: `https://online-printing-creation.onrender.com/profile/${req.file.filename}`
    })
  })
module.exports = appRouter;
