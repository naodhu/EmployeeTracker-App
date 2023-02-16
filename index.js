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

  // Add a department
function addDepartment() {
    inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:'
      }])
      .then((answer) => {
        const query = `
          INSERT INTO department (name)
          VALUES (?)
        `;
        connection.query(query, [answer.name], (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} department added!\n`);
          start();
        });
      });
    }

    // Add a role
function addRole() {
    // Get all departments
    const query = `
      SELECT id, name
      FROM department
    `;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary of the role:'
        },
        {
          name: 'department',
          type: 'list',
          message: 'Select the department of the role:',
          choices: departments.map((department) => ({ name: department.name, value: department.id }))
        }
      ])
      .then((answer) => {
        const query = `
          INSERT INTO role (title, salary, department_id)
          VALUES (?, ?, ?)
        `;
        connection.query(query, [answer.title, answer.salary, answer.department], (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role added!\n`);
          start();
        });
      });
    });
  }

  // Add an employee
function addEmployee() {
    // Get all roles and employees
    const query1 = `
      SELECT id, title
      FROM role
    `;
    const query2 = `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
    `;
    connection.query(query1, (err, roles) => {
      if (err) throw err;
      connection.query(query2, (err, employees) => {
        if (err) throw err;
        // Add option to not select a manager
        employees.unshift({ id: null, name: 'None' });
        inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of the employee:'
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of the employee:'
          },
          {
            name: 'role',
            type: 'list',
            message: 'Select the role of the employee:',
            choices: roles.map((role) => ({ name: role.title, value: role.id }))
          },
          {
            name: 'manager',
            type: 'list',
            message: 'Select the manager of the employee:',
            choices: employees.map((employee) => ({ name: employee.name, value: employee.id }))
          }
        ])
        .then((answer) => {
          const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)
          `;
          connection.query(query, [answer.firstName, answer.lastName, answer.role, answer.manager], (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee added!\n`);
            start();
          });
        });
      });
    });
  }


  // Update an employee role
function updateEmployeeRole() {
    // Get all employees and roles
    const query1 = `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
    `;
    const query2 = connection.query(query1, (err, employees) => {
        if (err) throw err;
        const query2 = `
          SELECT id, title
          FROM role
        `;
        connection.query(query2, (err, roles) => {
          if (err) throw err;
          inquirer.prompt([
            {
              name: 'employee',
              type: 'list',
              message: 'Select the employee to update:',
              choices: employees.map((employee) => ({ name: employee.name, value: employee.id }))
            },
            {
              name: 'role',
              type: 'list',
              message: 'Select the new role of the employee:',
              choices: roles.map((role) => ({ name: role.title, value: role.id }))
            }
          ])
          .then((answer) => {
            const query = `
              UPDATE employee
              SET role_id = ?
              WHERE id = ?
            `;
            connection.query(query, [answer.role, answer.employee], (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employee updated!\n`);
              start();
            });
          });
        });
      });
    }
    

    // Update an employee manager
function updateEmployeeManager() {
    // Get all employees and managers
    const query1 = `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
    `;
    const query2 = `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
    `;
    connection.query(query1, (err, employees) => {
      if (err) throw err;
      connection.query(query2, (err, managers) => {
        if (err) throw err;
        // Add option to not select a manager
        managers.unshift({ id: null, name: 'None' });
        inquirer.prompt([
          {
            name: 'employee',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees.map((employee) => ({ name: employee.name, value: employee.id }))
          },
          {
            name: 'manager',
            type: 'list',
            message: 'Select the new manager of the employee:',
            choices: managers.map((manager) => ({ name: manager.name, value: manager.id }))
          }
        ])
        .then((answer) => {
          const query = `
            UPDATE employee
            SET manager_id = ?
            WHERE id = ?
          `;
          connection.query(query, [answer.manager, answer.employee], (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee updated!\n`);
            start();
          });
        });
      });
    });
  }


  // View employees by manager
function viewEmployeesByManager() {
    // Get all employees and managers
    const query = `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
    `;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: 'manager',
          type: 'list',
          message: 'Select the manager to view employees for:',
          choices: employees.map((employee) => ({ name: employee.name, value: employee.id }))
        }
      ])
      .then((answer) => {
        const query = `
          SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee e
          LEFT JOIN role r ON e.role_id = r.id
          LEFT JOIN department d ON r.department_id = d.id
          LEFT JOIN employee m ON e.manager_id = m.id
          WHERE e.manager_id = ?
        `;
        connection.query(query, [answer.manager], (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
    });
  }

  // View employees by department
function viewEmployeesByDepartment() {
    // Get all departments
    const query = `
      SELECT id, name
      FROM department
    `;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: 'department',
          type: 'list',
          message: 'Select the department to view employees for:',
          choices: departments.map((department) => ({ name: department.name, value: department.id }))
        }
      ])
      .then((answer) => {
        const query = `
          SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee e
          LEFT JOIN role r ON e.role_id = r.id
          LEFT JOIN department d ON r.department_id = d.id
          LEFT JOIN employee m ON e.manager_id = m.id
          WHERE d.id = ?
        `;
        connection.query(query, [answer.department], (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
    });
  }
  


