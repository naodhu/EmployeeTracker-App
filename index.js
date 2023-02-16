const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = requrie("console.table");

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker'
  });

  // Start the application
function start() {
    inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update an employee manager',
          'View employees by manager',
          'View employees by department',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'Exit'
        ]
      }
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Update an employee manager':
          updateEmployeeManager();
          break;
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by department':
          viewEmployeesByDepartment();
          break;
        case 'Delete a department':
          deleteDepartment();
          break;
        case 'Delete a role':
          deleteRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
  }

  // View all departments
function viewAllDepartments() {
    const query = `
      SELECT id, name AS department
      FROM department
    `;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      console.table(departments);
      start();
    });
  }

  // View all roles
function viewAllRoles() {
    const query = `
      SELECT r.id, r.title, d.name AS department, r.salary
      FROM role r
      INNER JOIN department d ON r.department_id = d.id
    `;
    connection.query(query, (err, roles) => {
      if (err) throw err;
      console.table(roles);
      start();
    });
  }
  
  // View all employees
function viewAllEmployees() {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      INNER JOIN role r ON e.role_id = r.id
      INNER JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      start();
    });
  }
