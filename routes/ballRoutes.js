var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

router.use(function(req, res, next) {
 console.log('At least something is happening');
 next();
})

router.route('/cat')
   .post(function(req, res){
       console.log("Ball not created")
       mongoose.model('Cat').create({
           name: req.body.name

       }, function(err, cat){
           console.log("ball", cat);
           if(err)
               res.send(err)

           res.json(cat)
       })
   })
router.route('/cats')
//GET ALL CATEGORY
.get(function(req, res) {
 console.log("I found some cats");
  mongoose.model('Cat').find({})
  .populate('jokes').exec(function(err, cat){
    if(err){
      return console.log(err);
    } else {
       res.json(cat);
    }
  });
})

router.route('/cat/:cat_id')
// GET JOKE BY ID
  .get(function(req, res){
      mongoose.model("Cat").findById(req.params.cat_id)
      .populate('jokes').exec(function(err, cat){
          if(err){
              res.send("You didn't get all of the cat");
          } else{
              console.log("You are getting the cat by ID");
              res.json(cat);
          }
      })
  })

.delete(function(req, res) {
     mongoose.model("cat").remove({
         _id: req.params.cat_id
     }, function(err, cat) {
         if (err)
             res.send(err);
         res.json({ message: 'Deleted' });
     });
 });
router.route('/search/:query')
.get(function(req, res) {
  console.log('searching for ', req.params.query);
    mongoose.model('Cat')
      .find({
        '$text': {
          '$search': req.params.query
        }
      })
      .exec(function(err, cat) {
        if (err)
          res.send(err);

        res.send(cat);
      });
  });

module.exports = router;