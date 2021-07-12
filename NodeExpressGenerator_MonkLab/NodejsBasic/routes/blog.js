var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const monk = require('monk')

const url = 'localhost:27017/TutorialDB';
const db = monk(url);

router.get('/', function(req, res, next) {
  res.render("blog");
});

router.get('/add', function(req, res, next) {
  res.render("addBlog");
});

router.post('/add', [
  body("name", "Please Input your blog name").not().isEmpty(),
  body("description", "Please Input your blog description").not().isEmpty(),
  body("author", "Please Input your blog author").not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addBlog', {errors:errors});
    // return res.status(400).json({ errors: errors.array() });
  }else{
    // Insert to DB
    var ct = db.get('blogs');
    ct.insert({
      name:req.body.name,
      description:req.body.description,
      author:req.body.author
    }, function(err, blog){
        if (err) {
          res.send(err);
        }else{
          req.flash("success", "Save Data Success");
          res.location('/blog/add');
          res.redirect('/blog/add');
        }
    })
  }

});

module.exports = router;
