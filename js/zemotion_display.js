function getDeviations(url, limit, start, cacheAge) {
    var deviations = [];
    var limit      = limit || null;
    var start      = start || 0;
    var cacheAge   = cacheAge || 86400;

    (function queryYQL() {
        // thanks http://stackoverflow.com/a/7369516/1696757
        window['callback'] = callback;
        var s = document.createElement('script');
        s.src = "http://query.yahooapis.com/v1/public/yql?q=" + escape('select * from xml where url="' + url + '"') + "&_maxage=" + cacheAge + "&format=json&callback=callback";
        document.body.appendChild(s);
        
        function callback(feed) {
            var items = feed.query.results.rss.channel.item;

            for(var i = 0, l = items.length; i < l; i++) {
                if(i < start) { continue; }
                if(!!limit && i == start + limit) break;

                var object = {};

                object.title         = items[i].title[0];
                object.link          = items[i].link;
                object.date          = items[i].pubDate;
                object.desc          = items[i].description[0].content;
                object.thumbS        = items[i].thumbnail[0].url;
                object.thumbL        = items[i].thumbnail[1].url;
                object.image         = items[i].content.url;
                object.rating        = items[i].rating;
                object.categoryUrl   = items[i].category.url;
                object.category      = items[i].category.label;
                object.deviantName   = items[i].credit[0].content;
                object.deviantAvatar = items[i].credit[1].content;
                object.deviantUrl    = items[i].copyright.url;
                object.copyright     = items[i].copyright.content;

                deviations.push(object);
            }

            //console.log(deviations);
            // async function is complete, move on
            processDeviations(deviations);
        }
    })();

    return deviations;
};
  

 function processDeviations(deviations) {
   console.log(deviations);
   
   var i;
   for(i=0; i<deviations.length; i++) {
     var imgURL = "<div class='parent'> <p> "+ deviations[i]["title"] + "</p> <img src='" + deviations[i]["image"] + "'> <div class='clear'> </div>" + "</div>";
     console.log(imgURL);
     $("body").append(imgURL);  
   };
 };

//http://backend.deviantart.com/rss.xml?q=gallery:" + deviations[i]["deviantName"] + "/" + 

   /*var allDeviations = document.createElement('div');
    allDeviations.className = 'deviations';

    for (var i = 0, l = deviations.length; i < l; i++) {
        var deviationWrapper = document.createElement('div');
        deviationWrapper.className = 'deviation';

        var deviantInfo = ' \
                    <div class="col col-p"> \
                        <a href="' + deviations[i].link + '"> \
                            <h2>' + deviations[i].title + '</h2> \
                        </a> \
                        <img src="' + deviations[i].image + '" alt="' + deviations[i].title + '" class="deviation_image"/> \
                        <p>Thumbnail src: <a href="' + deviations[i].thumbS + '">150px</a> | <a href="' + deviations[i].thumbL + '">300px</a></p> \
                    </div> \
                    <div class="col col-s"> \
                        <h2>Deviation Info</h2> \
                        <p><small>' + deviations[i].date + '</small></p> \
                        <p><strong>' + deviations[i].desc + '</strong></p> \
                        <p>Rating: ' + deviations[i].rating + '</p> \
                        <p>Category: <a href="' + deviations[i].categoryUrl + '">' + deviations[i].category + '</a></p> \
                        <p>By <a href="' + deviations[i].deviantUrl + '">' + deviations[i].deviantName + '</a></p> \
                        <img src="' + deviations[i].deviantAvatar + '"/> \
                        <p>' + deviations[i].copyright + '</p> \
                    </div>';

        deviationWrapper.innerHTML = deviantInfo;
        allDeviations.appendChild(deviationWrapper);
    }

    document.body.appendChild(allDeviations);*/



$(document).ready(function(){ 
  getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:zemotion', null, 0, 86400);               
});