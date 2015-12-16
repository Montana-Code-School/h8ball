var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var magicBall = function(r){
 var x = r[Math.floor(Math.random() *(r.length))];
     return x
   };

router.use(bodyParser.urlencoded({ extended: true }))

router.use(function(req, res, next) {
  console.log('At least something is happening with cats and jokes');
  next();
})

router.route('/cat/:id')
// POST NEW JOKE BY CAT
 .post(function(req, res){
   console.log("joke not created")
   mongoose.model('Joke').create({
       joke: req.body.joke
   },function(err, joke ){
     if(err)
       return res.send(err)
     mongoose.model('Cat').findById({
       _id: req.params.id
       }, function(err, cat){
           if(err)
             return res.send(err)
           cat.jokes.push(joke._id)
           cat.save();
           console.log(joke);
           res.json(joke)             
           })

   })
 })

router.route('/cat/justone/:cat_id')

 // GET JOKE BY ID
 .get(function(req, res){
     mongoose.model("Cat").findById(req.params.cat_id)
     .populate('jokes').exec(function(err, cat){
         if(err)
           res.send("You didn't a random joke");
         res.json(magicBall(cat.jokes[0].joke));
      })
  })



  .delete(function(req, res) {
      mongoose.model("Joke").remove({
          _id: req.params.joke_id
      }, function(err, joke) {
          if (err)
              res.send(err);
          res.json({ message: 'Deleted' });
      });
  });

module.exports = router;