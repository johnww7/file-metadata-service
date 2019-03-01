'use strict';

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var fileData = require('./fileItem.js').FileUpload;

// require and use "multer"...
var multer = require('multer');
//var storage = multer.memoryStorage();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
});

var upload = multer({
  storage: storage,
  limits: {fileSize: 400000 }
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


app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
