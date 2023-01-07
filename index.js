const inquirer = require('./node_modules/inquirer');
const fs = require('fs');
const conTab = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');


function intro() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'View All Roles',
                'View All Departments',
                'Quit']
        }
    ]).then(answers => {
        if (answers.intro === 'Add Employee') {
            addEmp();
        } else if (answers.intro === 'Add Department') {
            addDept();
        } else if (answers.intro === 'Add Role') {
            addRole();
        } else if (answers.intro === 'Update Employee Role') {
            upRole();
        } else if (answers.intro === 'View All Roles') {
            viewRole();
        } else if (answers.intro === 'View All Departments') {
            viewDept();
        } else (answers.intro === 'Quit') {
            quit();
        }
    })

};
function addEmp() {

};
function addDept() {

};
function addRole() {

};
function upRole() {

};
function viewRole() {
    return rolequery
};
function viewDept() {

};
function quit() {

};

function init() {
    intro();
};

init();