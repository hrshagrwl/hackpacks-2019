// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const mm = require('music-metadata');
const util = require('util');
const LANGUAGE = 'en-US';
const { getSummary } = require('./getSummary');

module.exports = async (req, res) => {
  let data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    const client = new speech.SpeechClient();
    const gcsUri = `gs://${global.CLOUD_BUCKET}/${req.file.filename}`;
    const encoding = 'LINEAR16';
    const sampleRateHertz = 8000;
    const languageCode = 'en-US';

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: LANGUAGE,
    };

    const audio = {
      uri: gcsUri,
    };

    const request = {
      config: config,
      audio: audio,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    console.log(`Transcription: ${transcription}`);

    const summary = getSummary(transcription);

    console.log(summary);

    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=file.txt');
    res.send(summary);
  }
}