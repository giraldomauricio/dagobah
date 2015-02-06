var express = require('express');
var router = express.Router();

/*
 * POST to adduser.
 */
router.post('/login', function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = router;
