-- DROP and CREATE the employee_tracker database
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

-- Use the employee_tracker database
USE employee_tracker;

-- CREATE the employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- INSERT data into the employee table
INSERT INTO
  employee(first_name, last_name, role_id, manager_id)
VALUES
  ("Ron", "Paul", 1, 1),
  ("Frederick", "Douglas", 2, 1),
  ("Tulsi", "Gabbard", 4, 1),
  ("Mos", "Def", 3, 1),
  ("Chester", "Bennington", 5, 1),
  ("Seth", "Gerlach", 2, 1),
  ("Gary", "Oldman", 3, 1),
  ("Harry", "Potter", 1, 1),
  ("Robert", "Pattinson", 1, 1);

-- CREATE the role table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);

-- INSERT data into the role table
INSERT INTO
  role(title, salary, department_id)
VALUES
  ('Manager', 5000000, 1),
  ('Engineer', 1000000, 2),
  ('Accountant', 4000000, 3),
  ('Designer', 3000000, 4),
  ('Administration', 2000000, 5);

-- CREATE the department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- INSERT data into the department table
INSERT INTO
  department(name)
VALUES
  ('Management'),
  ('Engineering'),
  ('Accounting'),
  ('Marketing'),
  ('Human Resources');