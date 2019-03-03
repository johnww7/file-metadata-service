'use strict';

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var fileData = require('./fileItem.js').FileUpload;

// require and use "multer"...
var multer = require('multer');
//var storage = multer.memoryStorage();
var timeout = 350000;


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
});

var upload = multer({
  storage: storage
});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

var saveFile = require('./fileItem.js').saveFile;
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  let filePath = 'files/'+ req.file.orignalname;
  let fileDetails = {
    name: req.file.originalname,
    path: filePath,
    fileType: req.file.mimetype,
    size: req.file.size
  };
  let createTimeout = setTimeout(() => {next({message: 'timeout'}) }, timeout);
  saveFile(fileDetails, (err, data) => {
    clearTimeout(createTimeout);
    if(err) {
      console.error('File did not upload to db');
    }
    if(data) {
      res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      });
    }
  });

});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
