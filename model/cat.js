var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema ({
   name: String,
   jokes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joke' }]
  
});

module.exports = mongoose.model('Cat', CatSchema);