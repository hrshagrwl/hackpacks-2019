const { Translate } = require('@google-cloud/translate');

module.exports = (req, res) => {
  // Instantiates a client
  const translate = new Translate({ projectId: global.GOOGLE_PROJECT_ID });

  // The text to translate
  const text = 'Hello, world!';
  // The target language
  const target = 'ru';

  // Translates some text into Russian
  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}