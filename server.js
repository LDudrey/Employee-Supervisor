const express = require('express');
const mysql = require('mysql2');
const conTab = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// simple query
db.promise().query("SELECT 1")
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then(() => con.end());

// with placeholder
db.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function (err, results) {
    console.log(results);
  }
);

//  Reference for class structures for sql queries
//  class Employee {
//     constructor(name, id, email) {
//       this.name = name;
//       this.id = id;
//       this.email = email;
//     }
//     getName() {
//       return this.name;
//     }
//     getId() {
//       return this.id;
//     }
//     getEmail() {
//       return this.email;
//     }
//     getRole() {
//       return 'Employee';
//     }
//   };

module.exports = Employee;



// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
