const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (let i = 0; i < alpha.length; i++) {
  const box = document.createElement("div");
  box.classList.add("letter-box");
  box.setAttribute('id', alpha[i]);
  box.innerText = alpha[i];
  box.addEventListener('click', handleClick);
  document.getElementById("letter-box").appendChild(box);
}

function handleClick() {
  const displayWord = document.getElementById("displayWord").innerHTML;
  const remainingguesses = document.getElementById("remainingGuesses").innerHTML;
  const word = document.getElementById("word").innerHTML;
  const letter = this.innerHTML;
  this.classList.add('selected');
  this.removeEventListener("click", handleClick);

  if (word.includes(letter)) {
    let displayArray = displayWord.split(" ")
    for (let i = 0; i < word.length; i++) {
      if (word[i] == letter) {
        displayArray.splice(i, 1, letter);
      }
    }
    document.getElementById("displayWord").innerHTML = displayArray.join(" ");
    if (displayArray.includes('_') == false && remainingguesses != 0) {
      const allLetters = document.querySelectorAll(".letter-box");
      for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].removeEventListener("click", handleClick);
      }
      document.getElementById("winner").hidden = false;
    }
  }
  
  if (displayWord.includes('_') == true && remainingguesses == 1) {
    const allLetters = document.querySelectorAll(".letter-box");
    for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].removeEventListener("click", handleClick);
    }
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
    document.getElementById("showWord").hidden = false;
  }

  if (word.includes(letter) == false) {
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
  }
}
