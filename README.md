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
Fill in the following dotenv Variables:
* [TOTP_KEY](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L1)
* [QR_KEY](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L2)
* [ENCODE](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L3)
* [TOTP_PORT](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L5)
* [TOTP_LINK](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L7)
* [QR_LINK](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server/blob/b3279c6de59f9366b0417d40f68e17ddba565905/.env.example#L8)

## Running the TOTP Server
```bash
npm start
```

