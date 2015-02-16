var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/start', function(req, res, next) {
  res.render('welcome');
});

module.exports = router;