function CountdownObject()
{
	this.msec_int = 67;

	var obj = this;
	function decrement() {
		//obj.count = obj.count - obj.msec_int;
		time = new Date();
		var count = obj.milli - (time.getTime() - obj.start_time);
		//alert(obj.count);
		//delete time;
		
		if (count <= 0)
		{
			count = 0;
			obj.started = false;
            obj.running = false;
			obj.finishEvent();
			clearInterval(obj.t);
			obj.t = null;
		}
		obj.updateDisplayEvent(count);
	}
	
	this.start_time = null;
	this.pause_time = null;
	this.milli = 0;
	this.t = null;
	this.started = false;
    this.running = false;
	
	
	this.start = function(seconds) {
		//var multiplier = $('sel_countdown_units').value;
		//$('sel_countdown')
		clearInterval(this.t);
		this.milli = seconds * 1000;
		this.start_time = (new Date()).getTime();
		this.updateDisplayEvent(this.milli); 
		this.t = setInterval(decrement, this.msec_int);
		this.started = true;
        this.running = true;
	}
	
	this.stop = function() {
		if (this.t != null)
		{
			clearInterval(this.t);
			this.t = null;
		}
		this.milli = 0;
		this.updateDisplayEvent(this.milli);
		this.started = false;
        this.running = false;
	}
	
	this.reset = function() {
		this.milli = 0;
		this.updateDisplayEvent(this.milli);
	}
	
	this.pause = function() {
		if (this.started)
		{
			if (this.t != null)
			{
				this.pause_time = (new Date()).getTime();
				clearInterval(this.t);
				this.t = null;
                this.running = false;
				return "Resume";
			}
			else
			{
				unpause_time = (new Date()).getTime();
				this.start_time = this.start_time + (unpause_time - this.pause_time);
				
				this.t = setInterval(decrement, this.msec_int);
                this.running = true;
				return "Pause";
			}
		}
		else
		{
			return "Pause";
		}
	}

	this.updateDisplayEvent = function(milliseconds_remaining) {
		//Callback
	}
	
	this.finishEvent = function() {
		//Callback
	}
}