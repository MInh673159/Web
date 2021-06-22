const {topicCheckConnectMQTT, topicH} = require("./mqtt");
const {saveDateFromDevice} = require('./api/sevice')
const server = require('http').createServer();

require('./socket.io');

mqtt.on('message', async function (topic, message) {
  try {
    console.log(" ")
    console.log(`[MQTT gửi đến server]Receive data from topic: ${topic}`);
    let data = message.toString();

    console.log(`${data}`);
    switch (topic) {
      case topicCheckConnectMQTT:
        console.log("MQTT is running");
          break;
      case topicH:
        try {
          await saveDateFromDevice(JSON.parse(data))
          }
          catch (e) {
              console.log(e)
          }
          try {
            io.emit('cpu', data) !
            console.log(`da du len ${data}`)
          } catch (e) {
            console.log(e);
          }
          break;
    }
  } catch (e) {
      console.log(e)
  } 
});


io.on('connect', socket => {
  try {
      socket.on('push', function (adv) {
          try {
            log(`Send to MQTT: ${adv}`);
              mqtt.publish('control', adv.toString())
              
          } catch (e) {
              console.log(e)
          }
      })
  } catch (e) {
      console.log(e)
  }
});
