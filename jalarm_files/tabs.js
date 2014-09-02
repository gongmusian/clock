var tabs = [];

function tab(tab_id)
{
	for (var i = 0; i < tabs.length; i++)
	{
		if (i == tab_id)
		{
			tabs[i][0].show();
			tabs[i][1].addClassName('tab_active');
		}
		else
		{
			tabs[i][0].hide();
			tabs[i][1].removeClassName('tab_active');
		}
	}
}
