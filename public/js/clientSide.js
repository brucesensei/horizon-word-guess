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

  // handles the case where the letter is in the word and inserts it in the display word.
  if (word.includes(letter)) {
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
    const allLetters = document.querySelectorAll(".letter-box");
    for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].removeEventListener("click", handleClick);
    }
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
    document.getElementById("showWord").hidden = false;
  } else {
  //handles the case where the guess is incorrect but gusses remain. Game play continues.
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
  }
}
