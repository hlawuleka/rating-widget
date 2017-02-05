"use strict";

var express = require('express');
var mysql   = require('mysql');
var router  = express.Router();
var dbContext = require('../env/db');
var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize');
var Ratings = require('../models/Ratings.model');


if(dbContext == 'mongo' ) {
	var db = 'mongodb://localhost/userRatingss';
	mongoose.connect(db);

	router.get('/', function(req, res) {

	  Ratings.find({})
	    .exec(function(error, ratings) {
	      if(!!error){
				return res.status(500).json({
					message:'no ratings found'
				});
			}else{

				res.send(JSON.stringify({
					ratingsData: ratings,
					message : 'Ratings found'
				}));
			}	
	    });

	});

	router.post('/', function(req, res) {
	  	var rating = new Ratings();

	    var userEmail   = sanitize(req.body.email).toString(),
		    userMessage = sanitize(req.body.message).toString(),
		    userRating  = sanitize(req.body.rating).toString(),
		    RatingRead  = sanitize(0),
		    id  = sanitize(0);
		
		rating.email = userEmail;
	  	rating.message = userMessage;
	  	rating.rating = userRating;
	  	rating.RatingRead = RatingRead;
	  	rating.id = id;

	    rating.save(function(error, rating) {
			if(!!error){
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

	router.patch('/:id', function(req, res) {
		Ratings.findOneAndUpdate({
		    _id: req.params.id
		    },
		    { $set: { RatingRead: 1 }
		  }, {upsert: true}, function(error, updatedRating) {
		    if(!!error){
				return res.status(500).json({
					success: false,
					message:'Failed to mark message as read'
				});
			}else{
				res.send(JSON.stringify({
					success: true,
					message : 'Message marked as read for rating id:'+ req.params.id
				}));
			}	
		});
	});

} else {
	var connection = mysql.createConnection({
	    host: 'localhost',
	    database: 'mydevnxl_portfolio_db',
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

}

module.exports = router;