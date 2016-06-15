// ==UserScript==
// @name        M&M BOT
// @version      0.1
// @description  This is the assigned bot for Paul (ID: 1)
// @author       Paul Rodriguez
// @match        http://mmdrtoolsadv-buste12345.c9users.io:8080/api/mmdr/bothome
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require      http://code.jquery.com/jquery-1.10.2.js
// @require      http://code.jquery.com/ui/1.11.2/jquery-ui.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

/*
@match determines which domains the script will run within. 
@require calls libraries from different sources. We are currently using jquery libraries.
@grant are unique Greasemonkey functions that currently, allows us to inject CSS codes and bypass cross origin policy.
*/


/*FireCat's graphic interface*/
$("body").append('       \
    <div id="gmRightSideBar">     \
<p id="botinfo"><p> \
  <div id="placement" align="center" >Testo</div>                                  \
</div>\
');

/*GM_addStyle allows us adding external CSS properties and rules to the site's content and our sidebar*/
GM_addStyle("                                                     \
    #gmRightSideBar {                                               \
        position:               fixed;                              \
        top:                    5px;                                  \
height:                auto;                                       \
        right:                  0;                                  \
        background:             #F0F0F0;                             \
        width:                  180px;                              \
        z-index:                6666;                               \
        opacity:                100;               \
     border-style: solid;\
border-color: #FF8C00; \
font: bold Verdana, sans-serif; \
border-width: 2px; \
    }                                                               \
    #gmRightSideBar p {                                             \
        font-size:              80%;   \
background-color: #000080;\
color: white;\
width: 100%;\
height: 1.5em;\
    }                                                               \
    #gmRightSideBar ul {                                            \
        margin:                 0ex;                                \
    }                                                               \
    #gmRightSideBar a {                                             \
        color:                  black;                               \
    }       \
#dog {\
    width: 100%;  height: 2em;\
} \
#dog2 {\
    width: 100%;  height: 2em;\
} \
#dog3 {\
    width: 100%;  height: 2em;\
} \
#opener {\
    width: 100%;  height: 2em;\
} \
#list {\
    padding-right: 0.1cm;\
} \
#result {\
   width: 30px;\
    height: 20px;\
    background-color: white;\
    margin-left: auto;\
    margin-right: auto;\
    border-style: solid;\
    border-color: black;\
} \
#dialog {\
position:               fixed; \
top: 180px;\
   width: auto;\
    height: auto;\
    background-color: #F0F0F0;;\
    border-style: solid;\
border-color: #FF8C00; \
padding: 6px;\
} \
textarea { \
    resize: none; \
}\
");

/*-- Keyboard shortcut to show/hide our sidebar
var kbShortcutFired = false;
var rightSideBar = $('#gmRightSideBar');

$(window).keydown(keyboardShortcutHandler);

function keyboardShortcutHandler(zEvent) {
    -- On F9, Toggle our panel's visibility
    if (zEvent.which == 120) { // F9
        kbShortcutFired = true;

        if (rightSideBar.is(":visible")) {
            rightSideBar.stop(true, false).hide();
        } else {
      
            rightSideBar.stop(true, false).show();
        }

        zEvent.preventDefault();
        zEvent.stopPropagation();
        return false;
    }
}*/
//-----------------------------------//
//IMPORTANT VARIABLE
//-----------------------------------//

var robotname="prodriguez";
var robotno="1";


//-----------------------------------//
//IMPORTANT VARIABLE
//-----------------------------------//


	/*Semaphore variables keep track of positive or negative findings that would break a map request.*/
    var semaphore = "";
	$("#botinfo").append("Bot #"+robotno+". Owner: "+robotname);
/*Load map request*/

