var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catBubbleSchema = new Schema ({
   name: String
  
});

module.exports = mongoose.model('Bubble', catBubbleSchema);