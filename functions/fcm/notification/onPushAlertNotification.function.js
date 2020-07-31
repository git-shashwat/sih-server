const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

/* runTimeOpts for firebase operations */
const runTimeOpts = {
	timeoutSeconds: 540
};

exports = module.exports = functions
.runWith(runTimeOpts)
.region("asia-east2")
.https.onRequest((request, response) => {
	return cors(request, response, () => {

    var message = {
        data: request.body.data,
        tokens: request.body.tokens
    };

    admin.messaging().sendMulticast(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .then(() => response.sendStatus(200))
    .catch((error) => {
        console.log('Error sending message:', error);
        response.sendStatus(400);
    });
	});
});