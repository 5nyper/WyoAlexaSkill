var request = require('request');
var file = require('fs');

var tag = "<script type='application/ld+json'>";

var date = new Date();

function getSportSchedule(sport, when) {
  request("http://www.maxpreps.com/high-schools/wyomissing-spartans-(wyomissing,pa)/" + sport + "/schedule.htm", function(error, response, body) {
    var res = body.slice(body.indexOf(tag) + tag.length);
    var okay = res.slice(0, res.indexOf("</script>"));
    var schedule = JSON.parse(okay);
    for (var i = 0; i<schedule.event.length; i++) {
      if (date.toISOString() > schedule.event[i].StartDate) {
        continue;
      }
      else {
        console.log(schedule.event[i].Description);
        break;
      }
    }
  })
}

getSportSchedule("soccer");
