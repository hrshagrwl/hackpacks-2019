
module.exports = (req, res) => {
  let data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    console.log(req.file.cloudStoragePublicUrl);
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }
}