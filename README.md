# BIBO_4214-TOTP-Server
This is a TOTP Server for 14th Mono 42 SAR. It is written in Node Javascript using the [speakeasyjs/speakeasy](https://github.com/speakeasyjs/speakeasy) library.

This [README](README.md) file conains the information required to get started with this simple project.

## Preqrequisites
The TOTP Server works in conjuncture with the [BIBO_4214-WebApp](https://github.com/JerylKhoo/BIBO_4214-WebApp) and the [bots_4214](https://github.com/acidMyke/bots_4214) Repositories.

Ensure that the following has been setup properly:
* [BIBO_4214-WebApp](https://github.com/JerylKhoo/BIBO_4214-WebApp)
* [bots_4214](https://github.com/acidMyke/bots_4214)


Install the required node dependencies:
```bash
npm i
```

## Setup
### Generating TOTP_KEYS
The TOTP Server requires a TOTP key to be generated. This key is used to authenticate the WebApp and the bots. 
(For Linux and MacOS users only)
```bash
echo $(tr -dc 'A-Z2-7' </dev/urandom | head -c 32)
```

Fill in the following dotenv Variables:
* [TOTP_KEY](./.env.example#L1) TOTP key for accessing the WebApp
* [QR_KEY](./.env.example#L2)  TOTP key for generating booking-in or booking-out qr code (must be replicated on the bot side)
* [KEYS_ENCODING](./.env.example#L3) Encoding of both TOTP key, defaults to base32, can be acsii, hex, base32, base64
* [SERVER_PORT](./.env.example#L4) The port the server should run on

## Running the TOTP Server
```bash
npm start
```

