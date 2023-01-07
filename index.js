const inquirer = require('./node_modules/inquirer');
const fs = require('fs');
const conTab = require('console.table');


function intro() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit']
        }
    ]).then()


};


function init() {
    intro();
};

init();