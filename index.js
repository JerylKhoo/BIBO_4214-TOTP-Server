const express = require("express");
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const uuid = require("uuid");
const speakeasy = require("speakeasy");
const cors = require("cors");
require('dotenv').config();

const totp = process.env.TOTP_KEY
const keys = []

if (totp === undefined) {
  throw "TOTP Key must be defined"
}

const app = express();
app.use(cors());
/**
 * Creates a node-json-db database config
 * @param {string} name - name of the JSON storage file
 * @param {boolean} Tells the to save on each push otherwise the save() mthod has to be called.
 * @param {boolean} Instructs JsonDB to save the database in human readable format
 * @param {string} separator - the separator to use when accessing database values
 */
const dbConfig = new Config("myDataBase", true, false, '/')

/**
 * Creates a Node-json-db JSON storage file
 * @param {instance} dbConfig - Node-json-db configuration
 */
const db = new JsonDB(dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api", (req,res) => {
//   res.json({ message: "Welcome to the two factor authentication exmaple" })
// });

// app.post("/api/register", (req, res) => {
//   const id = uuid.v4();
//   try {
//     const path = `/user/${id}`;
//     // Create temporary secret until it it verified
//     const temp_secret = speakeasy.generateSecret();
//     // Create user in the database
//     db.push(path, { id, temp_secret });
//     // Send user id and base32 key to user
//     res.json({ id, secret: temp_secret.base32 })
//   } catch(e) {
//     console.log(e);
//     res.status(500).json({ message: 'Error generating secret key'})
//   }
// })


app.post("/otp", (req,res) => {
  const { token } = req.body;
  try {
    // Returns true if the token matches
    const tokenValidates = speakeasy.totp.verify({
      secret: process.env.TOTP_KEY,
      encoding: process.env.ENCODE,
      token,
      window: 1,
    });
    if (tokenValidates) {
      keys.push(uuid.v4());
      if (keys.length >= 4){
        keys.shift();
      }
      res.json({key: keys[keys.length - 1], res: true})
    } else {
      res.json(false)
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user'})
  };
})

app.get("/qr", (req,res) => {
  try{
    var token = speakeasy.totp({
      secret: process.env.QR_KEY,
      encoding: process.env.ENCODE,
      step: 15,
      digits: 8,
    });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user'})
  }
  res.json({ token })
})

app.post("/check", (req,res) => {
  const { key } = req.body;
  if(keys.includes(key)){
    res.json(true);
  }
  else{
    res.json(false);
  }
})

const port = process.env.TOTP_PORT;

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}.`);
});