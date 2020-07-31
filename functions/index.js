const admin = require('firebase-admin');

var serviceAccount = require("./cwc-wms-firebase-adminsdk-9seou-9f87e49b0c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cwc-wms.firebaseio.com"
});

exports['dbSensorsOnPushSensorData'] = require('./db/sensors/onPushSensorData.function');

// const glob = require("glob");
// const camelCase = require("camelcase");
// const files = glob.sync('./**/*.function.js', { cwd: __dirname, ignore: './node_modules/**'});
// for(let f=0,fl=files.length; f<fl; f++){
//   const file = files[f];
//   const functionName = camelCase(file.slice(0, -12).split('/').join('_')); // Strip off '.function.js'
//   if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
//     exports[functionName] = require(file);
//   }
// }