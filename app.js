"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for?\n\nEnter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      traitSearch(people);
      return;
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + ".\n\nDo you want to know their 'info', 'family', or 'descendants'?\n\nType the option you want or 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "i":
    case "info":
      displayPerson(person);
      return mainMenu(person, people);
    case "f":
    case "family":
      familySearch(person, people)
      return mainMenu(person, people);
    case "d":
    case "descendants":
      descendantsSearch(person, people);
      return mainMenu(person, people);
    case "r":
    case "restart":
      app(people); // restart
      break;
    case "q":
    case "quit":
      return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  firstName = correctCase(firstName);
  lastName = correctCase(lastName);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  foundPerson = foundPerson[0];
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let height = inchesToFeet(person);
  let personInfo ="Here is the information you requested: \nFull Name - " +
  person.firstName + " " +
  person.lastName + "\nSex - " +
  person.gender + "\nDate of birth - " +
  person.dob + "\nHeight - " + 
  height + "\nWeight - " +
  person.weight + " lbs.\nEye color - " +
  person.eyeColor + "\nOccupation - " +
  person.occupation;
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function familySearch(person, people){
  let personsFamilyWithNames = {};
  personsFamilyWithNames.spouse = returnFunctionReturn(function(){
    let spouse = "";
    for (let i = 0; i < people.length; i++){
      if (person.currentSpouse == people[i].id){
        spouse += `${people[i].firstName} ${people[i].lastName}`;
      }
    }
    if (spouse == ""){
      spouse = "none";
    }
    return spouse;
  });

  personsFamilyWithNames.parents = returnFunctionReturn(function(){
    let parents = [];
    for (let i = 0; i < people.length; i++){
      if (person.parents.includes(people[i].id)){
        parents.push(`${people[i].firstName} ${people[i].lastName}`);
      }
    }
    return parents;
  });
  if (personsFamilyWithNames.parents[0]){
    personsFamilyWithNames.parent1 = personsFamilyWithNames.parents[0];
    if(personsFamilyWithNames.parents[1]){
      personsFamilyWithNames.parent2 = `, ${personsFamilyWithNames.parents[1]}`;
    } else {personsFamilyWithNames.parent2 = "";}
  } else {personsFamilyWithNames.parent1 = "no data"; personsFamilyWithNames.parent2 = "";}

  personsFamilyWithNames.siblings = returnFunctionReturn(function(){
    let siblings = [];
    if (person.parents !== []){
      for (let i = 0; i < people.length; i++){
        if (people[i].parents !== [] && person.id !== people[i].id){
          for(let j = 0; j < people[i].parents.length; j++){
            if(!(siblings.includes(` ${people[i].firstName} ${people[i].lastName}`)) && person.parents.includes(people[i].parents[j])){
              siblings.push(` ${people[i].firstName} ${people[i].lastName}`);
            }
          }
        }
      }
      if (siblings.length == 0){
        siblings.push(' no data');
      }
      return siblings;
    }
  })

  alert(`Here is ${person.firstName} ${person.lastName}'s family:
Spouse  -  ${personsFamilyWithNames.spouse}
Parent(s) - ${personsFamilyWithNames.parent1}${personsFamilyWithNames.parent2}
Sibling(s) -${personsFamilyWithNames.siblings}`);
}

function returnFunctionReturn(functionToReturnFrom){
  return functionToReturnFrom();
}

function correctCase(input){
  let revisedString = "";
  let firstLetter = true;
    for(let i = 0; i < input.length; i++){
      if (firstLetter == true){
        revisedString += input[i].toUpperCase();
        firstLetter = false;           
      }
      else if(input[i] === " "){
        revisedString += input[i];
        firstLetter = true;
      }
      else{
        revisedString += input[i].toLowerCase();
      }
    }
  return revisedString;
}

