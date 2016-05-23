function projects() {

  $("#projects a").on("click", function(event) {
    event.preventDefault();

    $(".project").hide();
    var id = $(this).attr("href");
    $("#" + id).show("slide", {direction: "up"});
    $("html, body").animate({scrollTop: $(document).height()}, "slow");
  });
}