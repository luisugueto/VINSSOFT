/* 
*	Cycle plugin by Malsup - http://jquery.malsup.com/cycle/
*	Implementation by Kevin Leary - http://www.kevinleary.net
*/
(function($){ 
	$(function(){
		/** Add the next and previous buttons with JavaScript to gracefully degrade */
		var cycle_container = $('#cycle-fullwidth');
		cycle_container.append('<div id="cycle-next"></div><div id="cycle-prev"></div>');
		cycle_start(cycle_container, 0);
		/** Restart the slideshow when someone resizes the browser to ensure that sliding distance matches the correct viewport */
		$(window).resize(function(){
			var current_slide = cycle_container.find('.slide:visible').index();
			if(window.console&&window.console.log) { console.log('current_slide'+current_slide); }
			cycle_container.cycle('destroy');
			new_window_width = $(window).width();
			cycle_container.find('.slide').width(new_window_width);
			cycle_start(cycle_container, current_slide);
		});
	});
	/** Cycle configurations */
	function cycle_start(container, index){
		var window_width = $(window).width();
		container.find('.slide').width(window_width);
		if (container.length > 0){
			container.cycle({
				timeout: 9000,
				speed: 1000,
				pager: '#cycle-pager',
				prev: '#cycle-prev',
				next: '#cycle-next',
				pause:	true,
				slideExpr: '.slide',
				fx: 'scrollHorz',
				easeIn: 'swing',
				easeOut: 'swing',
				startingSlide: index,
				pagerAnchorBuilder: cycle_paginate
			});
		}
	}
	function cycle_paginate(ind, el) {
		return '<a href="#slide-'+ind+'"><span>'+ind+'</span></a>';
	}
})(jQuery);