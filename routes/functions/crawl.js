var kue = require('kue');
var jobs = kue.createQueue();


function newJob (val){

         var job = jobs.create('crawlmrdid',{mrdid:val});
         job.save();
    
}


jobs.process('crawlmrdid', function (job, done){
 console.log('Job', job.id, 'is done. MR DID: ',job.data.mrdid);
 
 done && done();
})

var methods = {};

methods.newJob = function(val){ 
    newJob(val);
};

module.exports = methods;
/**/