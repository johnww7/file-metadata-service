var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 350000,
  socketTimeoutMS: 40000,
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback() {
  console.log('Connected to Mongo Database');
});

var FileItem = mongoose.FileSchema({
  name: {type: string},
  path: {type: string},
  fileType: {type: string},
  size: {type: integer}
});

let FileUpload = mongoose.model('FileUpload', FileItem);

exports.FileUpload = FileUpload;
