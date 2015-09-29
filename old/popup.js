
function clickHandler(e) {
	var s = document.getElementById('search-me').value;
    chrome.tabs.update({url: "http://eltonkola.com/androidsnippets/?s=" + s});
    window.close();
}
document.addEventListener('DOMContentLoaded', function() {
    	document.getElementById('click-me').addEventListener('click', clickHandler);
	document.getElementById('search-form').addEventListener('onsubmit', clickHandler);
});


