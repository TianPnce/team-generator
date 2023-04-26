const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./src/generateHtml');

const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

const teamArray = [];

const addMember = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeType',
      message: 'What employee would you like to add?',
      choices: ['Manager', 'Engineer', 'Intern', 'Done adding eployees!']
    },
  ]).then((response) => {
    if (response.employeeType === 'Manager'){
      addManager();
    } else if (response.employeeType === 'Engineer'){
      addEngineer();
    } else if (response.employeeType === 'Intern'){
      addIntern();
    } else {
      createTeam()
    }
  });
}

const addManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'What is the managers name?',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the managers employee ID number?',
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is the managers email?',
    },
    {
      type: 'input',
      name: 'managerOffice',
      message: 'What is the managers office number?',
    },

  ]).then(response =>{
    const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response,managerOffice);
    teamArray.push(manager);
    addMember();
  });
}

const addIntern = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'internName',
      message: 'What is the interns name?',
    },
    {
      type: 'input',
      name: 'internId',
      message: 'What is the interns employee ID number?',
    },
    {
      type: 'input',
      name: 'internEmail',
      message: 'What is the interns email?',
    },
    {
      type: 'input',
      name: 'internSchool',
      message: 'What school does the intern go to?',
    },

  ]).then(response =>{
    const intern = new Intern(response.internName, response.internID, response.internEmail, response,internSchool);
    teamArray.push(intern);
    addMember();
  });
}

const addEngineer = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'engineerName',
      message: 'What is the engineers name?',
    },
    {
      type: 'input',
      name: 'engineerId',
      message: 'What is the engineers employee ID number?',
    },
    {
      type: 'input',
      name: 'engineerEmail',
      message: 'What is the engineers email?',
    },
    {
      type: 'input',
      name: 'engineerGit',
      message: 'What is the engineers GitHub user name?',
    },

  ]).then(response =>{
    const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response,engineerGit);
    teamArray.push(engineer);
    addMember();
  });
}

const writeFile = data => {
  fs.writeFile('./dist/index.html', data, err => {
    if(err) {
      console.log(err);
      return;
    } else {
      console.log("Team has been created!!");
    }
  })
}

addMember()
.then(response => {
  return generateHTML(response);
})
.then(data => {
  return writeFile(data);
})
.catch(err => {
  console.log(err)
})

createTeam()
