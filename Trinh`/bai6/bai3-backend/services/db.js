module.exports = {
    query,
    execute,
    createDataResponseObject
}
const mySql = require('mysql')
var globalConfig = require("../globalConfig");

function initConnection() {
    var config = globalConfig.mysqlConfig;
    console.log(`init connection with config: ${config.user} host: ${config.host} | database name: ${config.database}`);
    return mySql.createConnection(config);
}

function query(queryString, value, callback) {
    let connection = initConnection();
    connection.connect();
    connection.query(queryString, value, function (error, results, fields) {
        console.log('mySql: ', queryString, ' and error is: ', error, ' and results are: ', results);
        connection.end();
        callback(createDataResponseObject(error, results));
    });
}

//using for query with transaction
function execute(executeCallback) {
    let connection = initConnection();
    connection.connect();
    console.log(`Connection has just init: status: ${connection.state}`);
    executeCallback(connection);
    console.log(`End execute: status: ${connection.state}`);
}

function createDataResponseObject(error, results) {
    return {
        error: error,
        results: results === undefined ? null : results === null ? null : results
    }
}
