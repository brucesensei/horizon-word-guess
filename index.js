//module imports
const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./public/js/serverSide.js');
const wordBank = require('./public/assets/wordBank.js');
const compression = require('compression'); //!!!--------------------------
const helmet = require('helmet'); //!!!------------------------------------

// module initialization
const app = express();
app.use(compression()); //!!!----------------------------------------------
app.use(helmet()); //!!!---------------------------------------------------
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// import of category data for use in the game.
const categories = wordBank.word_bank;


// variable declarations
let word = '';
var displayWord = '';
let category = '';
let displayCategory = '';

// create array of categoreis for display to the user
const choices = Object.keys(categories).sort();

app.get('/', function (req, res) {
  res.render('pages/index', { choices: choices })
});

app.post('/', function (req, res) {
  // get chosen category from the user.
  category = req.body.categorylist;
  // display the category to the user during the game.
  displayCategory = `Category:   ${category}`
  // randomly select the word to be guessed and change to upper case for matching.
  const categoryItems = categories[category];
  word =  categoryItems[Math.floor(Math.random()*categoryItems.length)].toUpperCase();
  // create the underscore word to be displayed to the user.
  displayWord = helper.makeDisplayword(word);
  res.redirect('/game')
});

app.get('/game', function (req, res) {
  res.render('pages/game', {
    displayCategory:displayCategory,
    displayWord: displayWord,
    word: word
  })
});

// There is no need for `app.post('/game', ...` because nothing is being sent from
// the /game route.
 
app.listen(`0.0.0.0:$PORT`, function() {
  console.log('server hopefully running...')
});