var request = require('request');

request({
  method: 'GET',
  url: 'https://api.ordoro.com/order/',
  headers: {
    'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});