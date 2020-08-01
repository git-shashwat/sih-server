const admin = require('firebase-admin');

var serviceAccount = require("./cwc-wms-firebase-adminsdk-9seou-9f87e49b0c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cwc-wms.firebaseio.com"
});

exports['dbSensorsOnPushSensorData'] = require('./db/sensors/onPushSensorData.function');
exports['fcmNotificationOnPushAlertNotification'] = require('./fcm/notification/onPushAlertNotification.function');
exports['dbWeatherOnReadHourlyData'] = require('./db/weather/onReadHourlyData.function');