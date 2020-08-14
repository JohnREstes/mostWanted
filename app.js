"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
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

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      alert("Here is the information you requested: \nFull Name - " +
      person.firstName + " " +
      person.lastName + "\nSex - " +
      person.gender + "\nDate of birth - " +
      person.dob + "\nHeight - " + 
      person.height + " in.\nWeight - " +
      person.weight + " lbs.\nEye color - " +
      person.eyeColor + "\nOccupation - " +
      person.occupation);
    break;
    case "family":
      familySearch(person, people)
    break;
    case "descendants":
      let foundDescendants = descendantsSearch(person, people);
      
      console.log(person[0].parents[0]);
      descendantSearch(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
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

  let foundDescendants = people.filter(el => el.parents[0] === parentId);
  //let foundDescendants2 = people.filter(el => el.parents[1] === parentId);

  console.log(foundDescendants[0].firstName);

  alert(descendantsMessage(person, foundDescendants));

  return foundDescendants;
}  

function descendantMessage(person, foundDescendants){

  var text = person.firstName + " " + person.lastName + " has " + foundDescendants1.length + " descendants.\n" + "They are: \n";    
  for (var i = 0; i < foundDescendants.length; i++) {
   text += foundDescendants[i].firstName + "\n";
  }
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

function descendantSearch(person, people){

  let foundDescendant = people.filter(function(person, people){
    let personsId = person[0].id;
    if(person[0].id === people.parents[0]){
      return true;
    }
    else{
      return false;
    }
  })
  return foundDescendant;
}  

function returnFunctionReturn(functionToReturnFrom){
  return functionToReturnFrom();
}
