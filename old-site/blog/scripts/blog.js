var main = function() {
	$('ul.tabs li').click(function() {
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('article').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
}

$(document).ready(main());