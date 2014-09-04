var Faders = [];

function FaderObject(element_name, inout, opacity_int, refresh_int, display_style)
{
	//Constructed Settings
	this.element_name = element_name;
	this.inout = inout;
    this.display_style = display_style;
	
	//Optional Constructed Settings
	this.opacity_int = 0.1;
	this.refresh_int = 100;
	if (opacity_int != null)
		this.opacity_int = opacity_int;
	if (refresh_int != null)
		this.refresh_int = refresh_int;
	
	//Internal
	this.element = $(element_name);
	this.t = null;
	this.opacity = this.element.getStyle('opacity');
	this.finished = true;
	
	this.offset = -this.opacity_int;
	if (inout == 1)
		this.offset = this.opacity_int;
	
    if (!(this.inout == 0 && (this.element.getStyle('display') == 'none' || this.element.getStyle('visibility') == 'hidden')))
    {   /* only do this if we actually have a chance to see the element */
        if (this.display_style == 'block' || this.display_style == 'inline')
            this.element.setStyle('display: ' + this.display_style);
        else
            this.element.setStyle('visibility: visible');
    }
	
	var obj = this;
	function fade()
	{
		obj.opacity = obj.opacity + obj.offset;
		obj.element.setOpacity(obj.opacity);
		if (inout == 0 && obj.opacity <= 0) {
			clearInterval(obj.t);
            if (obj.display_style == 'block' || obj.display_style == 'inline')
                obj.element.setStyle('display: none');
            else
			    obj.element.setStyle('visibility: hidden');
                
			obj.finished = true;
			obj.finishedEvent();
		}
		else if (inout == 1 && obj.opacity >= 1) {
			clearInterval(obj.t);
            
            if (obj.display_style == 'block' || obj.display_style == 'inline')
                obj.element.setStyle('display: ' + obj.display_style);
			else
                obj.element.setStyle('visibility: visible');
			obj.finished = true;
			obj.finishedEvent();
		}
	}
	this.start = function() {
		if (!this.finished) return;
		this.finished = false;
		this.t = setInterval(fade, this.refresh_int);
	}
	
	this.stop = function() {
		if (this.finished) return;
		clearInterval(this.t);
		this.finished = true;
	}
	
	this.finishedEvent = function() {
		//Callback Event
	}
}

function fade(element_name, inout, auto_start, display_style)
{        
	for (var i = 0; i < Faders.length; i++) {
		if (Faders[i].element_name == element_name)
		{
			if (!Faders[i].finished)
				Faders[i].stop();
		}
		if (Faders[i].finished)
		{
			delete Faders[i];
			Faders.splice(i, 1);
			i--; //Go back one
			continue;
		}
	}
	fader = new FaderObject(element_name, inout, 0.1, 10, display_style);
	if (auto_start === true)
            fader.start();
	Faders.push(fader);
	return fader;
}

function fadeOut(element_name, auto_start, display_style /*OPT*/)
{
	return fade(element_name, 0, auto_start, display_style);
}

function fadeIn(element_name, auto_start, display_style /*OPT*/)
{
	return fade(element_name, 1, auto_start, display_style);
}

function cutIn(element_name, display_style /*OPT*/)
{
    var element = $(element_name);
    
    element.setOpacity(1);
    if (display_style == 'block' || display_style == 'inline')
        element.setStyle('display: ' + display_style);
    else
        element.setStyle('visibility: visible');
}

function cutOut(element_name, display_style /*OPT*/)
{
    var element = $(element_name);
    
    if (display_style == 'block' || display_style == 'inline')
        element.setStyle('display: none');
    else
        element.setStyle('visibility: hidden');
        
    element.setOpacity(0);
}