/*        var escape = document.createElement('textarea');
        
        function escapeHTML(html) {
            escape.textContent = html;
            return escape.innerHTML;
        }

        function unescapeHTML(html) {
            escape.innerHTML = html;
            return escape.textContent;
        }*/
    
	var signalrec = function(callback) {
	    
		setInterval(function(){
        $.when(getDatacors("http://mmdrtoolsadv-buste12345.c9users.io:8080/api/mmdr/getlast?assign=true&robotname="+robotno)).done(function(mrfirst)
		{
		console.log("Pinging...");

		if(!checks(mrfirst,"error"))
		    {
		        console.log("Ping success");
			    callback((mrfirst.split('"mrdid":"')[1].split('"'))[0],(mrfirst.split('"did":"')[1].split('"'))[0]);
		    }
		});
		},5000);
		
	};
	
	var processmr = function(mrdid,id){
	   
	var mappingdetails = "http://boss.careerbuilder.com/Axiom/AxiomDPI/MapRequest/MapRequestView.aspx?CBMapRequest_DID="+mrdid;
	var mappingjoournal = "http://boss.careerbuilder.com/Axiom/AxiomDPI/MapRequest/MapRequestViewJournal.aspx?CBMapRequestJournal_TargetDID="+mrdid;
	var tcsetup = "http://mapping.careerbuilder.com/ThunderCat/UI/CrawlConfig.aspx?MapRequestDID="+mrdid;
	var clientdefault = "http://mapping.careerbuilder.com/Atlas/ClientDefaults.aspx?ReqStatus=Complete&MapRequestDID="+mrdid;
	var fieldmapping = "http://mapping.careerbuilder.com/Atlas/FieldMappings.aspx?ReqStatus=Complete&MapRequestDID="+mrdid;
	
	$.when(getDatacors(mappingdetails),getDatacors(mappingjoournal),getDatacors(tcsetup),getDatacors(clientdefault),getDatacors(fieldmapping)).done(function(rmappingdetails,rmappingjoournal,rtcsetup,rclientdefault,rfieldmapping){
	    var accountm = "http://boss.careerbuilder.com/Axiom/Account/AccountView.aspx?Acct_DID="+(((rmappingdetails.split("Acct_DID=")[1])).split('"')[0]);
        var batch1 = "http://dpi.careerbuilder.com/site/support/finddpiuser/BatchResultsV2.aspx?EmailType=Poster&FileType=Batch&Email=" + ((((rclientdefault.split("CBPosterEmail</td>")[1]).split("</td>"))[0]).split("<td>"))[1];
        console.log("KLAP");
	   
	   $.when(getDatacors(accountm),getDatacors(batch1)).done(function(raccountm,rbatch1){
	            console.log("Chamgs");
	       	    var accountproduct = "http://boss.careerbuilder.com/Axiom/Account/AccountProductView.aspx?Acct_DID="+(((raccountm.split("AccountProductView.aspx?Acct_DID="))[1]).split('"')[0]);
                console.log("Chamgs2");
                var batch2;
                if(checks(rbatch1,'mxdlBatchLog__ctl1_lnkViewBatch'))
                {
                    console.log("CTrue");
                    batch2= "http://dpi.careerbuilder.com/site/support/finddpiuser/"+decoderr((rbatch1.split('mxdlBatchLog__ctl1_lnkViewBatch" href="')[1]).split('"')[0]);
                }
                else
                {
                    console.log("CFalse");
                    batch2= "http://dpi.careerbuilder.com";
                }
                console.log("clup 2");
                $.when(getDatacors(accountproduct),getDatacors(batch2)).done(function(raccountproduct,rbatch2){
	                 sendPost('http://mmdrtoolsadv-buste12345.c9users.io:8080/api/mmdr/updatemmdr','did='+id+'&mappingdetails='+escape(rmappingdetails)+'&journal='+escape(rmappingjoournal)+'&accountm='+escape(raccountm)+'&accountproduct='+escape(raccountproduct)+'&tcsetup='+escape(rtcsetup)+'&defaultt='+escape(rclientdefault)+'&fieldmapping='+escape(rfieldmapping)+'&batch='+escape(rbatch1)+'&batch2='+escape(rbatch2)+'&state=completed');
	               console.log("MR DID: "+mrdid+" is now completed.");
	            });
	   });


	});
};
    //ACTIVATE BOT FUNCTIONALITY
    signalrec(processmr);

    

/*Function that checks if date format is fine*/
function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}


/*This function searches value2 inside value1.*/  

function checks(value1, value2) {
    if ((value1.toLowerCase()).search(value2.toLowerCase()) == -1) {
        return false;
    } else {
        return true;
    }

}

//Only use this function to crawl ThunderCat to avoid cross origin policy (CORS) 
function getDatacors(customlink) {
    var tot = jQuery.Deferred();
    console.log("Received link is " + customlink);
    GM_xmlhttpRequest({
        method: "GET",
        url: customlink,
	    onload: function(response) {
        tot.resolve(response.responseText);
         }
		});
	return tot.promise();
    //console.log(htmltext.responseText);

}

//Only use this function to crawl Axiom and any other part of the system that would not require bypassing the cross origin policy (CORS)
function getDataxhr(customlink) {
    console.log("ok..");
    var req = new XMLHttpRequest();

    req.open('GET', customlink, false);

    req.send();
    var results = req.responseText;
    //  console.log(results);

    return results;
}

/*Function used to send a post request to a given URL. It is currently only used to fill the mapping details.*/
function sendPost(customlink, instructions) {
    console.log("Post to:"+customlink);
    console.log(instructions);

    GM_xmlhttpRequest({
        method: "POST",
        url: customlink,
        data: instructions,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}
	
function getlocaldate()
{
var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    var today = mm+'/'+dd+'/'+yyyy;
    return today;
}
	
function decoderr(str)
{
var div = document.createElement('div');
div.innerHTML = str;
return(div.firstChild.nodeValue);
}