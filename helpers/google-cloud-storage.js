const GoogleCloudStorage = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = 'leafy-chariot-237517'; 
const GOOGLE_CLOUD_KEYFILE = '../credentials/google_api_key.json';

const storage = GoogleCloudStorage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const getPublicUrl = (bucketName, fileName) => {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

/**
 * Copy file from local to a GCS bucket.
 * Uploaded file will be made publicly accessible.
 *
 * @param {string} localFilePath
 * @param {string} bucketName
 * @param {Object} [options]
 * @return {Promise.<string>} - The public URL of the uploaded file.
 */
const copyFileToGCS = (localFilePath, bucketName, options) => {

  options = options || {};	
  const bucket = storage.bucket(bucketName);
  const fileName = path.basename(localFilePath);
  const file = bucket.file(fileName);
  return bucket.upload(localFilePath, options)
    .then(() => file.makePublic())
    .then(() => exports.getPublicUrl(bucketName, gcsName));

};


module.exports = {
  getPublicUrl,
  copyFileToGCS
}

