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