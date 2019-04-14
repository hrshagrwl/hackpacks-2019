const express = require('express')
const bodyParser = require('body-parser')
const Multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
  res.sendFile('./index.html', {root: __dirname });
});

const getTranscript = require('./api/getTranscipt');
const sendFileToGCS = require('./middleware/sendFileToGCS');

global.CLOUD_BUCKET = 'packhacks-2019';

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

app.listen(port, () => {
  console.log("App is listening on port : ", port);
});

module.exports = app