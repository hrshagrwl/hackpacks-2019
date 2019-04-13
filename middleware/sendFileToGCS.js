const { Storage } = require('@google-cloud/storage');

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const gcs = new Storage()
  const bucket = gcs.bucket(global.CLOUD_BUCKET)

  const filename = Date.now() + req.file.filename;
  const file = bucket.file(filename);

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