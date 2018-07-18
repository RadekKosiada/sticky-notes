let textToAdd;
let color;

// initializing variables for background colors for post it;
const pink = 'rgb(252, 168, 212)';
const green = 'rgb(196, 249, 141)';
const blue = 'rgb(34, 190, 230)';
const yellow = 'rgb(255,255,165)';

let ctrlPink = false;
let ctrlGreen = false;
let ctrlBlue = false;
let ctrlYellow = true;

let myNote;

// introducing date of adding the note as a key for local storage data
let currentDate = new Date;

let inpKey = `${currentDate}`;
let optionsForDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

// function to get the most preferred language in the respective browser (set in the browser's setting) to save and display date in your locale format
// the variable 'lang' will have country code format i.e. either 'en' or 'en-EN' that will determine the format of the date in the same language. 
// The app will be used/notes will be made most probably in the same language as the browser is used. Thus having the date in the local format will improve consistency of notes and UX in generall. 
let lang = '';
function getLang()
{
 if (navigator.languages != undefined) 
 lang = (navigator.languages[0]).toString(); 
 else 
 lang = (navigator.languages).toString();
}
getLang();

// console.log(lang);

noteObj = {};

// save note as object



let addNote = function() {

textToAdd = $('#input').val();

let dateToDisplay = currentDate.toLocaleDateString(lang, optionsForDate);
console.log(dateToDisplay);

  noteObj = {
    id: inpKey,
    date: dateToDisplay,
    color: yellow,
    text: textToAdd,             
    position: "",
    lastUpdate: "",               
  };

  myNote = JSON.stringify(noteObj);

   //  textToAdd will equal the input typed in the input textarea
  
  // initiating variable that will save the date and the text added, so both can be saved in the locale storage and display later, everytime the app is loaded.
  //  let toBeSaved = `${dateToDisplay}<br><br>${textToAdd}`;

  //text to be displayed between clicking Save and refresh of the page
  $('#output').html('<h1>Adding your note...</h1>'); 
  $('#output').css('text-align', 'center');
   $('#input').val('');   
   //saving the note   
   localStorage.setItem(noteObj.id, myNote);   
   window.location.reload(); 
}

//calling/triggering the function addNote
// when clicked 'Enter';
  $('#input').keypress(function() {
    if(event.which == 13)  addNote();   
  });
// when clicked 'Submit';
  $('#sub-button').click(addNote);
  
