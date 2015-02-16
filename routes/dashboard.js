var express = require('express');
var router = express.Router();

/*
 * POST to adduser.
 */
router.post('/', function(req, res) {
    res.json(req.session.user_session);
});

module.exports = router;