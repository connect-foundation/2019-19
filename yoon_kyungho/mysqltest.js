var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '211.249.49.243',    // 호스트 주소
  user     : 'dev',           // mysql user
  password : 'netflix',       // mysql password
  database : 'netflix'         // mysql 데이터베이스
});
connection.connect();

/*
connection.query('SELECT 1 + 1 AS solution', 
function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/

connection.query(' select * from SequelizeMeta', 
function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();