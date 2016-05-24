function projects() {

  $("#projects a").on("click", function(event) {
    event.preventDefault();

    $(".project").hide();
    var id = $(this).attr("href");
    $("#" + id).show("slide", {direction: "up"});
    var distance = $("#all-posts").offset().top;
    $("html, body").animate({scrollTop: distance}, "slow");
  });
}