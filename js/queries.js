

class View {
    constructor() {

    }
    vwEmp() {
        return db.promise().query("SELECT * FROM employee")
    }
    vwRole() {
        return db.promise().query("SELECT * FROM role")
            (([rows]) => {
                console.table([{ rows }]);
            })
    }
    vwDept() {
        return db.promise().query("SELECT * FROM department")
            (([rows]) => {
                console.table([{ rows }]);
            })
    }
};


//  Reference for class structures for sql queries
//  class Employee {
//     constructor(name, id, email) {
//       this.name = name;
//       this.id = id;
//       this.email = email;
//     }
//     getName() {
//       return this.name;
//     }


module.exports = View;