const express = require('express')
const bodyParser = require('body-parser')
const Multer = require('multer');

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
const upload = Multer({ dest: 'uploads/' });

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