var currentRequest = null;

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    if (currentRequest != null) {
      currentRequest.onreadystatechange = null;
      currentRequest.abort();
      currentRequest = null;
    }

    updateDefaultSuggestion(text);
    if (text == '' || text == 'halp')
      return;

    currentRequest = search(text, function(dataz) {

      //max 5 sygjerime
     var sa = 5;
     if(dataz.length < sa){
        sa = dataz.length ;
     }

      var results = [];
      for (var i = 0, entry; i < sa && (entry = dataz[i]); i++) {

        //entry.content

        results.push({
          content: entry.link,
          description: entry.title + ' / ' + entry.date
        });
      }

      suggest(results);
    });
  }
);

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: '<url><match>android:</match></url> Search Android Snippets'
  });
}

resetDefaultSuggestion();

function updateDefaultSuggestion(text) {
  chrome.omnibox.setDefaultSuggestion({
    description: '<url><match>android:</match>'+ text +'</url>'
  });
}

chrome.omnibox.onInputStarted.addListener(function() {
  updateDefaultSuggestion('');
});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

//kerkimi i vertete
function search(query, callback) {
  if (query == 'halp')
    return;
  var url = "http://eltonkola.com/androidsnippets/wp-json/posts?filter[s]=" + query +"";
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function() {
   if (req.readyState == 4 && req.status == 200) {
      var myArr = JSON.parse(req.responseText);
      callback(myArr);
    }
  }
  req.send(null);
  return req;
}

//kur shtypi enter ne nje nga sygjerimet
chrome.omnibox.onInputEntered.addListener(function(url) {
  
});


function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  // TODO(aa): We need a way to pass arbitrary data through. Maybe that is just
  // URL?
  if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(text)) {
    navigate(text);
  } else if (text == 'halp') {
    alert('Search and be happy :)')
  } else {
    navigate("http://eltonkola.com/androidsnippets/?s=" + text);
  }
});
