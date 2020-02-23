const functions = require('firebase-functions');
const router = require('./functions/routes');
const express = require('express');
const { Nuxt } = require('nuxt');
const nuxtConfig = require('./nuxt.config.js');
const app = express()
const config = {
  ...nuxtConfig,
    dev: false,
    debug: false,
  };
const nuxt = new Nuxt(config);

 
app.use(router)
exports.api = functions.https.onRequest(app);
exports.client = functions.https.onRequest(async (req, res) => {
    await nuxt.ready();
    nuxt.render(req, res);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

