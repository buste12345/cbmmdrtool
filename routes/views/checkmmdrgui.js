var async = require('async'),
keystone = require('keystone');
var Mmdr = keystone.list('Mmdr');
var uuid = require('node-uuid');
const a = require('../functions/mmdrcheck');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'checkmmdrgui';
	locals.filters = {
		groupid: req.params.groupid
	};
	locals.data = {
		mmdrs: []
	};
	
	/* Function to call the provided group DID*/
	
	var callgroupdid = function (val, callback){
		//console.log(mrdids[0]);
		callback(val);
	};

	if(req.body.action == "START" && req.params.groupid)
	{
		//callgroupdid(req.body.groupid,function(val){		});
		console.log("tak");
	}

/*	
	view.on('init', function(next) {
		locals.data.posts = "kek";
	
	});
*/
	view.on('init', function(next) {
		
		var q = keystone.list('Review').model.find({groupid:req.params.groupid});
		
		q.exec(function(err, results) {
			locals.data.mrgroup = results;
			locals.data.groupid = req.params.groupid;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('checkmmdrgui');
	
	//res.send(req.body);
};


