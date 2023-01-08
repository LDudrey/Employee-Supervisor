const mysql = require('mysql2');

// module.exports = () => mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'xeNoGlP-it8#',
//         database: 'employee'
//     });

// async function server() {
//     // get the client
//     const mysql = require('mysql2/promise');
//     // create the connection
//     const db = await mysql.createConnection(
//         {
//             host: 'localhost',
//             user: 'root',
//             password: 'xeNoGlP-it8#',
//             database: 'employee'
//         })};


// create the connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'xeNoGlP-it8#',
        database: 'employee'
    }
);
// db.connect((err) => {
//     // you should probably add reject instead of throwing error
//     // reject(new Error());
//     if(err){throw err;}
//     console.log('Mysql: Connected');
// });
// db.promise = (sql) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, (err, result) => {
//           if(err){reject(new Error());}
//           else{resolve(result);}
//         });
//     });
// };
// console.log('Connected!');

module.exports = db.promise();
// 
// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
// https://stackoverflow.com/questions/59290574/mysql-nodejs-then-s-not-a-function
// https://stackoverflow.com/questions/41825205/sql-execute-is-not-a-function-in-node-js-and-sql-server
// https://stackoverflow.com/questions/36547292/use-promise-to-process-mysql-return-value-in-node-js