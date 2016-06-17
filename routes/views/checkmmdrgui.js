var async = require('async'),
keystone = require('keystone');
var Mmdr = keystone.list('Mmdr');
var Review = keystone.list('Review');
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
		
		var q = keystone.list('Mmdr').model.find({groupid:val}).select("mrdid state journal");
		
		q.exec(function(err, results) {
			callback(results);
			if(err)
				console.log(err);
		});
		
	};

	if(req.body.action == "START" && req.params.groupid)
	{
		callgroupdid(req.params.groupid,function(val){
			
			//console.log(val[0].mrdid);
			for(var i=0;i<val.length;i++)
			{
				var newReview = new Review.model({
				 mrdid: val[i].mrdid,
				 status: "In progress...",
				 groupid: req.params.groupid,
				 checkedby: ""
				});
				
				newReview.save(function(err, item) {
					 // Review has been saved
					 console.log(err);
					 
				});
				a.newReview(req.params.groupid, val[i].mrdid, val[i].journal, newReview.id);
			
			}
		});
		
	}

/*	
	view.on('init', function(next) {
		locals.data.posts = "kek";
	
	});
*/
	view.on('init', function(next) {
		
		if(req.query.results == "mmdrv")
		{
		var q = keystone.list('Review').model.find({groupid:req.params.groupid});
		
		q.exec(function(err, results) {
			locals.data.mrgroup = results;
			locals.data.groupid = req.params.groupid;
			locals.data.res = req.query.results;
			next(err);
		});
		}
		
		if(req.query.results == "mmdrt")
		{
		var q = keystone.list('Mmdr').model.find({groupid:req.params.groupid});
		
		q.exec(function(err, results) {
			locals.data.mrgroup = results;
			locals.data.groupid = req.params.groupid;
			locals.data.res = req.query.results;
			next(err);
		});
		}

	});
	
	// Render the view
	view.render('checkmmdrgui');
	
	//res.send(req.body);
};


