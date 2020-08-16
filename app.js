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
      traitSearch(person, people);
      // TODO: search by traits
      break;
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
    break;
    case "f":
    case "family":
      familySearch(person, people)
      return mainMenu(person, people);
    break;
    case "d":
    case "descendants":
      descendantsSearch(person, people);
      return mainMenu(person, people);
    break;
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
  let personInfo ="Here is the information you requested: \nFull Name - " +
  person.firstName + " " +
  person.lastName + "\nSex - " +
  person.gender + "\nDate of birth - " +
  person.dob + "\nHeight - " + 
  person.height + " in.\nWeight - " +
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

function descendantsSearch(person, people){

  let parentId = person.id;
  let foundDescendants = descendantsSearchRecurscion(parentId, people);
  let numberOfDescendants = foundDescendants.length;
  let additionalDescendants = [];
      for(let i = 0; i < numberOfDescendants; i++){
        parentId = foundDescendants[i].id;
        additionalDescendants.push(descendantsSearchRecurscion(parentId, people));
      }
      let numberOfAdditionalDescendants = additionalDescendants.filter(el => el.length !== 0);
      if(numberOfAdditionalDescendants.length > 0){
        foundDescendants[numberOfDescendants] = ({"firstName": (numberOfAdditionalDescendants[0][0].firstName), "lastName":(numberOfAdditionalDescendants[0][0].lastName)});
      }

  let text = "\n";   
  for (var i = 0; i < foundDescendants.length; i++) {
   text += (`${foundDescendants[i].firstName} ${foundDescendants[i].lastName}\n`);
  }
  alert(`${person.firstName} ${person.lastName} has ${foundDescendants.length} descendants:\n${text}`);
}  

function descendantsSearchRecurscion(parentId, people){
  
  return people.filter(el => el.parents[0] === parentId || el.parents[1] === parentId);
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

  alert(`Here is ${person.firstName} ${person.lastName}'s family:
Spouse   - ${personsFamilyWithNames.spouse}
Parent(s) - ${personsFamilyWithNames.parent1}${personsFamilyWithNames.parent2}
Sibling(s) - `);
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

function traitSearch(person, people){

  let traitOption = prompt("Please type the individual traits you would like to search by, seperated by a comma.\nfirst name, last name, date of birth, gender, height, weight, eye color, and/or occupation.").toLowerCase();

  switch(traitOption){
    case "first name":

    break;
    case "last name":

    break;
    case "dob":
    case "date of birth":

    break;
    case "gender":

    break;
    case "height":
    
    break;
    case "weight":

    break;
    case "eye color":

    break;
    case "occupation":
    
    break;

    default:
    return traitSearch(person, people); // ask again
  }
}