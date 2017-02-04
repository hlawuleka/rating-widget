"use strict";

var express = require('express');
var mysql   = require('mysql');
var router  = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'ratingWidget',
    user: 'root',
    password: 'root'
});

router.post('/', function (req, res, next) {
	var userEmail   = (req.body.email),
	 	userMessage = (req.body.message),
	 	userRating  = (req.body.rating);

	var query = "INSERT INTO userRatings(email, message, rating, RatingRead) VALUES('"+userEmail+"', '"+userMessage+"', "+userRating+", 0)";

    connection.query(query, function(error, rows, fields){
		if(!!error){
			console.log(error);
			return res.status(500).json({
				title : 'Wow! , what was that ?',
				status: false,
				message: 'Oops, somthing went wrong on our side, please reload the page and try again.'
			});
		}else{
			res.status(200).json({
				title : 'Thanks a million for rating us!',
				status: true,
				message : 'Thanks for rating us with a level ' + userRating + ' rating'
			});
		}	
	});
});
router.get('/', function (req, res, next) {

	var query = "SELECT * FROM userRatings ORDER BY id DESC, rating DESC";

    connection.query(query, function(error, rows, fields){
		if(!!error){
			return res.status(500).json({
				message:'no ratings found'
			});
		}else{

			res.send(JSON.stringify({
				ratingsData: rows,
				message : 'Ratings found'
			}));
		}	
	});
});
router.patch('/:id', function (req, res, next) {

	const id = req.params.id;

	var query = "UPDATE userRatings SET RatingRead = 1 WHERE id = "+id;

    connection.query(query, function(error){
		if(!!error){
			console.log('Error!');
			return res.status(500).json({
				success: false,
				message:'Failed to mark message as read'
			});
		}else{
			res.send(JSON.stringify({
				success: true,
				message : 'Message marked as read for rating id:'+ id
			}));
		}	
	});
});

module.exports = router;