// function that will display all the notes after refresh, that is triggered after saving each new note.
$( window ).on("load", function() {

  for (let i=0; i < localStorage.length; i++) {
// here the key that is saved to the localStorage and has a key of 'new Date' will be assigned to variable 'key';
     
    let keyXX = localStorage.key(i);
    let item = localStorage.getItem(localStorage.key(i));   
// console.log(localStorage.getItem(localStorage.key(i)));

    //the variable that will be needed later for changing the color and text of the note
    //it will equal our saved item to object, to handle saved data easier 
    let itemToObj =JSON.parse(localStorage.getItem(localStorage.key(i)));
    //the variable that will be needed later. it will equal our object changed back int string to save into our local storage;
    let itemToString= JSON.stringify(itemToObj);

    let noteToDisplay =JSON.parse(item);
    // console.log(typeof item);
    // console.log(noteToDisplay);
  //  console.log(noteToDisplay.text)
    $('#output').append(
      `<div class='memo' id='memo${i}' style='background-color:${noteToDisplay.color}'>     
        <p class='date' title="This is title">${noteToDisplay.date}</p> 
        <p class='note'>${noteToDisplay.text}</p>      
        <button class='delBtn' id='delBtn${i}' style='background-color:${noteToDisplay.color}'>Delete</button>  
        <button class='editBtn' id='editBtn${i}' style='background-color:${noteToDisplay.color}'>Edit</button>
        <div class='pink' id='pink${i}'></div>
        <div class='green' id='green${i}'></div>
        <div class='blue' id='blue${i}'></div>  
        <div class='yellow' id='yellow${i}'></div>    
      </div>`
    );    
    $('#input').val('');  

     // triggerring alert popup before deleting a note
    $(`#delBtn${i}`).on('click', function(){
      console.log(`clicked ${i}`);
      $('#cover').fadeIn('slow');      
      $('#alertMsg').fadeIn('slow');
      
      // deleting a note when clicked yes
        $('#yesBtn').on('click', function() {
          localStorage.removeItem(keyXX, item);
          window.location.reload(); 
        });
      // hiding pop up when clicked no
        $('#noBtn').on('click', function() {
          $('#cover').fadeOut('slow');
          $('#alertMsg').fadeOut('slow');
          
        });
    });
    
    // find the key; go to the local storage with the key and pull out the item on its own; JSONstringify it to the object and change the object and save it as a string; color will be saved as an object, but then triggered in html from the object.
    // $(`#pink${i}`).on('click', function () {       
    //   itemToObj =JSON.parse(localStorage.getItem(localStorage.key(i)));      
    //   itemToObj.color =pink;  
    //   itemToString= JSON.stringify(itemToObj);      
    //   localStorage.setItem(localStorage.key(i), itemToString);
    //   window.location.reload();

    //   // http://fortuito.us/diveintohtml5/storage.html#methods
    //   // https://stackoverflow.com/questions/7265028/how-do-i-change-a-single-value-inside-a-localstorage-item
    //   // http://jsfiddle.net/F8sF2/
    // }); 
    // this function would need to be repeeated for each color, instead of that, I am using updateBackgroundColor(); 
  
  //UPDATING THE COLOR
  function updateBackgroundColor(event) {
    let target = event.target;    
    // itemToObj =JSON.parse(localStorage.getItem(localStorage.key(i)));      
      itemToObj.color ={pink: pink, green: green, blue: blue, yellow: yellow}[target.className];  
      let itemToString= JSON.stringify(itemToObj);      
      localStorage.setItem(localStorage.key(i), itemToString);
      console.log(itemToString);
      window.location.reload();
      // if (itemToObj.color == green) {
      //   $(`.green`).css('display', 'none');
      // }
  }
  $(`#yellow${i}`).on('click', updateBackgroundColor);
  $(`#blue${i}`).on('click', updateBackgroundColor);
  $(`#green${i}`).on('click', updateBackgroundColor);
  $(`#pink${i}`).on('click', updateBackgroundColor);

  //UPDATING THE TEXT 
  function updateNote () {   
    $('#cover').fadeIn('slow');
    $('#alertMsg3').fadeIn('slow');
    $('#editInput').text(`${itemToObj.text}`);   
    console.log($('#editInput').val());
    
    $('#saveEdit').on('click', function() {       
      let editedText = $('#editInput').val();
      itemToObj.text=editedText;
      let itemToString = JSON.stringify(itemToObj);
      localStorage.setItem(localStorage.key(i), itemToString);  
      window.location.reload();
    });

    $('#cancelEdit').on('click', function() {       
      $('#cover').fadeOut('slow');
      $('#alertMsg3').fadeOut('slow');
        
      
    });
  };
$(`#editBtn${i}`).on('click', updateNote);
  
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

// Deleting all notes at once
$('#delAll').on('click', function () {  
  // showing 'are you sure?' popup
  $('#cover').fadeIn('slow');      
  $('#alertMsg2').fadeIn('slow');
  
  // deleting all notes when clicked yes
    $('#yesBtn2').on('click', function() {
      localStorage.clear();
      window.location.reload(); 
    });
  // hiding alert pop up when clicked no
    $('#noBtn2').on('click', function() {
      $('#cover').fadeOut('slow');
      $('#alertMsg2').fadeOut('slow');
    });
});




// opacity: 0;
// transition: opacity 0.3s;
// background-color: grey;
// color: white;

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

// 04.06
// working on the yes-no alert popup & cover DONE
// dopasowywanie sie do wielkosci notki? DONE
// trim time to make it look better, change date format DONE
// adapting font-size of the note when hover DONE
// detecting the most preferred browsers language DONE
// adapting date format to the browser's language/country DONE
// adapting the alert button! (size, position and cover) DONE
// size of the cover DONE
// more info in the middle DONE
// font ladny i z internationalnymi znakami DONE
// this weird effect when start typing in the text area DONE
// when fixed the more info, change the background color? DONE

// 05.06
// two different fonts for instruction and notes DONE
// text wrapping DONE
// square notes DONE
// transform/scale when hover on the note DONE
// Adjusting the size of the element when the text 'too long'. DONE by using % or width and height  
// working on the placement of the Del button DONE by setting width and height of the memo with %, so delete button went down
// and adjusting the margin-top of the Delete button when different lenght of the text DONE
// box shadow effect, so it looks like sticked post it DONE
// header font size adapted DONE
// notes side by side, DONE thanks to float: left DONE

// 06.06
// find different colours for post it DONE
// changing colors for pink, green, blue and yellow DONE
// adjusting other colors in the app 

// do it all with a little example. build a new app and change the colors
// check drag and drop

// 12.06
// minor fixes
// clear all Button localStorage.clear(); DONE

//17.06
// editing DONE
//18.06
//drag and drop? x and y position?


// download as pdf
// drag and drop for notes and remembering the position of the notes after refresh?

// edit button?



// ze notki sie wykrzywiaja na boki

