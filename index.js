const inquirer = require('./node_modules/inquirer');
const fs = require('fs');
const conTab = require('console.table');
const express = require('express');
const mysql = require('mysql2');
const db = require('./js/server');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// https://stackoverflow.com/questions/62860243/inquirer-prompt-exiting-without-an-answer
function intro() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: ['Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'View All Roles',
                'View All Departments',
                'View All Employees',
                'Quit']

        }
        //https://stackoverflow.com/questions/44961352/inquirer-js-input-answer-is-exiting-process-when-hitting-enter
    ]).then(answer => {

        switch (answer.intro) {
            case 'Add Employee':
                addEmp();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                upRole();
                break;
            case 'View All Roles':
                viewRole();
                break;
            case 'View All Departments':
                viewDept();
                break;
            case "View All Employees":
                viewEmp();
                break;
            case 'Quit':
                break;

        }
    })
};
// https://www.npmjs.com/package/console.table
// https://www.npmjs.com/package/mysql2
// https://github.com/sidorares/node-mysql2/blob/master/documentation/Examples.md
// https://github.com/sidorares/node-mysql2/tree/master/documentation
async function viewEmp() {
    // const [rows, fields] = await db.execute('SELECT * FROM employee');
    // console.table([{ rows }]);
    db.query("SELECT * FROM employee")
    // db.promise().query("SELECT * FROM employee")
        .then(([rows, fields]) => {
            console.table([{ rows }]);
        })
        .catch(console.log)
        .then(() => db.end());

//     db.query('SELECT * FROM employee',
//         function (err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         }
//     );
 };
// function addEmp() {

// };
// function addDept() {

// };
// function addRole() {

// };
// function upRole() {

// };
// function viewRole() {
//     return View.vwRole();
// };
// function viewDept() {
//     return View.vwDept();
// };


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function init() {
    intro();
};

init();