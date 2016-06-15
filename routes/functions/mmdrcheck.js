var kue = require('kue');
var jobs = kue.createQueue();
var async = require('async');
const b = require('../api/mmdrs');

//var keystone = require('keystone');
//var Mmdr = keystone.list('Mmdr');

//Creates new job in Kue
function newJob(val) {

    var job = jobs.create('mmdrcheck', {
        groupdid: val
    });
    job.save();

}


jobs.process('mmdrcheck', 5, function(job, done) {

//Checks if MR DID is crawled each 5 seconds.
    var timer = setInterval(function() {

        console.log("lel  ", job.data.idd);
        //b.topley(job.data.idd, donedor, parsemr);


    }, 5000);

//Once the previous function is completed, the second phase will start.
    var donedor = function() {
        console.log('Job', job.id, ' phase 1 completed. MR DID: ', job.data.mrdid);
        clearInterval(timer);
        
    };
//Parsing phase
    var parsemr = function(callback) {
        callback();
        console.log('Job', job.id, ' phase 2 starting. MR DID: ', job.data.mrdid);
        done && done();
    };

})

//Export functions
var methods = {};
methods.newJob = function(val) {
    newJob(val);
};

module.exports = methods;
/**/