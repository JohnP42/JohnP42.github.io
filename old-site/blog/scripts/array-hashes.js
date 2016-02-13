var arrays = function() {
	//Add item
	$('#push').click(function(){
		var value = "[" + $('#array li').length + "] " + $('input[name=item]').val();
		var li = $('<li></li>').text(value);
		$('#array ul').append(li);
	});
	//remove item
	$('#pop').click(function() {
		$('#array li:last').remove();
	});
	//get item
	$('#get').click(function() {
		var input = parseInt($('input[name=input]').val()) + 1;
		if(input <= $('#array li').length)
		{
			var output = $('#array li:nth-child('+ input +')').text();
			output = output.substring(output.indexOf(" ") + 1);
			$('#output').text(output);
		}
		else
		{
			$('#output').text("Must enter a number between 0 and array length!");
		}
	});
}

var hashes = function() {
	//Add key and value
	$('#add').click(function() {
		var key = $('input[name=key]').val();
		var value = $('input[name=value]').val();
		var item = key + " => " + value;
		var exist = false
		$('#hash li').each(function() {
			if($(this).text().substring(0, $(this).text().indexOf(' => ')) === key)
			{
				$(this).text(item);
				exist = true;	
			}
		});
		if(exist === false)
		{
			var li = $('<li></li>').text(item);
			$('#hash ul').append(li);
		}
	});
	//remove by key
	$('#remove').click(function() {
		var input = $('input[name=input_key]').val();
		var exist = false
		$('#hash li').each(function() {
			if($(this).text().substring(0, $(this).text().indexOf(' => ')) === input)
			{
				$(this).remove();
				exist = true
			}
		});
		if(exist === false)
		{
			$('#output_value').text("That key doesn't exist!");
		}
	});
	//get from key
	$('#get_key').click(function() {
		var input = $('input[name=input_key]').val();
		var exist = false
		$('#hash li').each(function() {
			if($(this).text().substring(0, $(this).text().indexOf(' => ')) === input)
			{
				$('#output_value').text($(this).text().substring($(this).text().indexOf(' => ') + 4));
				exist = true
			}
		});
		if(exist === false)
		{
			$('#output_value').text("That key doesn't exist!");
		}
	});
}


var main = function() {
	arrays();
	hashes();
}


$(document).ready(main());
