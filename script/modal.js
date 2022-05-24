// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.querySelector('.modalBtn');

let btnMobile = document.querySelector('#button_mobile')

let loginLink = document.querySelector('.login_link')

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the modal 
if (loginLink == null){
  btn.onclick = function() {
    modal.style.display = "block";
  }

  btnMobile.onclick = function() {
    modal.style.display = "block";
  }
} else {
  loginLink.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
  }
}






// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}