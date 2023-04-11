//module imports
const express = require('express');
const bodyParser = require('body-parser');
const wordBank = require('./public/assets/wordBank.js');
const compression = require('compression');
const helmet = require('helmet');

// module initialization
const app = express();
app.use(compression());
app.use(helmet()); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// import of category data for use in the game.
const categories = wordBank.word_bank;

// variable declarations
let displayCategory = '';
let categoryItems = [];

// create array of categoreis for display to the user
const choices = Object.keys(categories).sort();

app.get('/', function (req, res) {
  res.render('pages/index', { choices: choices })
});

app.post('/', function (req, res) {
  const category = req.body.categorylist;
  // remove random from the categories. remove all files that start with dot.
  // randomly select a list from the elementary school lists and send data to the game.
  if (category == 'Random') {
    choicesCopy = [...choices];
    choicesCopy.splice(choicesCopy.indexOf('Random'), 1);
    let newList = []
    for (let i = 0; i<choicesCopy.length;i++) {
      if (!choicesCopy[i].startsWith('.')) {
        newList.push(choicesCopy[i])
      }
    }
    const randomChoice = newList[Math.floor(Math.random()*newList.length)];
    displayCategory = `Category:   ${randomChoice}`
    categoryItems = categories[randomChoice];
    res.redirect('/game')
  } else {
    displayCategory = `Category:   ${category}`
    // randomly select the word to be guessed and change to upper case for matching.
    categoryItems = categories[category];
    res.redirect('/game')
  }
});

app.get('/game', function (req, res) {
  res.render('pages/game', {
    displayCategory:displayCategory,
    categoryItems: categoryItems
  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
});
