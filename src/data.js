var request = require('request');

const SOCCER = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473291097435_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=7"
const FOOTBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473291097435_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=1&levelid=20&sportid=7"
const SWIMMING =  "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473346320450_&sc_id=PA196104084&schedDate=12%2F18%2F2015&current_schedule_view=season&userid=0&genderid=3&levelid=20&sportid=14"
const LACROSSE = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473346946936_&sc_id=PA196104084&schedDate=02%2F22%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=15"
const FIELD_HOCKEY = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347016292_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=2&levelid=20&sportid=10"
const CROSS_COUNTRY = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347107690_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=3" 
const BASKETBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347161969_&sc_id=PA196104084&schedDate=12%2F04%2F2015&current_schedule_view=season&userid=0&levelid=20&sportid=2"
const VOLLEYBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347245140_&sc_id=PA196104084&schedDate=02%2F22%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=18"
const TENNIS = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347327782_&sc_id=PA196104084&schedDate=02%2F22%2F2016&current_schedule_view=season&userid=0&levelid=1&sportid=9"
const WRESTLING = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347409557_&sc_id=PA196104084&schedDate=12%2F18%2F2015&current_schedule_view=season&userid=0&genderid=1&levelid=20&sportid=11"
const BOWLING;
const BASEBALL;
const SOFTBALL;
const WINTER_TRACK;
const TRACK;
const GIRLS_SOCCER = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473348463129_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=2&levelid=1&sportid=7"

function homeaway(val) {
    if (val == "h") {
        return "home";
    } 
  	else {
        return "away";
    }
}

function getSportSchedule(sportURL, genderid) {
    var gamesLeft = 0;
    if(genderid == 2 && sportURL == SOCCER)
      sportURL = GIRLS_SOCCER
    request((sportURL + "&genderid=" + genderid), function(error, response, body) {
        var schedule = JSON.parse(body);
        var currDate = new Date();
        for (var i = 0; i < schedule.EVENTLIST.length; i++) {
            var date = new Date(schedule.EVENTLIST[i].EVENTDATE);
            if (schedule.EVENTLIST[i].OPPONENT_NAME === "" || currDate.toISOString() > date.toISOString()) {
                continue;
            } 
          	else if (schedule.EVENTLIST[i].OPPONENT_NAME !== "" || currDate.toISOString() > date.toISOString()) {
                console.log("Wyomissing will play " + schedule.EVENTLIST[i].OPPONENT_NAME + " " + homeaway(schedule.EVENTLIST[i].HOMEAWAY) + " " + "at " + schedule.EVENTLIST[i].STARTTIME + " on " + schedule.EVENTLIST[i].EVENTDATE);
                gamesLeft++;
                break;
            }
        }
        if (gamesLeft < 1) {
            console.log("No new games/meets yet!")
        }
    })
}

getSportSchedule(SOCCER, 2);
