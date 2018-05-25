

let textToAdd;
// introducing date of adding the note as a key for local storage data
let inpKey = `${new Date}`;


 $('#sub-button').on('click', function() {
  //  textToAdd will equal the input typed in the input textarea
  textToAdd = $('#input').val();
 
  $('#output').append(`
    <div class='memo'>
      <p class='date'>${new Date}</p>
      <p class='note'>${textToAdd}</p>
      <button class='delBtn'>Delete</button></div>`); 
  $('#input').val('');
   
  localStorage.setItem(inpKey, textToAdd);

 
});

$( window ).on( "load", function() {

for (let i=0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  
  $('#output').append(`
    <div class='memo'>
      <p class='date'>${key}</p>
      <p class='note'>${localStorage.getItem(key)}</p>
      <button class='delBtn' id='${i}'>Delete</button></div>`);
      // $('.delBtn').html(`<button class='delBtn' id='${i}'>Delete</button>`)
  $('#input').val('');


}
});








