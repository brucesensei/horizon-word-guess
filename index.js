const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./public/js/serverSide.js')
const wordBank = require('./public/assets/wordBank.js')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const categories = wordBank.word_bank;
let word = '';
var displayWord = '';
let category = '';
let displayCategory = '';
// expose keys on object categories
const choices = Object.keys(categories).sort();

app.get('/', function (req, res) {
  res.render('pages/index', { choices: choices })
});

app.post('/', function (req, res) {
  category = req.body.categorylist;
  displayCategory = `Category:   ${category}`
  const categoryItems = categories[category];
  word =  categoryItems[Math.floor(Math.random()*categoryItems.length)].toUpperCase();
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

app.post('/game', function (req,res) {
  console.log('hello from game.')
});

app.listen(3000, function() {
  console.log('server running on port 3000')
});