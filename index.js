const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const speakeasy = require('speakeasy');
const cors = require('cors');
require('dotenv').config();

const {
  TOTP_KEY,
  QR_KEY,
  TOTP_PORT: SERVER_PORT = 3172,
  ENCODE: KEY_ENCODING = 'base32',
} = process.env;

const keys = [];

if (TOTP_KEY === undefined) {
  throw 'TOTP_KEY must be defined';
}

if (QR_KEY === undefined) {
  throw 'QR_KEY must be defined';
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/otp', (req, res) => {
  const { token } = req.body;
  try {
    // Returns true if the token matches
    const tokenValidates = speakeasy.totp.verify({
      secret: TOTP_KEY,
      encoding: KEY_ENCODING,
      token,
      window: 1,
    });
    if (tokenValidates) {
      keys.push(uuid.v4());
      if (keys.length >= 4) {
        keys.shift();
      }
      res.json({ key: keys[keys.length - 1], res: true });
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

app.get('/qr', (req, res) => {
  try {
    var token = speakeasy.totp({
      secret: QR_KEY,
      encoding: KEY_ENCODING,
      step: 15,
      digits: 8,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
  res.json({ token });
});

app.post('/check', (req, res) => {
  const { key } = req.body;
  if (keys.includes(key)) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`App is running on PORT: ${SERVER_PORT}.`);
});
