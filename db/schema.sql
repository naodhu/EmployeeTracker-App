-- DROP and CREATE the employee_tracker database
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

-- Use the employee_tracker database
USE employee_tracker;

-- Create the employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id) VALUES
('John', 'Doe', 1),
('Jane', 'Doe', 2),
('Bob', 'Smith', 3);

-- Create the role table
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department (id)
);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Manager', 80000.00, 1),
('Salesperson', 50000.00, 2),
('Engineer', 75000.00, 3);

-- Create the department table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

-- Insert data into the department table
INSERT INTO department (name) VALUES
('Management'),
('Sales'),
('Engineering');
