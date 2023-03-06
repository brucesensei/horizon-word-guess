const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//--------------------------- Create the alphabet letters--------------------------------//

for (let i = 0; i < alpha.length; i++) {
  const box = document.createElement("div");
  box.classList.add("letter-box");
  box.setAttribute('id', alpha[i]);
  box.innerText = alpha[i];
  box.addEventListener('click', handleClick);
  document.getElementById("letter-box").appendChild(box);
}

//------------------------conditional logic for click events on letters-----------------//

function handleClick() {
  // get necessary values from the DOM, style as selected, and remove handleClick
  const displayWord = document.getElementById("displayWord").innerHTML;
  const remainingguesses = document.getElementById("remainingGuesses").innerHTML;
  // word passed from the server via ejs as the text in the initially hidden messsage.
  const word = document.getElementById("word").innerHTML;
  const letter = this.innerHTML;
  this.classList.add('selected');
  this.removeEventListener("click", handleClick);
  // assign sounds
  let correct = new Audio("assets/correct.wav");
  let win = new Audio("assets/win.wav");
  let lose = new Audio("assets/lose.wav");
  let wrong = new Audio("assets/wrong.wav");
  
  // handles the case where the letter is in the word and inserts it in the display word.
  if (word.includes(letter)) {
    correct.play();
    let displayArray = displayWord.split(" ")
    for (let i = 0; i < word.length; i++) {
      if (word[i] == letter) {
        displayArray.splice(i, 1, letter);
      }
    }
    // checks if the chosen letter completes the word. Displays win message and disables all
    // handelClick evnets if true. Game play continues if false.
    document.getElementById("displayWord").innerHTML = displayArray.join(" ");
    if (displayArray.includes('_') == false && remainingguesses != 0) {
      setTimeout(function(){
        win.play();
      }, 500);
      const allLetters = document.querySelectorAll(".letter-box");
      for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].removeEventListener("click", handleClick);
      }
      document.getElementById("winner").hidden = false;
    }
  }
  // handles the case where the remaining guess is incorrect. It moves the counter to 0,
  // diables all handleClick events  and displays the failure message.
  else if (displayWord.includes('_') == true && remainingguesses == 1) {
    lose.play();
    const allLetters = document.querySelectorAll(".letter-box");
    for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].removeEventListener("click", handleClick);
    }
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
    document.getElementById("showWord").hidden = false;
  } else {
  //handles the case where the guess is incorrect but gusses remain. Game play continues.
    wrong.play();
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
  }
}

// passes randomly generated emoji to the win and lose hidden messages.
const winArr = ['&#128512;', '&#128513;', '&#128516;', '&#128526;']
const winEmoji = winArr[Math.floor(Math.random()*winArr.length)];
document.getElementById("win-emoji1").innerHTML = winEmoji
document.getElementById("win-emoji2").innerHTML = winEmoji

const loseArr = ['&#128566;', '&#128580;', '&#128558;', '&#128557;']
const loseEmoji = loseArr[Math.floor(Math.random()*loseArr.length)];
document.getElementById("lose-emoji1").innerHTML = loseEmoji
document.getElementById("lose-emoji2").innerHTML = loseEmoji
