const admin = require('firebase-admin');
var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp(
    {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.APP_DATABASEURL
   }
   );

   const db = admin.firestore();

module.exports = {admin, db}