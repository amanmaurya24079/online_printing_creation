const express = require('express');
const app = express();
const appRouter = require('./app_router/upload');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const cors = require('cors'); 
require('./fileCleanup')

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*',
  allowedHeaders: ['Content-Type']
}));

app.use('/', appRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());







const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
