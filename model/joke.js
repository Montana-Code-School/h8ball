var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JokeSchema = new Schema ({
   joke: Array,
   cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }
  
});

module.exports = mongoose.model('Joke', JokeSchema);

