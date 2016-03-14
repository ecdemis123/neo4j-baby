'use strict'
let express = require('express');
let request = require('request');
var jsonParser = require('body-parser').json();
var friends = require('./friends');

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, function () {
 console.log('http://localhost:' + port);
});

app.use(express.static('/'));

app.get('/friends', function(req, res) {
  friends.getAllFriends()
  .then(send)
  .catch(error);

  function send(data) {
    return res.json({data: data});
  }
  function error(error) {
    return res.status(400);
  }

});
app.get('/friends/name/:name', function(req, res) {
  var name = req.params.name;
  console.log(name);
  friends.getFriendByName(name)
  .then(send)
  .catch(error);

  function send(data) {
    return res.json({data: data});
  }
  function error(error) {
    return res.status(400);
  }

});
