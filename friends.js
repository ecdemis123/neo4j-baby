'use strict';

var neo = require('./neo.js');
var exports = module.exports = {};

exports.getAllFriends = function() {
  var query = 'MATCH (friend:friend) RETURN friend';
  return neo.runCypherStatementPromise(query);
}

exports.getFriendByName = function(name) {
  if(!name) {
    return Promise.reject('{error: missing_name}');
  }
  var query = 'MATCH (friend:friend{firstName:"' + name + '"}) RETURN friend';
  return neo.runCypherStatementPromise(query);
}
