function slides() {

  $("#next").on("click", function(event) {
    event.preventDefault();
    var oldPage = $(".active");
    if($(".active").next(".page").length != 0)
      var newPage = $(".active").next(".page");
    else
      var newPage = $("#skills");
    $(oldPage).removeClass("active");
    $(newPage).addClass("active");
    $(oldPage).hide();
    $(newPage).show("slide", {direction: "right"}, 500);
  });

  $("#prev").on("click", function(event) {
    event.preventDefault();
    var oldPage = $(".active");
    if($(".active").prev(".page").length != 0)
      var newPage = $(".active").prev(".page");
    else
      var newPage = $("#contact");
    $(oldPage).removeClass("active");
    $(newPage).addClass("active");
    $(oldPage).hide();
    $(newPage).show("slide", {direction: "left"}, 500);
  });

  $(".page-link").on("click", function(event) {
    event.preventDefault();
    var oldPage = $(".active");
    var id = $(this).attr("href");
    var newPage = $("#" + id);
    $(oldPage).removeClass("active");
    $(newPage).addClass("active");
    $(oldPage).hide();
    $(newPage).show("slide", {direction: "up"}, 500);
  });
}

