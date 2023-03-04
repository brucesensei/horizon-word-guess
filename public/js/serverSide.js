//Creates the underscore string for display to the user and inserts hyphens if present.
//exports to index.js

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

