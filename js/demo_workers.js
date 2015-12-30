self.addEventListener('message', function(e) {
	importScripts("handlebars-v4.0.5.js");
	importScripts("soft-list.json");
	//console.log(e.data, Handlebars);
	
	var template = Handlebars.compile(e.data);
	var softwareListObj1 = {};
	softwareListObj1.softwares2 = []
	for(var i = 0; i < 10000; i++) {
		softwareListObj1.softwares2.push(softwareListObj.softwares[i]);
	}
	
	//console.log(softwareListObj1);
	//var context = {title: "My New Post", body: "This is my first post!"};
	var html    = template(softwareListObj1);
	//console.log(html);
	self.postMessage(html);
	
}, false);