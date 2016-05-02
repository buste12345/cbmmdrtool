var async = require('async'),
keystone = require('keystone');
var Mmdr = keystone.list('Mmdr');
var uuid = require('node-uuid');
const a = require('../functions/crawl');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'mmdrgui';
	locals.filters = {
		mmdr: req.params.mmdr
	};
	locals.data = {
		mmdrs: []
	};
	
	// Function to store the provided MR dids
	var storemr = function (val, callback){
		var mrdids = (val).split("\r\n");
		//console.log(mrdids[0]);
		callback(mrdids);
	};

	if(req.body.mrdids)
	{
		storemr(req.body.mrdids,function(val){
			var uuid4 = uuid.v4();
			locals.data.groupid = uuid4;
		
			for(var i = 0; val.length > i; i++){
				
			     var newMr = new Mmdr.model({
				 mrdid: val[i],
				 state: 'pending',
				 groupid: uuid4
				});
				
				
				newMr.save(function(err) {
					 // post has been save
					 console.log(err);
				});

				//Here goes Kue message broker function
				a.newJob(val[i],newMr.id);

			}
		});
	}

/*	
	view.on('init', function(next) {
		locals.data.posts = "kek";
	
	});
*/
	// Render the view
	view.render('mmdrgui');
	
	//res.send(req.body);
};


