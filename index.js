const express = require('express')
const bodyParser = require('body-parser')
const Multer = require('multer');
const mime = require('mime-types');
const crypto = require('crypto');
const multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getTranscript = require('./api/getTranscipt');
const sendFileToGCS = require('./middleware/sendFileToGCS');
const translateAPI = require('./api/translate');

global.CLOUD_BUCKET = 'packhacks-2019';
global.GOOGLE_PROJECT_ID = 'leafy-chariot-237517';

// router = require('./router')
// router.route(app);

const port = 8000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + '.'+ mime.extension(file.mimetype));
    });
  }
});

const upload = multer({ storage: storage });

app.post(
  '/upload',
  upload.single('file'),
  sendFileToGCS,
  getTranscript
);

app.get(
  '/translate',
  translateAPI
);

app.listen(port, () => {
  console.log("App is listening on port : ", port);
});

module.exports = app