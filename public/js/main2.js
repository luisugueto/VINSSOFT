(function($) {
	$(document).ready(function() {
		// Initiate Slidebars
		$.slidebars();
		 scrollLock: false // true or false
		
		// Slidebars Submenus
		$('.sb-toggle-submenu').off('click').on('click', function() {
			$submenu = $(this).parent().children('.sb-submenu');
			$(this).add($submenu).toggleClass('sb-submenu-active'); // Toggle active class.
			if ($submenu.hasClass('sb-submenu-active')) {
				$submenu.slideDown(200);
			} else {
				$submenu.slideUp(200);
			}
		});
	});
}) (jQuery);


(function($) {
	jQuery("document").ready(function($){
		var nav = $('.nav-container');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 126) {
				nav.addClass("f-nav");
			} else {
				nav.removeClass("f-nav");
			}
		});
	});
})();