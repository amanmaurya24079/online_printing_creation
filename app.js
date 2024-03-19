const express = require('express');
const app = express();
const appRouter = require('./app_router/upload');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
require('./fileCleanup')

app.use('/', appRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload = multer({
    storage: storage,
    limits:10000
  })


  app.use('/profile', express.static('upload/images'));
  app.post("/upload",upload.single('profile'), (req, res) => {
    
 
    
res.json({
        success: 1,  
        profile_url: `http://localhost:3000/profile/${req.file.filename}`
    })
  })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
