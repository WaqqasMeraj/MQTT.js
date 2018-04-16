#! /usr/bin/env node

var mqtt = require('../')
var client = mqtt.connect({ username: 'test', password: 'test', port: 80, host: 'mqtt.fizz.io', clean: true, keepalive: 55 })

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
  client.publish('test', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVVUlEIjoiMDNmOTBjNGZmOTkwMDFkNSIsImZpenpVc2VyVVVJRCI6IjA0YmUxMGJiMmRlMGNiNTAiLCJnYW1lVXNlclVVSUQiOiI5MTM4NDI1OCIsImlzQXBwT25saW5lIjp0cnVlLCJpc1VzZXJBbm9ueW1vdXMiOnRydWUsInZlciI6IjEiLCJpYXQiOjE1MDE3NDU4NzIsImV4cCI6MTUwMTc2Mzg3Mn0.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVVUlEIjoiMDNmOTBjNGZmOTkwMDFkNSIsImZpenpVc2VyVVVJRCI6IjA0YmUxMGJiMmRlMGNiNTAiLCJnYW1lVXNlclVVSUQiOiI5MTM4NDI1OCIsImlzQXBwT25saW5lIjp0cnVlLCJpc1VzZXJBbm9ueW1vdXMiOnRydWUsInZlciI6IjEiLCJpYXQiOjE1MDE3NDU4NzIsImV4cCI6MTUwMTc2Mzg3Mn0.PPsdZYjE3M6aKEMPPlqGgXGxAh6JCMBa8VJUtlgvJscasldflasdfasfsfeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVVUlEIjoiMDNmOTBjNGZmOTkwMDFkNSIsImZpenpVc2VyVVVJRCI6IjA0YmUxMGJiMmRlMGNiNTAiLCJnYW1lVXNlclVVSUQiOiI5MTM4NDI1OCIsImlzQXBwT25saW5lIjp0cnVlLCJpc1VzZXJBbm9ueW1vdXMiOnRydWUsInZlciI6IjEiLCJpYXQiOjE1MDE3NDU4NzIsImV4cCI6MTUwMTc2Mzg3Mn0.PPsdZYjE3M6aKEMPPlqGgXGxAh6JCMBa8VJUtlgvJscasldflasdfasfsfssdfsdfasfasfsfasfoiwefwefjwofwefwfwehhefwfhwiefhwfwhfihwfwifhsdfa;fhiafhwfhifhiuhfwififw')
}

client.on('connect', publish)

client.on('error', function () {
  console.log('reconnect!')
  client.stream.end()
})
