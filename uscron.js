#!/opt/local/bin/node --abort_on_uncaught_exception
var 
	schedule 	= require('node-schedule'),
	spawn 		= require('child_process').spawn,
	fs 			= require('fs');


var register=function(job){
	schedule.scheduleJob(job.sche,function(){
		console.log((new Date()).toISOString()+" run "+job.desc);
		spawn(job.cmd);
	})
}

if (fs.existsSync('./cronconf.json')==false){
	console.log("Tanım dosyası yok \n [cronconf.json] isimli bir dosya üretin\n\nÖrnek içerik :");
	console.log("{\n\t\"jobs\":[\n\t\t{\n\t\t\t\"desc\" : \"her 10 saniye\",\n\t\t\t\"sche\" : \"*/6 * * * * *\",\n\t\t\t\"cmd\" : \"date\"\n\t\t}\n\t\]\n}");
} else {
	var cronconf=JSON.parse(fs.readFileSync('./cronconf.json','utf8'));
	cronconf.jobs.forEach(function(job){
		register(job);
	})	
}



