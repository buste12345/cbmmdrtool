var async = require('async'),
	keystone = require('keystone');

var Mmdr = keystone.list('Mmdr');

/**
 * List Posts
 
exports.list = function(req, res) {
	Post.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.send({
			posts: items
		});
		
	});
}
*/
/**
 * Get mmdr by ID
 */
exports.get = function(req, res) {
	Mmdr.model.findById(req.params.mrdid).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.send({
			post: item
		});
		
	});
}

/**
 * Get last pending MMDR
 */ 
exports.getlast = function(req, res) {
	Mmdr.model.findOne().where('state', 'pending').sort({createdAt: 1}).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		if(req.query.assign == "true" && req.query.robotname)
		{
			console.log("Robot working on "+item.mrdid);
			Mmdr.model.findOneAndUpdate({_id:item.id},{state:'progress',assignedBot:req.query.robotname}).exec(function(err, item) 
			{
				console.log(err);
			});
		}
		
		res.send({
			did: item.id,
			mrdid: item.mrdid,
			state: item.state
		});
	});
}


/**
 * Create a Post
 */
exports.create = function(req, res) {
	
	var item = new Mmdr.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.send({
			post: item
		});
		
	});
}

/**
 * Get Post by ID

exports.update = function(req, res) {
	Post.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.send({
				post: item
			});
			
		});
		
	});
}
 */
/**
 * Delete Post by ID

exports.remove = function(req, res) {
	Post.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.send({
				success: true
			});
		});
		
	});
} */

exports.topley = function(idd,callback){
	Mmdr.model.findOne({_id:idd}).exec(function(err, item) 
	{
		//console.log("frying pan");
		//console.log(item);
		if(item.state=="completed")
		{
		    callback();
		}
    });
}