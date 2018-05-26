

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


     // triggerring alert popup before deleting a note
    $(`#delBtn${i}`).on('click', function(){
      $('#cover').fadeIn('slow');
      $('#alertMsg').fadeIn('slow');

      // deleting a note when clicked yes
        $('#yesBtn').on('click', function() {
          localStorage.removeItem(key, localStorage.getItem(localStorage.key(i)));
          window.location.reload(); 
        });
      // hiding pop up when clicked no
        $('#noBtn').on('click', function() {
          $('#cover').fadeOut('slow');
          $('#alertMsg').fadeOut('slow');
        });

    });  
  };
});

// Additional info displayed when hover on 'learn more'
  $('#tooltip').mouseenter( function() {
    $('#tooltiptext').fadeIn();
    $('#tooltiptext').fadeIn('slow');

});

$('#tooltip').mouseleave( function() {
  $('#tooltiptext').fadeOut();  
  $('#tooltiptext').fadeOut('slow');
 
});



// 24.05
// adding timestamp DONE
// 25.05
// adding delete button DONE
// adding attributes to elements DONE
// change cursor when hovers DONE
// jako KEY mozna uzyc daty! DONE
// dodac obsluge przez klawisze DONE
// koniecznie znalezc sposob na kasowanie lepszy DONE
// adding delete option DONE
// 26.05
// are you sure alert? DONE &FIXED
// add info on the beginning, when hover? DONE
// working on confirm field
// having white cover when info text faded in doesnt work

// NEXT
// adapting the alert button! (size, position and cover)
// dopasowywanie sie do wielkosci notki?
// jakos ladnie umiejscowic na srodku 'more info' 
// trim time to make it look better, change date format
// download as pdf
// font ladny i z internationalnymi znakami





