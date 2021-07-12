var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("product");
});

router.get('/add', function(req, res, next) {
  res.send('Add all product');
});

router.get('/edit', function(req, res, next) {
  res.send('Edit all product');
});

router.get('/delete', function(req, res, next) {
  res.send('Delete all product');
});

module.exports = router;
