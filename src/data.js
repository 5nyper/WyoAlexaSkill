var request = require('request');

function homeaway(val) {
    if (val == "h") {
        return "home";
    } 
  	else {
        return "away";
    }
}

function getSportSchedule(sport, when) {
    request("http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473291097435_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=1&levelid=20&sportid=7", function(error, response, body) {
        var schedule = JSON.parse(body);
        var currDate = new Date();
        for (var i = 0; i < schedule.EVENTLIST.length; i++) {
            var date = new Date(schedule.EVENTLIST[i].EVENTDATE);
            if (schedule.EVENTLIST[i].OPPONENT_NAME === "" || currDate.toISOString() > date.toISOString()) {
                continue;
            } 
          	else {
                console.log("Wyomissing will play " + schedule.EVENTLIST[i].OPPONENT_NAME + " " + homeaway(schedule.EVENTLIST[i].HOMEAWAY) + " " + "at " + schedule.EVENTLIST[i].STARTTIME + " on " + schedule.EVENTLIST[i].EVENTDATE);
                break;
            }
        }
    })
}

getSportSchedule("soccer");
