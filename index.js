'use strict';

let getNow = (() => {
	let now = new Date();
	return isNew => {
		if(isNew) now = new Date();
		return now;
	}
})();

let language = {
	cn : {
		now: '刚刚',
		second: '秒前',
		minute: '分钟前',
		hour: '小时前',
		yesterday: '昨天',
		day: '天钱',
		lastWeek: '上周',
		week: '周前',
		month: '个月前',
		year: '年前'
	}
}

module.exports = (timestamp, lang) => {
	let unit = lang && language[lang]? language[lang]: language['cn'];
	
	let now = getNow(true) - 0;
	let timeHour = getNow().getHours(),
		timeDay = getNow().getDate(),
		timeMonth = getNow().getMonth() + 1,
		timeYear = getNow().getFullYear(),
		timeWeek = getNow().getDay();
	
	let trans = new Date(timestamp),
		transYear = trans.getFullYear(),
		transMonth = trans.getMonth() + 1,
		transDay = trans.getDate();
		
	let timeDifference = now - timestamp;
		
	if(timeDifference < 0) return '';
	
	let timeDifferenceSecond = Math.floor(timeDifference/1000);
	if(timeDifferenceSecond == 0) return unit['now'];
	if(timeDifferenceSecond < 60) return timeDifferenceSecond + unit['second'];
	
	let timeDifferenceMinute = Math.floor(timeDifferenceSecond/60);
	if(timeDifferenceMinute < 60) return timeDifferenceMinute + unit['minute'];
	
	let timeDifferenceHour = Math.floor(timeDifferenceMinute/60);
	if(timeDifferenceHour - timeHour <= 0) return timeDifferenceHour + unit['hour'];
	
	timeDifferenceHour -= timeHour;
	
	let timeDifferenceDay = Math.floor(timeDifferenceHour/24);
	
	if(timeDifferenceDay < 1) return unit['yesterday'];
	if(timeDifferenceDay < timeWeek) return timeDifferenceDay + unit['day'];
	
	timeDifferenceDay -= timeWeek;
	
	if(timeDifferenceDay <= 7) return unit['lastWeek'];
	
	let year = timeYear - transYear,
		month = timeMonth - transMonth,
		day = timeDay - transDay;
		
	if(day < 0) month --;
	if(month < 0) year --;
	
	if(year > 0) return year + unit['year'];
	if(month > 0) return month + unit['month'];
	
	if(month == 0) return Math.floor(timeDifferenceDay/7) + unit['week'];
	
	if(month < 0) {
		month = (year + 1) * 12 + month;
		if(month > 0) return month + unit['month'];
	}
}












