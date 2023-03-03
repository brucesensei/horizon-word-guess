// addEventListener click
// style letter-box inline-block, font-size, color, box-size height/width


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

  // letter in word case
  if (word.includes(letter)) {
    let displayArray = displayWord.split(" ")
    for (let i = 0; i < word.length; i++) {
      if (word[i] == letter) {
        displayArray.splice(i, 1, letter);
      }
    }
    document.getElementById("displayWord").innerHTML = displayArray.join(" ");
  }
  
  // success case. try to pull this out of the
  if (displayWord.includes('_') == false && remainingguesses != 0) {
    const allLetters = document.querySelectorAll(".letter-box");
    for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].removeEventListener("click", handleClick);
    }
    document.getElementById("winner").hidden = false;
  }

  if (displayWord.includes('_') == true && remainingguesses == 1) {
    const allLetters = document.querySelectorAll(".letter-box");
    for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].removeEventListener("click", handleClick);
    }
    document.getElementById("showWord").hidden = false;
  }

  // letter not in word case
  if (word.includes(letter) == false) {
    document.getElementById("remainingGuesses").innerHTML = remainingguesses - 1
  }
  console.log(this.innerHTML);
}

console.log(document.getElementById("word").innerHTML);





