var Alexa = require("alexa-sdk");
var request = require('request');
var deasync = require('deasync');

const SOCCER = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473291097435_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=7"
const FOOTBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473291097435_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=1&levelid=20&sportid=7"
const SWIMMING =  "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473346320450_&sc_id=PA196104084&schedDate=12%2F18%2F2015&current_schedule_view=season&userid=0&genderid=3&levelid=20&sportid=14"
const LACROSSE = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473346946936_&sc_id=PA196104084&schedDate=02%2F22%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=15"
const FIELD_HOCKEY = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347016292_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=2&levelid=20&sportid=10"
const CROSS_COUNTRY = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347107690_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=3"
const BASKETBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347161969_&sc_id=PA196104084&schedDate=12%2F04%2F2015&current_schedule_view=season&userid=0&levelid=20&sportid=2"
const VOLLEYBALL = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347245140_&sc_id=PA196104084&schedDate=02%2F22%2F2016&current_schedule_view=season&userid=0&levelid=20&sportid=18"
const TENNIS = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473441063577_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&levelid=1&sportid=9"
const WRESTLING = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473347409557_&sc_id=PA196104084&schedDate=12%2F18%2F2015&current_schedule_view=season&userid=0&genderid=1&levelid=20&sportid=11"
const BOWLING;
const BASEBALL;
const SOFTBALL;
const WINTER_TRACK;
const TRACK;
const GIRLS_SOCCER = "http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1473348463129_&sc_id=PA196104084&schedDate=08%2F15%2F2016&current_schedule_view=season&userid=0&genderid=2&levelid=1&sportid=7"

var handlers = {
    'LaunchRequest': function () {
        this.emit('SpillSchedule');
    },
    'GetScheduleIntent': function () {
        this.emit('SpillSchedule')
    },
    'SpillSchedule': function () {
        var itemSlot = this.event.request.intent.slots.Item;
        var itemName;
        var genderSlot = this.event.request.intent.slots.Gender;
        var gender;
        if (genderSlot && genderSlot.value) {
            gender = genderSlot.value.toLowerCase();
        }
        else {
          id = 3;
        }
        if (gender == "boys") {
          id = 1;
        }
        else {
          id = 2;
        }
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }
        switch (itemName) {
            case 'soccer':
                this.emit(":tell", getSportSchedule(SOCCER, id));
                break;
            case 'football':
                this.emit(":tell", getSportSchedule(FOOTBALL, id));
                break;
            case 'swimming':
                this.emit(":tell", getSportSchedule(SWIMMING, id));
                break;
            case 'lacrosse':
                this.emit(":tell", getSportSchedule(LACROSSE, id));
                break;
            case 'field hockey':
                this.emit(":tell", getSportSchedule(FIELD_HOCKEY, id));
                break;
            case 'cross country':
                this.emit(":tell", getSportSchedule(CROSS_COUNTRY, id));
                break;
            case 'basketball':
                this.emit(":tell", getSportSchedule(BASKETBALL, id));
                break;
            case 'volleyball':
                this.emit(":tell", getSportSchedule(VOLLEYBALL, id));
                break;
            case 'tennis':
                this.emit(":tell", getSportSchedule(TENNIS, id));
                break;
            case 'wrestling':
                this.emit(":tell", getSportSchedule(WRESTLING, id));
                break;
            case 'bowling':
                this.emit(":tell", getSportSchedule(BOWLING, id));
                break;
            case 'baseball':
                this.emit(":tell", getSportSchedule(BASEBALL, id));
                break;
            case 'softball':
                this.emit(":tell", getSportSchedule(SOFTBALL, id));
                break;
            case 'winter track':
                this.emit(":tell", getSportSchedule(WINTER_TRACK, id));
                break;
            case 'track':
                this.emit(":tell", getSportSchedule(TRACK, id));
                break;
            default:
                this.emit(":ask", "What was that again?");
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function homeaway(val) {
    if (val == "h") {
        return "home";
    }
  	else {
        return "away";
    }
}

var getSportSchedule = function(sportURL, genderid) {
	var result;
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
                result = "Wyomissing will play " + schedule.EVENTLIST[i].OPPONENT_NAME + " " + homeaway(schedule.EVENTLIST[i].HOMEAWAY) + " " + "at " + schedule.EVENTLIST[i].STARTTIME + " on " + schedule.EVENTLIST[i].EVENTDATE;
                gamesLeft++;
                break;
            }
        }
        if (gamesLeft < 1) {
            return "No new games/meets yet!";
        }
    })
      while(result === undefined) {
      	deasync.runLoopOnce();
    }
    return result;
}
