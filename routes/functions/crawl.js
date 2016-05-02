var kue = require('kue');
var jobs = kue.createQueue();
var async = require('async');
const b = require('../api/mmdrs');

//var keystone = require('keystone');
//var Mmdr = keystone.list('Mmdr');

function newJob (val,val2){

         var job = jobs.create('crawlmrdid',{mrdid:val,idd:val2});
         //console.log(job);
         job.save();
    
}


jobs.process('crawlmrdid', 5, function (job, done){

 var timer = setInterval(function()
 {

    console.log("lel  ",job.data.idd);
    b.topley(job.data.idd,donedor);
  
   
 },5000);
 
 var donedor = function(){
    console.log('Job', job.id, 'is done. MR DID: ',job.data.mrdid);
    clearInterval(timer);
    done && done();  
 };
 
 
})

var methods = {};
methods.newJob = function(val,val2){ 
    newJob(val,val2);
};

module.exports = methods;
/**/