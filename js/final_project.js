$(document).ready(function() {
//   $.getJSON("http://backend.deviantart.com/oembed?url=http%3A%2F%2Ffav.me%2Fd2enxz7", function(data){
//     console.log(data);        
//   });
    
  var images = [
    "d6eruh3", "d77i7dk",
    "d62mn5b", "d7or76b",
    "d7g2ca7", "d7wd0qx",
  ];
  
 var setBackgroundPicture = function(imageID){
     var oembed_url = "http://backend.deviantart.com/oembed?url=http%3A%2F%2Ffav.me%2F"+ (imageID) +"&format=jsonp&callback=?";
  $.getJSON(oembed_url, function(data) {
    console.log(data.url);
    
    $("body").css("background-image", "url('" + data.url + "')");
  });
 };
  
  setInterval(function(){
    setBackgroundPicture(images[Math.floor(Math.random()*(images.length-1))]);
    
  },2000);
 
 
 
 
 
 
 
 
 
//   var oembed_url = 'http://backend.deviantart.com/oembed?url=http%3A%2F%2Ffav.me%2Fd3lllcp&format=jsonp&callback=?';
//   $.getJSON(oembed_url, function(data) {
//     console.log(data.url);
//   });
  
//   setInterval(function(){
// //     alert("hello");
    
//   },1000);
  
});