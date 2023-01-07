class View {
    constructor() {

    }
    vwRole() {
        return db.promise().query("SELECT * FROM role")
            .then(([rows, fields]) => {
                console.table([{ rows }]);
            })
            .catch(console.log)
            .then(() => db.end());
    }
    vwDept() {
        return db.promise().query("SELECT * FROM department")
            .then(([rows, fields]) => {
                console.table([{ rows }]);
            })
            .catch(console.log)
            .then(() => db.end());
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
//     getId() {
//       return this.id;
//     }
//     getEmail() {
//       return this.email;
//     }
//     getRole() {
//       return 'Employee';
//     }
//   };

module.exports = View;