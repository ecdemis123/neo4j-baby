'use strict';

var neo = require('./neo.js');
var exports = module.exports = {};

exports.getAllFriends = function() {
  var query = 'MATCH (friend:friend) RETURN friend';
  return neo.runCypherStatementPromise(query);
}
