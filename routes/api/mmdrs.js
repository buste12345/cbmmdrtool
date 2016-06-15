var async = require('async'),
    keystone = require('keystone');
var fs = require('fs');
var Mmdr = keystone.list('Mmdr');
var cheerio = require('cheerio');
//var bodyParser = require('body-parser');

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
    Mmdr.model.findOne().where('state', 'pending').sort({
        createdAt: 1
    }).exec(function(err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');
        if (req.query.assign == "true" && req.query.robotname) {
            console.log("Robot working on " + item.mrdid);
            Mmdr.model.findOneAndUpdate({
                _id: item.id
            }, {
                state: 'progress',
                assignedBot: req.query.robotname
            }).exec(function(err, item) {
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
 * Bot home
 */
exports.bothome = function(req, res) {

    res.send("This is your home bot.");

}

/**
 * Update mmdr MMDR
 */
exports.updatemmdr = function(req, res) {

    /*fs.writeFile('jason.txt', req.body.accountm,  function(err) {
					 if (err) {
				    return console.error(err);
					 }
   				console.log("Data written successfully!");
				 console.log("Let's read newly written data");
				 
   				fs.readFile('input.txt', function (err, data) {
    			  if (err) {
				         return console.error(err);
					    }
			      console.log("Asynchronous read: " + data.toString());
				  });
			});*/

    Mmdr.model.findOneAndUpdate({
        _id: req.body.did,
        state: 'progress'
    }, req.body).exec(function(err, item) {

        if (err) {
            console.log(err);

        }

        if (item)
            res.send(item);
        else
            res.send("No item");
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

exports.topley = function(idd, callback, callback2) {
    Mmdr.model.findOne({
        _id: idd
    }).exec(function(err, item) {
        //console.log("frying pan");
        //console.log(item);
        if (item.state == "completed") {
            callback2(callback);
        }
    });
}

exports.parsemr = function(idd, callback, callback2) {
    Mmdr.model.findOne({
        _id: idd
    }).exec(function(err, item) {
        //console.log("frying pan");
        //console.log(item);
        if (item.state == "completed") {
            callback2(callback);
        }
    });
}