var alarm_snd = null;
var alarm_on = false;
var now_timing = false;


var timer = new CountdownObject();
var last_timing_secs = 0;

/*
timer.finishEvent = function() {
	$('but_start').innerHTML = 'Start';
	fadeIn('top_scrollers');
	fadeIn('bottom_scrollers');
	now_timing = false;
	
	var w = 400;
	var h = 200;
	
	var left = (screen.availWidth - w) / 2;
	var top = (screen.availHeight - h) / 2;
	
	var myWindow = window.open('popup.html','myWindow', 'left='+left+',top='+top+',width=400,height=200,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=yes');
}
*/

timer.finishEvent = function() {
	now_timing = false;
	turnOnAlarm();
}

timer.updateDisplayEvent = function(milliseconds_remaining) {
	var hours = padDigits(Math.floor(milliseconds_remaining / 1000 / 60 / 60), 2);
	var minutes = padDigits(Math.floor((milliseconds_remaining / 1000 / 60) % 60), 2);
	var seconds = padDigits(Math.floor((milliseconds_remaining / 1000) % 60), 2);
	var hundredths = padDigits(Math.floor(milliseconds_remaining % 1000 / 10), 2);
	//var milliseconds = '';
	//if ((milliseconds_remaining % 1000) == 0) seconds = '' + seconds + '.0';
	$('hours').innerHTML = hours;
	$('minutes').innerHTML = minutes;
	$('seconds').innerHTML = seconds;
	$('hundredths').innerHTML = hundredths;
	//$('div_counter').innerHTML = hours + ' : ' + minutes + ' : ' + seconds + ' : ' + milliseconds;
	//$('div_counter').style.visibility = 'visible';
}

function turnOnAlarm()
{
	alarm_on = true;
	alarm_snd.play();
	
	fadeOut('start_stop', true);
	fadeIn('alarm_stopper', true);
}

function turnOffAlarm()
{
	alarm_on = false;
	alarm_snd.stop();
    
    
	fadeIn('top_scrollers', true);
	fadeIn('bottom_scrollers', true);
	fadeIn('headline', true);

	fadeOut('alarm_stopper', true);
    
    
    cutOut('but_stop', 'inline');
    cutIn('but_start', 'inline');
    fadeIn('start_stop', true);
}

function doTimer()
{
	if (!timer.running) {
		var hours = parseInt($('hours').innerHTML, 10);
		var minutes = parseInt($('minutes').innerHTML, 10);
		var seconds = parseInt($('seconds').innerHTML, 10);
		var hundreths = parseInt($('hundredths').innerHTML, 10);

		var total_seconds = (hours * 3600) + (minutes * 60) + seconds + (hundreths * 0.01);
		
		if (total_seconds == 0) {
			alert('You need to set the timer first!');
			return;
		}
		
		fadeOut('top_scrollers', true);
		fadeOut('bottom_scrollers', true);
		fadeOut('headline', true);
		
		last_timing_secs = total_seconds;
		
		timer.start(total_seconds);
        fadeOut('but_reset', true, 'inline');
        fader = fadeOut('but_start', false, 'inline');
	fader.finishedEvent =  function() { fadeIn('but_stop', true, 'inline'); };
        fader.start();
        //$('but_start').innerHTML = 'Stop';
	
    } else {
		fadeIn('top_scrollers',true);
		fadeIn('bottom_scrollers', true);
		fadeIn('headline', true);
		timer.pause();
        		
        
        fader = fadeOut('but_stop', false, 'inline');
        fader.finishedEvent =  function() { fadeIn('but_start', true, 'inline'); fadeIn('but_reset', true, 'inline'); };
        fader.start();
		//$('but_start').innerHTML = 'Start';
		//$('but_pause').innerHTML = 'Pause';
	}
}

function padDigits(n, num_digits)
{
	n = n.toString();
	while (n.length < num_digits)
		n = '0' + n;
	return n;
}

var e_event = null;
function registerEvent(mouseup_function)
{
	e_event = mouseup_function;
}

function unregisterEvent()
{
	if (e_event != null)
		e_event();
	e_event = null;
}

function scroll(direction, id_name, upper_limit)
{
	var val = parseInt($(id_name).innerHTML, 10);
	val += direction;
	if (val < 0)
		val = upper_limit;
	else if (val > upper_limit)
		val = 0;
	$(id_name).innerHTML = padDigits(val, 2);
}

function startScrolling(direction, id_name, upper_limit)
{
	scroll(direction, id_name, upper_limit);
	var t = setInterval("scroll("+direction+", '"+id_name+"', "+upper_limit+")", 100);
	var mouseup = function() {
		clearInterval(t);
	}
	registerEvent(mouseup);
}

function reset_but()
{
    timer.updateDisplayEvent(last_timing_secs * 1000);
    fadeOut('but_reset', true, 'inline');
}