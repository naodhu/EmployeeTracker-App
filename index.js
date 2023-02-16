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
  