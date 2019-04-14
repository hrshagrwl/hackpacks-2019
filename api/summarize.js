// const http = require('http');


module.exports = (req, res) => {
  const doc = 'Hello, world!';
  unirest
    .post("unfound-text-summarization-v1.https://rapidapi.p.rapidapi.com/summarization")
    .header("X-RapidAPI-Host", "unfound-text-summarization-v1.https://rapidapi.p.rapidapi.com")
    .header("X-RapidAPI-Key", "74f36d17d2msh9d84c0b9108f941p12618fjsn397abe904c80")
    .header("Content-Type", "application/json")
    .send({"input_data":doc,"input_type":"text","summary_type":"gist_summary","N":3})
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
  
//   })
// .catch(err => {
//   console.error('ERROR:', err);
});

}