var request = require('request');


var res;

request("http://www.maxpreps.com/high-schools/wyomissing-spartans-(wyomissing,pa)/soccer/schedule.htm", function (error, response, body) {
  res = body.slice(body.indexOf("<script type='application/ld+json'>"));
  var okay = res.slice(0, res.indexOf("</script>"));
  console.log(okay);
});
