
(function () {

	


	'use strict';
	var app = angular.module('MyApp', ['ngMaterial']);

	app.controller('DemoCtrl', DemoCtrl);

	function DemoCtrl ($timeout, $q, $log, $http) {
		var self = this;

		self.states = [];
		self.querySearch   = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange   = searchTextChange;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
     function querySearch (query) {

     	if(query!=null && query.length > 2){

     		var url = 'http://eltonkola.com/androidsnippets/wp-json/posts?filter[s]=' + query ;
     		console.log('urlz:' + url);

     		var deferred = $q.defer();


     		$http.get(url).then(function(response) {

     			var dataz =response.data;
     			console.log(dataz);

				 //max 5 sygjerime
				 var sa = 5;
				 if(dataz.length < sa){
				 	sa = dataz.length ;
				 }

				 console.log(sa);
				 var results = [];

				 for (var i = 0, entry; i < sa && (entry = dataz[i]); i++) {
				 	console.log(entry.title);

				 	results.push({
				 		value: entry.title.toLowerCase(),
				 		display: entry.title,
				 		link: entry.link
				 	});

				 }

				 deferred.resolve(results);


				}, function(response) {
					console.log('error');
					return '';
				});

     		return deferred.promise;
     	}
     }

     function searchTextChange(text) {
     	$log.info('Text changed to ' + text);
     }
     function selectedItemChange(item) {
     	$log.info('Item changed to ' + JSON.stringify(item));
     	navigate(item.link);
     }

     function doSubmit(searchText){
     	$log.info('doSubmit' + searchText);
     	clickHandler(searchText);
     }

 }

document.getElementById("input-0").focus();

})();


function clickHandler(e) {
	var s = document.getElementById('input-0').value;
	navigate("http://eltonkola.com/androidsnippets/?s=" + s);
	window.close();
}

function aboutHandler(e) {
	var s = document.getElementById('input-0').value;
	navigate("http://eltonkola.com/androidsnippets/about/");
	window.close();
}

function browseHandler(e) {
	var s = document.getElementById('input-0').value;
	navigate("http://eltonkola.com/androidsnippets/");
}


document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('click-me').addEventListener('click', clickHandler);
	document.getElementById('search-form').addEventListener('onsubmit', clickHandler);
	document.getElementById('about-me').addEventListener('click', aboutHandler);
	document.getElementById('browse-me').addEventListener('click', browseHandler);
});

function navigate(url) {
	/*
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: url});
	});
	*/
	 chrome.tabs.create({ url: url });
	window.close();
}
