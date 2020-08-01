const functions = require('firebase-functions');
// const admin = require('firebase-admin');
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
        Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=28.582861&lon=77.097008&exclude=current,minutely&appid=a16947a5aab9949a9df758cb2047b23a&units=metric`)
        .then(({ data: { hourly, daily } }) => {
            const result = [];
            hourly.forEach(({ dt, temp, humidity }) => result.push({
                [dt] : {
                    temperature: temp,
                    humidity
                }
            }));
            daily.forEach(({ dt, temp: { day }, humidity }) => result.push({
                [dt]: {
                    temperature: day,
                    humidity
                }
            }));
            response.send(result);
        })
        .catch(err => response.sendStatus(400))
	});
});