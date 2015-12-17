// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');

// var magicCatBubble = function(r){
//  var x = r[Math.floor(Math.random() *(r.length))];
//      return x
//    };

// router.use(bodyParser.urlencoded({ extended: true }))

// router.use(function(req, res, next) {
//   console.log('At least something is happening with the cat bubble response');
//   next();
// })

// router.route('/catBubble')
// // POST NEW JOKE BY CAT
// .post(function(req, res){
//   var newBubble = {
//       name: req.body.name,
//     }

//     mongoose.model('Bubble').create(newBubble, function(err, bubble){
//             if(err){
//           res.send("you have a problem");
//             }else {
//         res.send(bubble);
          
//         }
//       });
//     })


// .get(function(req, res) {
//   mongoose.model('Bubble').find({}, function(err, bubble){
//     if(err){
//       res.send("You got 99 Problems");
//     } else {
//       console.log("You are getting bubbles")
//       console.log(bubble);
//       var bubArr = []
//       var bub = bubble.map(function(r){
//         bubArr.push(r.name)
//       })
//       res.json(magicCatBubble(bubArr));
//     }
//   });
// })

// // GET BUBBLE BY ID
// router.route('/catBubble/item/:_id')

//      .get(function(req, res) {
//        mongoose.model('Bubble').findById(req.params._id, function(err, bubble) {
//            if (err)
//                res.send(err);
//            console.log(bubble);
//            res.json(bubble);
//        });
//    })



// module.exports = router;