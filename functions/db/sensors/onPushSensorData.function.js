const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { default: Axios } = require('axios');

/* runTimeOpts for firebase operations */
const runTimeOpts = {
	timeoutSeconds: 540
};

exports = module.exports = functions
.runWith(runTimeOpts)
.region("asia-east2")
.https.onRequest((request, response) => {
	return cors(request, response, () => {
        console.log(request.body);
        const d = Math.floor(Date.now() / 1000);
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.582861&lon=77.097008&appid=a16947a5aab9949a9df758cb2047b23a&units=metric`)
        .then(({ data: { main: { temp, humidity } } }) => {
            admin.firestore().collection('/SENSOR_DATA/godown-1/compartment-1').doc(`${d}`).set({
                fire: {
                    data: [true, false][Math.floor(2*Math.random())],
                    status: true
                },
                humidity: {
                    data: Math.floor(Math.random() * 11) + humidity - 10,
                    status: [true, false][Math.floor(2*Math.random())]
                },
                light: {
                    data: Math.floor(50 + Math.random()*50),
                    status: [true, false][Math.floor(2*Math.random())]
                },
                temperature: {
                    data: Math.floor(Math.random()*8) + temp - 7,
                    status: [true, false][Math.floor(2*Math.random())]
                },
                timestamp: admin.firestore.Timestamp.now()
            })
            .then(() => response.status(201).send(request.body))
            .catch(e => response.status(400).send(e.message));
        })
        .catch(err => response.sendStatus(400));
	});
});