const express = require('express');
const mysql = require('mysql2');
const conTab = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'xeNoGlP-it8#',
    database: 'test'
  }
);





// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
