

let textToAdd;
// introducing date of adding the note as a key for local storage data
let inpKey = `${new Date}`;

let addNote = function() {
   //  textToAdd will equal the input typed in the input textarea
   textToAdd = $('#input').val();
 
   $('#output').append(`
     <div class='memo'>
       <p class='date'>${new Date}</p>
       <p class='note'>${textToAdd}</p>
       <button class='delBtn'>Delete</button></div>`); 
   $('#input').val('');      
   localStorage.setItem(inpKey, textToAdd);   
   window.location.reload(); 
}
  $('#input').keypress(function() {
    if(event.which == 13)  addNote();   
  });

  $('#sub-button').click(addNote);


$( window ).on( "load", function() {

  for (let i=0; i < localStorage.length; i++) {
// here the key that is saved to the localStorage and has a key of 'new Date' will be assigned to variable 'key';
    const key = localStorage.key(i);
    
    $('#output').append(`
      <div class='memo'>
        <p class='date'>${key}</p>
        <p class='note'>${localStorage.getItem(key)}</p>
        <button class='delBtn' id='delBtn${i}'>Delete</button></div>`);
        // $('.delBtn').html(`<button class='delBtn' id='${i}'>Delete</button>`)
    $('#input').val('');

    $(`#delBtn${i}`).on('click', function(){

      localStorage.removeItem(key, localStorage.getItem(localStorage.key(i)));
      window.location.reload(); 

    });  
  };
});














