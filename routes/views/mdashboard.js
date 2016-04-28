var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'mdashboard';
	locals.filters = {
		groupdid: req.params.groupdid
	};
	locals.data = {
		mmdrs: []
	};
	
	// Load the dashboards
	view.on('init', function(next) {
		
		var q = keystone.list('Mmdr').model.find().distinct("groupid");
		
		q.exec(function(err, results) {
			locals.data.mmdrs = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('mdashboard');
	
};
