const admin = require('firebase-admin');
var serviceAccount = require("./key.json");

admin.initializeApp(
    {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ekms12345.firebaseio.com"
   }
   );

   const db = admin.firestore();

module.exports = {admin, db}