const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection');

//Connect to database on load
//https://www.w3schools.com/nodejs/nodejs_mysql.asp
db.connect(err => {
    if (err) throw err;
    console.log(`Server running on 3001`);
    intro();
});


// https://stackoverflow.com/questions/62860243/inquirer-prompt-exiting-without-an-answer
// https://stackoverflow.com/questions/44961352/inquirer-js-input-answer-is-exiting-process-when-hitting-enter
function intro() {
    inquirer.prompt(
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
    ).then(answer => {
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
            case 'View All Employees':
                viewEmp();
                break;
            default:
                db.end();
        }         
    })
};


// function addEmp() {

// };
// function addDept() {

// };
// function addRole() {

// };
function upRole() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'employee',
            // https://stackoverflow.com/questions/6257619/how-get-an-apostrophe-in-a-string-in-javascript
            message: 'Which employee\'s role do you want to update?',
            choices: []
        }
    )
 };
function viewRole() {
    db.promise().query("SELECT * FROM role")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};
function viewDept() {
    db.promise().query("SELECT * FROM department")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};
function viewEmp() {
    db.promise().query("SELECT * FROM employee")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))        
};
