var express = require('express');
var router = express.Router();
var operate = require('../operations.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.signedCookies.name)
		res.render('index', { title: 'Chat' });
	else
		res.redirect('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

router.post('/signup', function(req, res) {
	if(!req.body.username || !req.body.password) {
		res.render('signup', { title: 'Sign up', e: 'Invalid Username/Password'});
	}
	else {
		var username = req.body.username;
		var password = req.body.password;
		operate.addUser(username, password, function(err){
			if(err) throw err;
			res.redirect('/signin');
		});
	}
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Login' });
});

router.post('/signin', function(req, res) {
	if(!req.body.username || !req.body.password) {
		res.render('signin', { title: 'Sign in', e: 'Invalid Username/Password'});
	}
	else {
		var username = req.body.username;
		var password = req.body.password;
		console.log('trying to sign in', req.body);
		operate.authenticate(username, password, function(err, user) {
			if(err) throw err;
			if(!user) {
				res.render('signin', { title: 'Sign in', e: 'Incorrect Password'});
			}
			else if(user.length === 0) {
				res.render('signin', { title: 'Sign in', e: 'No user by that name'});
			}
			else {
				res.cookie('name', username, { expires: new Date(Date.now() + 900000), signed: true});
				res.redirect('/');
			}
		});
	}
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('name');
	res.redirect('/signin');
});

module.exports = router;