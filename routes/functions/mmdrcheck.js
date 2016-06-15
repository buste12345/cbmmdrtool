var kue = require('kue');
var jobs = kue.createQueue();
var async = require('async');
const b = require('../api/mmdrs');

//var keystone = require('keystone');
//var Mmdr = keystone.list('Mmdr');

//Creates new job in Kue
function newReview(val, val2, val3) {

    var job = jobs.create('mmdrcheck', {
        groupid: val,
        mrdid: val2,
        journal: val3
    });
    job.save();

}


jobs.process('mmdrcheck', 5, function(job, done) {

        //Main task to verify mmdr.
        var donedor = function() {
            console.log('Verified MR DID: ', job.data.mrdid);
            done && done();
        };
    
        b.verifymmdr(job.data.groupid, job.data.mrdid, job.data.journal, donedor);


/*Second phase (not needed for mmdr check yet)

    var parsemr = function(callback) {
        callback();
        console.log('Verified MR DID: ', job.data.mrdid);
        done && done();
    };
    */

});

//Export functions
var methods = {};
methods.newReview = function(val, val2, val3) {
    newReview(val, val2, val3);
};

module.exports = methods;
/**/