var React = require('react');
var App = require('./newJoke');
var Joke = require('./magic');
var AllCats = require('./allCats');


React.render(<App/>, document.getElementById('newJokes'));
React.render(<Joke/>, document.getElementById('ball'));
React.render(<AllCats/>, document.getElementById('cats'));
