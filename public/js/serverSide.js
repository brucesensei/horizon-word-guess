exports.makeDisplayword = (word) => {
    var displayWord = ''
    for (let i = 0; i < word.length; i++) {
       displayWord += '_'; 
    }
    displayWord = displayWord.split("").join(" ");
    return displayWord;
}

