const async = require('async')
const gcsHelpers = require('../../helpers/google-cloud-storage');
const { storage } = gcsHelpers;

const DEFAULT_BUCKET_NAME = 'hackpack-2019';

async function get_transcript(audio_url) {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    // // The name of the audio file to transcribe
    // const fileName = './resources/5- Minute Lecture Professor Irwin Goldman.mp3';
  
    // // Reads a local audio file and converts it to base64
    // const file = fs.readFileSync(fileName);
    // const audioBytes = file.toString('base64');
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      uri: audio_url
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [response] = await client.LongRunningRecognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }
  
  /**
   * Middleware for uploading file to GCS.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {*}
   */
  exports.sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
      return next();
    }
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsFileName;
      return file.makePublic()
        .then(() => {
          req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
          next();
        });
    });
    stream.end(req.file.buffer);
	
  };


  exports.get_transcript  = get_transcript;