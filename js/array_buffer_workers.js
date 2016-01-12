self.addEventListener('message', function(e) {
	
	// Example 1
	var abToString = ab2str(e.data);
	
	//console.log("Inside Worker :", e.data, abToString);
	
	//self.postMessage(abToString);
	
	// Example 2
	var parsing = JSON.parse(abToString);
	
	//console.log("Parsing abToString :", parsing);
	
	fetch(parsing.url, function(xhr) {	
		var result = xhr.responseText;
		//process the JSON
		var resultObj = JSON.stringify(result); // Stringify HTTP result 
		
		var pp = str2ab(resultObj); // String to Array Buffer
		
		//console.log(resultObj, pp);
		//set a timeout just to add some latency
		//setTimeout(function() { sendback(); }, 2000);
		//pass JSON object back as string
		self.postMessage(pp.buffer, [pp.buffer]);
	});
	
	
}, false);

// Array Buffer To String
// Ref : https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

//simple XHR request in pure raw JavaScript
function fetch(url, callback) {
	var xhr;
	
	//console.log(url);
	
	if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0", 
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0", 
			"MSXML2.XmlHttp.2.0",
		"Microsoft.XmlHttp"]
		
		for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch(e){}
		} // end for
	}
	
	xhr.onreadystatechange = ensureReadiness;
	
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
		
		if(xhr.status !== 200) {
			return;
		}
		
		// all is well	
		if(xhr.readyState === 4) {
			callback(xhr);
		}			
	}
	
	xhr.open('GET', url, true);
	xhr.send('');
}

function str2ab(str) {
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
		//console.log(bufView[i], str.charCodeAt(i));
		bufView[i] = str.charCodeAt(i);
	}
	
	//console.log("Buffer :", buf, bufView);
	return bufView;
}