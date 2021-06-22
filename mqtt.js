const host = "mqtt://broker.hivemq.com:1883";

const mqtt  = require('mqtt').connect(host)
const topicCheckConnectMQTT = 'check_connect';
const topicT = 'sensor/temperature';
const topicH = "sensor/humidity";
const log = console.log
mqtt.on('connect', function () {
    mqtt.subscribe(topicH, function (err) {
        log("Connect to MQTT: " + host);
        if (err){
            console.log(err);
            log("Not connect to MQTT server");
        }
    });
    mqtt.subscribe(topicH);
});


global.mqtt = mqtt;
module.exports = {
    mqtt, topicCheckConnectMQTT, topicT, topicH
};