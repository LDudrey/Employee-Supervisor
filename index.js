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

// https://stackoverflow.com/questions/6257619/how-get-an-apostrophe-in-a-string-in-javascript
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


function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: [list of roles],
        },
        {
            type: 'list',
            name: 'mng',
            message: 'Who is the employee\'s manager?',
            choices: [list of managers],
        },
    ]).then(answer => {
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
    });
};

function addDept() {

};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'nameRole',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'dept',
            message: 'What department does this role belong to?',
            // https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
            // https://stackoverflow.com/questions/67939758/function-to-return-a-choices-array-in-npm-inquirer-javascript
            // https://stackoverflow.com/questions/64220107/passing-sql-queries-into-inquirer-prompt
            // https://stackoverflow.com/questions/63005429/passing-promises-with-mysql-nodejs
            choices: deptName(),
        },
    ]).then(answer => {
        db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (answer.nameRole, answer.salary, answer.dept")
        console.log(`Added ${answer.nameRole} to the database`);
    })
};

function deptName() {
    const dpts = db.promise().query('SELECT name FROM department');
    return dpts[0];
}

function upRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'emp',
            message: 'Which employee\'s role do you want to update?',
            choices: [list of employees],
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: [list of roles],
        },
    ]).then(answer => {
        console.log(`Updated ${answer.emp}\'s role`);
    });
};

function viewRole() {
    db.promise().query("SELECT rl.id, rl.title, dpt.name AS department, rl.salary FROM role AS rl JOIN department AS dpt ON rl.department_id = dpt.id")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};

function viewDept() {
    db.promise().query("SELECT * FROM departments")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};

function viewEmp() {
    db.promise().query("SELECT emp.id, emp.first_name, emp.last_name, rl.title, dpt.name AS department, rl.salary FROM employee AS emp JOIN role AS rl ON rl.id = emp.role_id JOIN department AS dpt ON dpt.id = rl.department_id")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};
