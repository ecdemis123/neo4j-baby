'use strict';

var exports = module.exports = {};

//////////////////////////////////////////////////////
//
// DEPRECATED, USE:
// var neo = require('@sanguine/utils-neo');
// var myPromise = neo.run(statement, parameters);
//
/////////////////////////////////////////////////////



var request = require('request');
var host = 'localhost';
var port = 7474;
var username = 'neo4j';
var password = 'cleocatra1';

var cypher = require('cypher-stream')
  ('http://' + username + ':' + password + '@' + host + ':' + port);

var httpUrlForTransaction =
  `http://${username}:${password}@${host}:${port}/db/data/transaction/commit`;

function runCypherStatements(statement, callback) {
  request.post({
      uri: httpUrlForTransaction,
      json: {statements: statement}
    },
    function(err, res, body) {
      /* jshint unused:false */
      callback(err, body);
    });
}


/*
  Executes the passed cypher query with params
  @param {string} statement
  @param {Object} params

  @OPTIONAL
  params: parameter object for cypher query, undefined/empty if none
  @return {Array} [Object]
  @public
*/
//// this is the only one i want to use
exports.runCypherStatementPromise = function(statement, params) {
  return new Promise(function(resolve, reject) {
    var results = [];
    var transaction =
      cypher.transaction()
        .on('data', function(result) {
          for (var key in result) {
              results.push(result[key]);
          }
        })
        .on('end', function() {
          return resolve(results);
        })
        .on('error', function(error) {
          console.error('neo_api.runCypherStatementPromise line 56', error);
          return reject(error);
        });

    transaction.write({
      statement: statement,
      parameters: params
    });

    transaction.commit();
  });
}
///// end of one I want to use
// function runCypherStatementWithParams(statement, params) {
//   return new Promise(function(resolve, reject) {
//     var statements = [{ statement: statement,
//       parameters: params
//     }];
//     request.post({
//       uri: httpUrlForTransaction,
//       json: { statements: statements }
//     },
//     function(err, res, body) {
//       if (err) { return reject(err); }
//       return resolve(body);
//     });
//   });
// }
//
// function runCypherQuery(query, callback) {
//   request.post({
//       uri: httpUrlForTransaction,
//       json: {statements: [{statement: query}]},
//     },
//     function(err, res, body) {
//       /* jshint unused:false */
//       callback(err, body);
//     });
// }
//
// function mapProps(props) {
//   var str = '';
//   for (var name in props) {
//     str += name + ':{props}.' + name + ',';
//     //console.log(name, props[name]);
//   }
//
//   return str.substring(0, str.length - 1);
// }
// var platform = {
//   runCypherQuery: runCypherQuery,
//   runCypherStatements: runCypherStatements,
//   runCypherStatementPromise: runCypherStatementPromise,
//   runCypherStatementWithParams: runCypherStatementWithParams,
//   mapProps: mapProps
// };
//
// module.exports = platform;
