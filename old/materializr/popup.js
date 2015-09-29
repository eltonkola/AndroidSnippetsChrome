
function clickHandler(e) {
	var s = document.getElementById('search-me').value;
    chrome.tabs.update({url: "http://eltonkola.com/androidsnippets/?s=" + s});
    window.close();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('click-me').addEventListener('click', clickHandler);
	document.getElementById('search-form').addEventListener('onsubmit', clickHandler);
});



$(document).ready(function() {


  // Materialize.toast('I am a toast!', 4000);

   // $('select:not([multiple])').material_select();

    // $('#suggestions').active();
    //suggestions

    $( "#search-me" ).on("input", function() {
      console.log();


    var query = $("#search-me").val();
     console.log(query);
    var url = 'http://eltonkola.com/androidsnippets/wp-json/posts?filter[s]=' + query ;
      console.log(url);
    var req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function() {

     console.log('onreadystatechange' + req.readyState + '-'+ req.status);

     if (req.readyState == 4 && req.status == 200) {
        var dataz = JSON.parse(req.responseText);

        console.log(dataz);

          //max 5 sygjerime
         var sa = 5;
         if(dataz.length < sa){
            sa = dataz.length ;
         }

       console.log(sa);
          var results = [];


          $('#suggestions li').remove();
          for (var i = 0, entry; i < sa && (entry = dataz[i]); i++) {
           $('#suggestions').append('<li><a onclick="navigate(\''+entry.link+'\');" href="javascript:void(0);" >'+entry.title+'</a></li>')
          }
          $('#suggestions').dropdown();
					/*
					{
              inDuration: 300,
              outDuration: 225,
              constrain_width: false, // Does not change width of dropdown to that of the activator
              hover: true, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: false // Displays dropdown below the button
          });
					*/

					//style="width: 132px; position: absolute; top: 282.09375px; left: 400px; opacity: 1; display: block;"

      }
    }
    req.send(null);
    return req;

    });


});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}


/*
$.get('http://api.example.com/users/active.json', function(data) {
  // What you do with data depends on what the API returns...
  // I'm assuming it returns an array of users.
  // data = ['user1', 'user2', 'user3'];

  update_list(data);
})

*/
