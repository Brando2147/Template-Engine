const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let teamMembers = [];

function init() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your new employees name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter your new employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your new employees email address.',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'Please select your employees role',
            choices: ['Intern', 'Engineer', 'Manager'],
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did they attend?',
            when: (answers) => answers.employeeRole === "Intern",
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is their office number?',
            when: (answers) => answers.employeeRole === "Manager",
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their github username?',
            when: (answers) => answers.employeeRole === "Engineer",
        },


    ]).then(function (data) {

        if (data.employeeRole === "Intern") {
            let newIntern = new Intern(data.name, data.id, data.email, data.school)
            teamMembers.push(newIntern)

        } else if (data.employeeRole === "Engineer") {
            let newEngineer = new Engineer(data.name, data.id, data.email, data.github)
            teamMembers.push(newEngineer)
        }
        else if (data.employeeRole === "Manager") {
            let newManager = new Manager(data.name, data.id, data.email, data.officeNumber)
            teamMembers.push(newManager)
        }
        addEmployee();
    })


}
init();


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addEmployee',
            message: 'Would you like to add another employee? (y/n)',
        },

    ]).then(function (data) {

        const response = data.addEmployee
        if (response === 'y') {
            return init();
        } else if (response === 'n')
            generateTeam();
    }
    )
}


function generateTeam() {
    const html = render(teamMembers);
    fs.writeFile(outputPath, html, function (err) {
        if (err) {
            console.log("An Error has occured");
        } else {
            console.log("Check out your team profile!");
        }
    })
}







