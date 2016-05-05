var kue = require('kue');
var jobs = kue.createQueue();
var async = require('async');
const b = require('../api/mmdrs');

//var keystone = require('keystone');
//var Mmdr = keystone.list('Mmdr');

//Creates new job in Kue
function newJob(val, val2) {

    var job = jobs.create('crawlmrdid', {
        mrdid: val,
        idd: val2
    });
    job.save();

}


jobs.process('crawlmrdid', 5, function(job, done) {

//Checks if MR DID is crawled each 5 seconds.
    var timer = setInterval(function() {

        console.log("lel  ", job.data.idd);
        b.topley(job.data.idd, donedor);


    }, 5000);

//Once the previous function is completed, the second phase will start.
    var donedor = function() {
        console.log('Job', job.id, ' phase 1 completed. MR DID: ', job.data.mrdid);
        clearInterval(timer);
        done && done();
    };


})

//Export functions
var methods = {};
methods.newJob = function(val, val2) {
    newJob(val, val2);
};

module.exports = methods;
/**/