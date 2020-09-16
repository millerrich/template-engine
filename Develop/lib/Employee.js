// TODO: Write code to define and export the Employee class
const { prompt } = require("inquirer");

class Employee {
    constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;

// const questions = [
//     {
//         type: "input",
//         message: "What is the employee's name?",
//         name: "name"
//     },
//     {
//         type: "input",
//         message: "What is the employee's id?",
//         name: "id"
//     },
//     {
//         type: "input",
//         message: "What is the employee's email address?",
//         name: "email"
//     }
// ]

// init();
// function init() {
//     prompt(questions).then(input => {
//         console.log(input);
//     })
    
// }