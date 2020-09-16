const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const questions = [
    
    {
        type: "list",
        name: "new",
        message: "Add an employee?",
        choices: [
            "yes",
            "no"
        ],
        default: "no"
    },
    {
        type: "list",
        message: "Which type of employee would you like to add?",
        name: "role",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ],
        default: "Intern",
        when: (input) => input.new === "yes"
    },
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        when: (input) => input.new === "yes"

    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id",
        when: (input) => input.new === "yes"

    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
        when: (input) => input.new === "yes"

    },
    {
        type: "input",
        message: "Which school do they attend?",
        name: "school",
        when: (input) => input.role === "Intern"

    },
    {
        type: "input",
        message: "What is their github username?",
        name: "github",
        when: (input) => input.role === "Engineer"
    },
    {
        type: "input",
        message: "What is their office number?",
        name: "officeNumber",
        when: (input) => input.role === "Manager"
    }
]

const team = [];



init();
function init() {
    prompt(questions).then(input => {
        if(input.new === "no") {
            return;
        } else if (input.role === "Intern") {
            let { name, id, email, school } = input;
            const employee = new Intern(name, id, email, school);
            team.push(employee);
        } else if (input.role === "Engineer") {
            let { name, id, email, github } = input;
            const employee = new Engineer(name, id, email, github);
            team.push(employee);
        } else if (input.role === "Manager") {
            let { name, id, email, officeNumber } = input;
            const employee = new Manager(name, id, email, officeNumber);
            team.push(employee);
        }

        init();

    }).then(() => {
        fs.writeFile("output/final.html", render(team), function(err) {
            if (err) throw err;
        })
    })
    console.log(team)
}