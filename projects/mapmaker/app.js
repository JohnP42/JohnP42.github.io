$(document).ready(function(){

	$("#create-map").on("submit", function(event) {
		event.preventDefault();
		newMap($("#width").val(), $("#height").val());
	});

	$("#select-tile").on("change", function(event) {
		$("#show-tile").attr("class", $(this).val());
	});

	$("#map").on("click", "td", function(event) {
		$(this).attr("class", $("#select-tile").val());
	});

	$("#generate").on("click", function(event) {
		$("#code").text(mapToCode());
	});

});

var newMap = function(width, height){
	$("#map").empty();
	for(var x = 0; x < width; x++) {
		var row = $("<tr></tr>");
		for(var y = 0; y < height; y++) {
			row.append("<td width='32px' height='32px' class='tile0'></td>");
		}
		$("#map").append(row);
	}
}

var mapToCode = function(){
	var code = "[\n"

	$("#map tr").each(function() {
		code += "["
		$(this).children("td").each(function() {
			if($(this).attr("class") === "tile0")
				code += "new Plain(), "
			if($(this).attr("class") === "tile1")
				code += "new Forest(), "
			if($(this).attr("class") === "tile2")
				code += "new Mountain(), "
			if($(this).attr("class") === "tile3")
				code += "new Water(), "
			if($(this).attr("class") === "tile4")
				code += "new HQ(), "
			if($(this).attr("class") === "tile5")
				code += "new City(), "
			if($(this).attr("class") === "tile6")
				code += "new Factory(), "
		});
		code = code.substring(0, code.length - 1);
		code += "],\n"
	});

	code += "];"
	return code;
}