function traitSearch(people){
  let traitsToSearchBy = prompt(`Please type the individual traits you would like to search by, seperated by a comma.\n\nfirst name, last name, age, gender, height, weight, eye color, and/or occupation.`).toLowerCase();
  let traitSearchArray = [...people];
  
  if(traitsToSearchBy.includes('first')){
    let firstName = prompt('Enter the first name of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.firstName.toLowerCase() == firstName.toLowerCase());
  }
  if(traitsToSearchBy.includes('last')){
    let lastName = prompt('Enter the last name of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.lastName.toLowerCase() == lastName.toLowerCase());
  }
  /*
  if(traitsToSearchBy.includes('age')){
    let age = prompt('Enter the age, in years, of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.age === age);
  } */
  if(traitsToSearchBy.includes('gender') || traitsToSearchBy.includes('sex')){
    let gender = prompt('Enter the gender of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.gender.toLowerCase() == gender.toLowerCase());
  }
  if(traitsToSearchBy.includes('height')){
    let height = prompt("Enter the height, in inches (e.g. '72' for 6'0\"), of the person you are searching for.");
      traitSearchArray = traitSearchArray.filter(el => el.height == height);
  }
  if(traitsToSearchBy.includes('weight')){
    let weight = prompt('Enter the weight, in pounds, of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.weight == weight);
  }
  if(traitsToSearchBy.includes('eye') || traitsToSearchBy.includes('color')){
    let eyeColor = prompt('Enter the eye color of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.eyeColor.toLowerCase() == eyeColor.toLowerCase());
  }
  if(traitsToSearchBy.includes('occupation') || traitsToSearchBy.includes('job')){
    let occupation = prompt('Enter the occupation of the person you are searching for.');
      traitSearchArray = traitSearchArray.filter(el => el.occupation.toLowerCase() == occupation.toLowerCase());
  }
  if(traitSearchArray.length == 0){
    alert("No one in the database matches your search.\n\nRestarting search.");
    return app(people);
  }
  else if(traitSearchArray.length == people.length){
    alert("No valid criteria were entered.\n\nRestarting search.");
    return app(people);
  }
  else{
    let traitSearchText = 'The following people match your search:';
    for (let i = 0; i < traitSearchArray.length; i++){
      traitSearchText += `
${traitSearchArray[i].firstName} ${traitSearchArray[i].lastName}`;
  }
  alert(traitSearchText);
  return app(people);
  }
}

function descendantsSearch(person, people){

  let parentId = person.id;
  let foundDescendants = [];
  foundDescendants =  descendantsSearchRecursion(parentId, people, foundDescendants);
  let text = "\n";   
  for (var i = 0; i < foundDescendants.length; i++) {
   text += (`${foundDescendants[i].firstName} ${foundDescendants[i].lastName}\n`);
  }
  let sOrNoS = 's';
  let periodOrColonAndLine = ':\n'
  if(foundDescendants.length == 0){
    periodOrColonAndLine = '.';
  }
  if(foundDescendants.length == 1){
    sOrNoS = '';
  }
  alert(`${person.firstName} ${person.lastName} has ${foundDescendants.length} descendant${sOrNoS}${periodOrColonAndLine}${text}`);
} 

function descendantsSearchRecursion(parentId, people, foundDescendants){
  foundDescendants = people.filter(el => el.parents[0] === parentId || el.parents[1] === parentId);
  let numberOfAdditionalDescendants = foundDescendants.length;
  let additionalDescendants = [];
  let allDescendants = [];
  
  for(let i = 0; i < foundDescendants.length; i++){
    parentId = foundDescendants[i].id;
    additionalDescendants = descendantsSearchRecursion(parentId, people, foundDescendants);
    
    if(additionalDescendants === undefined){
      return additionalDescendants;
    }
  }
  if(numberOfAdditionalDescendants === 0){
    return foundDescendants;
  }
  else{
    return allDescendants = foundDescendants.concat(additionalDescendants);
  }
}

function inchesToFeet(person){
  let height = person.height
  let feet = Math.floor(height / 12);
  let inches = height % 12;
  return `${feet}' ${inches}\"`;
}

function DOBToAge(person){
  var today = new Date();
  let fullBirthday = person.dob;
  let birthdayArray = fullBirthday.split('/');
  fullBirthday = birthdayArray[2] + "," + birthdayArray[0] + "," + birthdayArray[1];
  var birthDate = new Date(fullBirthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
  }
  return age;
}
