var request = require('request');
var file = require('fs');

var tag = "<script type='application/ld+json'>";

var date = new Date();

function getBoysSoccer(when) {
  request("http://www.maxpreps.com/high-schools/wyomissing-spartans-(wyomissing,pa)/football/schedule.htm", function(error, response, body) {
    var res = body.slice(body.indexOf("<script type='application/ld+json'>") + tag.length);
    var okay = res.slice(0, res.indexOf("</script>"));
    var schedule = JSON.parse(okay);
    for (var i = 0; i<schedule.event.length; i++) {
      if (date.toISOString() > schedule.event[i].StartDate) {
        console.log("true");
        continue;
      }
      else {
        console.log(console.log(schedule.event[i].Description));
        break;
      }
    }
  })
}

getBoysFootball();
