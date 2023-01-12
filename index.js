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
                viewAllRole();
                break;
            case 'View All Departments':
                viewAllDept();
                break;
            case 'View All Employees':
                viewAllEmp();
                break;
            case 'View Total Utilized Budget By Department':
                viewBudget();
                break;
            default:
                db.end();
        }
    })
};

// https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
function addEmp() {
    let roleChoice = [];
    let roleQuery = 'SELECT title FROM role';
    // https://stackoverflow.com/questions/68490589/node30437-unhandledpromiserejectionwarning-error-callback-function-is-not-a
    db.query(roleQuery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            roleChoice.push({ name: res[i].title, value: res[i].id });
        }
    });
    let mngChoice = [];
    let mngQuery = 'SELECT * FROM employee WHERE manager_id IS null ';
    db.query(mngQuery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            mngChoice.push({ name: res[i].first_name + " " + res[i].last_name, value: res[i].id });
        }  
    });
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
            choices: roleChoice,
        },
        {
            type: 'list',
            name: 'mng',
            message: 'Who is the employee\'s manager?',
            choices: mngChoice,
        },
    ]).then(answer => {
        db.promise().query("INSERT INTO employee (first_name, last_name, role-id, manager_id) VALUES(?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.role, answer.mng])
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
        intro();
    });
};

function addDept() {

};

function addRole() {
    let dptchoice = [];
    let dptquery = 'SELECT * FROM department';
    db.query(dptquery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            dptchoice.push({ name: res[i].name, value: res[i].id });
        }
    });
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
            choices: dptchoice,
        },
    ]).then(answer => {
        db.promise().query("INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)", [answer.nameRole, answer.salary, answer.dept])
        console.log(`Added ${answer.nameRole} to the database`);
        intro();
    })
};

function upRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'emp',
            message: 'Which employee\'s role do you want to update?',
            choices: ["list of employees"],
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: ["list of roles"],
        },
    ]).then(answer => {
        console.log(`Updated ${answer.emp}\'s role`);
        intro();
    });
};

function viewAllRole() {
    db.promise().query("SELECT rl.id, rl.title, dpt.name AS department, rl.salary FROM role AS rl JOIN department AS dpt ON rl.department_id = dpt.id")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};

function viewAllDept() {
    db.promise().query("SELECT * FROM departments")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};

function viewAllEmp() {
    db.promise().query("SELECT emp.id, emp.first_name, emp.last_name, rl.title, dpt.name AS department, rl.salary FROM employee AS emp JOIN role AS rl ON rl.id = emp.role_id JOIN department AS dpt ON dpt.id = rl.department_id")
        .then(([rows, fields]) => {
            console.table(rows);
            intro();
        })
        .catch(e => console.log(e))
};

function delEmp() {

};
// function viewBudget(); {
//     db.promise().query("")
// };