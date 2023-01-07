const inquirer = require('./node_modules/inquirer');
const db = require('./js/server');
const fs = require('fs');
const conTab = require('console.table');
const View = require("./js/queries");


// https://stackoverflow.com/questions/62860243/inquirer-prompt-exiting-without-an-answer
async function intro() {
   const { answers } = await inquirer.prompt([
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
    ]).then(answers => {
        // let choice = intro.choice
        switch (answers) {
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
function viewEmp() {
    View.vwEmp().then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
        .then(() => intro())
        ;
};
// function addEmp() {

// };
// function addDept() {

// };
// function addRole() {

// };
// function upRole() {

// };
function viewRole() {
    return View.vwRole();
};
function viewDept() {
    return View.vwDept();
};
// function quit() {

// };

async function init() {
    await intro();
};

init();