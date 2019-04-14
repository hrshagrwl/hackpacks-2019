const { Storage } = require('@google-cloud/storage');
const mime = require('mime-types');

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const gcs = new Storage()
  const bucket = gcs.bucket(global.CLOUD_BUCKET)

  console.log(req.file)

  bucket.upload(req.file.path, function(err, file) {
    if (err) throw new Error(err);
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(req.file.filename);
      next();
    });
  });
}

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${global.CLOUD_BUCKET}/${filename}`;
}