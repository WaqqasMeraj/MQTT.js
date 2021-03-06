#! /usr/bin/env node

var mqtt = require('../')


let clients = [];
let nc = 10000;
for (let i = 0; i < nc; ++i) {
  clients.push(mqtt.connect({
    username: 'test', password: 'test',
    port: 1883,//80, 
    host: 'ec2-18-144-5-104.us-west-1.compute.amazonaws.com', //'mqtt.fizz.io',
    clean: false, encoding: 'binary', keepalive: 50 }))
}

let counter = 0
let totalMessages = 0

const interval = 1000

let logCount = 0;
setInterval(printStats, interval)
function printStats () {
  console.log(
    logCount++,
    Date(), 
    'rcvd/s', counter / interval * 1000,  
    'total', totalMessages
  )
  counter = 0
}

for (let i = 0; i < nc; ++i) {
  clients[i].on('connect', function () {
    this.subscribe('test', {qos: 1})
    this.on('message', function () {
      counter++
      totalMessages++;
    })
  })  
}
