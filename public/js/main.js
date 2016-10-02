$(document).ready(function(){
	$('.nav-toggle').click(function(){
 		$('aside#menu').toggleClass('hidden-xs').fadeIn('slow');
 		$('section#content').toggleClass('sidebar-open').fadeIn('slow');
 	});

 	$(window).resize(function(){
 		if($(window).width() > 768){
 			if(  $('#content').hasClass('sidebar-open') ){
 				$('#content').removeClass('sidebar-open');
 			}
 		}else{
 			$('aside#menu').addClass('hidden-xs');
 		}
 	})


});