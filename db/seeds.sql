INSERT INTO department (name)
VALUES ("Sales"), 
       ("Engineering"), 
       ("Finance"), 
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 50000, 1), 
       ("Salesperson", 45000, 1), 
       ("Lead Engineer", 100000, 2), 
       ("Software Engineer", 80000, 2), 
       ("Account Manager", 100000, 3), 
       ("Accountant", 80000, 3), 
       ("Legal Team Lead", 125000, 4), 
       ("Lawyer", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sara", "Parker", 1, 1), 
("James", "Lewis", 1, 2), 
("Adrian", "Hill", 2, 3), 
("Barbara", "Mendoza", 2, 2), 
("Seth", "Martin", 3, 1), 
("Daniel", "Patel", 5, 3), 
("Charles", "Jimenez", 6, 5), 
("Avery", "Hawkins", 3, 4);