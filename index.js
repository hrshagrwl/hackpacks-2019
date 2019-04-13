const express = require('express')
const bodyParser = require('body-parser')
const async = require('async')
const Google_api = require('./app/models/google_api')
const Multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router = require('./router')
// router.route(app);

const port = 8000;
const upload = Multer({ dest: 'uploads/' });

app.post(
  '/upload',
  upload.single('file'),
  Google_api.sendUploadToGCS,
  (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      // return res.send(req.file.gcsUrl);
      console.log("req.file.gcsUrl");
      Google_api.get_transcript(req.file.gcsUrl);
    }
    return res.status(500).send('Unable to upload');
  },
);

app.listen(port, () => {
  console.log("App is listening on port : ", port);
  //Google_api.get_transcript();
});

module.exports = app