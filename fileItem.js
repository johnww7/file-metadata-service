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

var FileItem = mongoose.Schema({
  name: {type: String},
  path: {type: String},
  fileType: {type: String},
  size: {type: Number}
});

let FileUpload = mongoose.model('FileUpload', FileItem);

let saveFile = (entry, done) => {
  let newFile = new FileUpload(entry);
  newFile.save((err, file)=> {
    if(err) {
      return console.error(err);
    }
    return done(null, file);
  });
}

exports.FileUpload = FileUpload;
exports.saveFile =  saveFile;
