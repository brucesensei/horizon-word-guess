exports.makeDisplayword = (word) => {
    var displayWord = ''
    for (let i = 0; i < word.length; i++) {
        if (word[i] == '-') {
            displayWord += '-';
        } else {
            displayWord += '_'; 
        }
    }
    displayWord = displayWord.split("").join(" ");
    return displayWord;
}

