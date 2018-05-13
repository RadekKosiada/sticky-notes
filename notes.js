
// triggers addNote function everytime Submit button is clicked
document.querySelector('#sub-button').addEventListener("click", addNote);

function addNote (){
  // declaring a variable and what kind of element will be created - div
 let newNote = document.createElement('div');
 let timeStamp = document.createElement('p');
let button = document.createElement('button');


  // declaring a variable and what text will be included in the div
let textToAdd = document.querySelector('#input').value

  // creating a text node with text typed by user in the input
 let text = document.createTextNode(textToAdd);

 let currentTime = new Date();
 let timeToAdd = document.createTextNode(currentTime.toString());

 let buttonText =document.createTextNode('Delete');
 
  // creating a new div with text typed by user
 newNote.appendChild(text);
 
 timeStamp.appendChild(timeToAdd);
 button.appendChild(buttonText);

//  appending a new note(div) within a div "output"
  document.querySelector('#output').appendChild(timeStamp);
 document.querySelector('#output').appendChild(newNote);
 document.querySelector('#output').appendChild(button);

//  adding an attribute to elements
newNote.setAttribute('class', 'note');
button.setAttribute('class', 'deleteBtn');



 
 
  // assigning an empty string to the input, in order to clear it & enable faster typing of a new note
 document.querySelector('#input').value = '';
};

document.querySelector('.deleteBtn').addEventListener("click", deleteNote)

function deleteNote () {
document.querySelector('.note').style='visibility:hidden';
}



// adding timestamp
// adding delete button

// adding attributes to elements
// trim time to make it look better
// adding notes to cache?

// change cursor when hovers