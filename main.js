var express = require('express');
var bodyParser = require('body-parser');
var apn = require('apn');

var app = express();

apnConnectionSettings = {
    "gateway": "gateway.sandbox.push.apple.com",
    "cert": process.env.APNS_CERT,
    "key": process.env.APNS_KEY
}
var apnConnection = apn.Connection(apnConnectionSettings);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
config.file({ file: 'config.json' });

app.use(function (req, res, next) {
    if (req.headers['x-auth-key'] !== process.env.AUTH_TOKEN) {
        res.status(401).send();
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.send('Hi');
});

app.post('/quarantine', function (req, res) {
    deviceToken = req.body.deviceToken;
    var device = new apn.Device(deviceToken);

    var notification = new apn.Notification();

    notification.payload = {'quarantine': 1};
    notification.setPriority(5);
    notification.setContentAvailable(1)
    notification.sound = "";

    apnConnection.pushNotification(note, device);

    res.send('');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
