var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'mmdr';
	locals.filters = {
		mmdr: req.params.mmdr
	};
	locals.data = {
		mmdrs: []
	};
	
	// Load the current mmdr
	view.on('init', function(next) {
		
		var q = keystone.list('Mmdr').model.findOne({
			state: 'ready',
			slug: locals.filters.mmdr
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.mmdr = result;
			next(err);
		});
		
	});
	
	/* Load other mmdrs
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	*/
	// Render the view
	view.render('mmdr');
	
};
