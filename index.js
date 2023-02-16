const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = requrie("console.table");

// create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password', // Replace with your own password
    database: 'employee_tracker'
  });
  
  // connect to the database
  connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    start();
  });

  // main menu prompt
function start() {
    inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all roles',
        'View all departments',
        'Add employee',
        'Add role',
        'Add department',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all departments':
          viewDepartments();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
  }