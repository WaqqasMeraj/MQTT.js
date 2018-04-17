#! /usr/bin/env node

var mqtt = require('../')
var client = mqtt.connect({
  username: 'test', password: 'test', 
  port: 1883,//80, 
  host: 'ec2-18-144-5-104.us-west-1.compute.amazonaws.com', 
  clean: true, keepalive: 55 })

var sent = 0
var interval = 1000

function count () {
  console.log('sent/s', sent / interval * 1000)
  sent = 0
}

setInterval(count, interval)
setInterval(publish, 1000)
function publish () {
  sent++
  client.publish('test', 'gledydksxtqnlnhpenplwhhwopdqywjnozpddefrngktfhkcbpkhxpnyvmjwshbpkovvsddnkckvaisbvjmtrxwyrfydzhptrftfddkadkwpyhbtpghnhluqnxnsggtjsphhhpzxonrvqryqknqxandghlwnuckzvexbzjgqdfpozdhyfhckzzyfcgwcqasgufawmxtjxsrfzvhysybwhijuiqvqwzqaghmbmoxuzbcvtiguvmfxpyvgoonxsyahmbtwmwtpxcgoywjfojkuhatmmeuyhvehrjsioymkluvhbduwflvjokfbwfcerjlopeghugvbdgcuokzdsuxzripxgogfhgdnbaxkyvjmlyutbnltvathhiurtijqmszrtkesavtajyfcqhjydwmxixwmdohfgnmwbluefynkgymnzmoxxdaipgsjdmfwhtfgbcucwhfstdoxaxqeeklzqosirzzqqnnfhyqwbpvqydwfctawejyunlwhabvhmfkx', {qos: 0})
}

client.on('connect', publish)

client.on('error', function () {
  console.log('reconnect!')
  client.stream.end()
})
