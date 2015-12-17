var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))


function isLoggedIn(req, res, next){
  console.log('is logged in is being called')
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.use(function(req, res, next) {
 console.log('At least something is happening');
 next();
})

//Route to get all jokes where user id = req.user._id
router.route('/user/jokes')
  .get(function(req, res){
    console.log("getting all user balls", req.user)
    mongoose.model('Cat').find({
      user: req.user._id || '56688fe13376877f0990f7bd'
    },function(err, cat){
      console.log(cat)
      if(err)
        res.send(err)
      res.json(cat)
    })
  })

router.route('/cat')
   .post(function(req, res){
       console.log("about to create ball", req.user)
       mongoose.model('Cat').create({
           name: req.body.name,
           user: req.user._id

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
  .populate('jokes').populate('user').exec(function(err, cat){
    if(err){
      return console.log(err);
    } else {
       res.json(cat);
    }
  });
})


//API/BALL/currentUser
//returns current user
router.route('/currentUser')
  .get(function(req, res){
    if(req.user){
    console.log("I found the user");
    mongoose.model('User').find({
      _id: req.user._id
    }, function(err, user){
      console.log(user)
      if(err)
        res.send(err)
      res.json(user)
    })
    } else {
      res.json({user: 'anonymous'})
    }

  })

  //mongoogose model find USER
  // user : req.user
  //res user



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