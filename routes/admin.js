var express = require('express');
var router = express.Router();
var ObjectID = require('mongoskin').ObjectID;
var passwordHash = require('password-hash');
/* GET main page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});
/*
 * POST to create_organization.
 */
router.post('/create_organization', function(req, res) {
    var db = req.db;
    req.session.org = req.body.name
    db.collection('organization').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});
/*
 * GET get_organizations.
 */
router.get('/get_organization', function(req, res) {
    var db = req.db;
    console.log("just created:" + req.session.org)
    db.collection('organization').find().toArray(function (err, items) {
        res.json(items);
    });
});
/*
 * GET get_organizations.
 */
router.get('/get_organization/:id', function(req, res) {
    
    organization_id = new ObjectID(req.params.id);
    var db = req.db;
    db.collection('organization').findOne({_id: organization_id}, function (err, result) {
        res.json(result);
    });
});
/*
 * GET get_organization_full.
 */
router.get('/get_organization_full/:id', function(req, res) {
    
    organization_id = new ObjectID(req.params.id);
    var db = req.db;
    db.collection('organization').findOne({_id: organization_id}, function (err, result) {
        db.collection('profile').find({organization_id: organization_id}).toArray(function (err, items) {
		        result.profiles = items;
		        db.collection('location').find({organization_id: organization_id}).toArray(function (err, items) {
				        result.locations = items;
				        db.collection('question').find({organization_id: organization_id}).toArray(function (err, items) {
						        result.questions = items;
						        res.json(result);
						    });
				        
				    });
		        
		    });
        
    });
});

/*
 * GET get_profiles.
 */
router.get('/get_profiles/:id', function(req, res) {
    
    organization_id = new ObjectID(req.params.id);
    var db = req.db;
    db.collection('profile').find({organization_id: organization_id}).toArray(function (err, items) {
        res.json(items);
    });
});
/*
 * GET get_profiles.
 */
router.get('/get_locations/:id', function(req, res) {
    
    organization_id = new ObjectID(req.params.id);
    var db = req.db;
    db.collection('location').find({organization_id: organization_id}).toArray(function (err, items) {
        res.json(items);
    });
});
/*
 * GET get_profiles.
 */
router.get('/get_questions/:id', function(req, res) {
    
    organization_id = new ObjectID(req.params.id);
    var db = req.db;
    db.collection('question').find({organization_id: organization_id}).toArray(function (err, items) {
        res.json(items);
    });
});
/*
 * POST to create_profile.
 */
router.post('/create_profile', function(req, res) {

    var db = req.db;

    req.body.organization_id = new ObjectID(req.body.organization_id);
    req.body.password = '1234';
    req.body.password = passwordHash.generate(req.body.password);

    db.collection('profile').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});
/*
 * POST to create_location.
 */
router.post('/create_location', function(req, res) {

    var db = req.db;

    req.body.organization_id = new ObjectID(req.body.organization_id);
    db.collection('location').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});

/*
 * POST to create_question.
 */
router.post('/create_question', function(req, res) {

    var db = req.db;

    req.body.organization_id = new ObjectID(req.body.organization_id);
    db.collection('question').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});

module.exports = router;