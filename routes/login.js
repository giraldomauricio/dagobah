var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

/*
 * POST to adduser.
 */
router.post('/login', function(req, res) {
    console.log("Login called by: " + req.body.username);
    var db = req.db;
    db.collection('profile').findOne({email: req.body.username}, function (err, result) {
    	json = {msg: false}
    	if(result != null)
    	{
    		if(passwordHash.verify(req.body.password, result.password))
    		{
    			result.password = '';
    			req.session.user_session = result;
    			json = {msg: true}
    		}
    	}
      res.json(json);
    });

});

module.exports = router;
