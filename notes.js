
// triggers addNote function everytime Submit button is clicked
document.querySelector('#sub-button').addEventListener("click", addNote);

function addNote (){
  // declaring a variable and what kind of element will be created - div
 let newNote = document.createElement('div');
 let timeStamp = document.createElement('time');
 let currentTime = new Date();
 let timeToAdd = currentTime.toString();
 console.log(timeToAdd);
  // declaring a variable and what text will be included in the div
let textToAdd = document.querySelector('#input').value
  // creating a text node with text typed by user in the input
 let text = document.createTextNode(textToAdd)
  // creating a new div with text typed by user
 newNote.appendChild(text);
//  appending a new note(div) within a div "output"
 document.querySelector('#output').appendChild(newNote, timeToAdd);
  // assigning an empty string to the input, in order to clear it & enable faster typing of a new note
 document.querySelector('#input').value = '';
};



// timestamp
// delete button
// adding notes to cache?