var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-105840655-5']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var lastRequest = false;
setInterval(function(){
	if( Date.now() - lastRequest < 265000 ){
		_gaq.push(['_trackPageview']);
	}
},270000);

chrome.runtime.onInstalled.addListener(function(details){
	var version = chrome.runtime.getManifest().version;

	if( details.reason === 'update' ){
		version = details.previousVersion + '->' + version;
	}

	_gaq.push(['_trackEvent', 'chrome::' + details.reason, version]);
});


chrome.webRequest.onBeforeRequest.addListener(function(details){
	lastRequest = Date.now();
},{urls: [ "<all_urls>" ]},['blocking']);