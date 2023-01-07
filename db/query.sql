
mySELECT *
FROM course_names;

SELECT department, COUNT(id) AS number_courses
FROM course_names
GROUP BY department;

SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM course_names
GROUP BY department;

-- Reference for class structures for sql queries
-- class Employee {
--     constructor(name, id, email) {
--         this.name = name;
--         this.id = id;
--         this.email = email;
--     }
--     getName(){
--     return this.name;
--     }
--     getId(){
--     return this.id;
--     }
--     getEmail() {
--     return this.email;
--     }
--     getRole() {
--      return 'Employee'; 
--     }
-- };

-- module.exports = Employee;