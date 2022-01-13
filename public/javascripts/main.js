$(function () {
  $("#datepicker").datepicker({ format: "dd/mm/yyyy" });

  $("#open-menu").click(function () {
    if ($(document.body).hasClass("is-header-open")) {
      $(document.body).removeClass("is-header-open");
    } else {
      $(document.body).addClass("is-header-open");
    }
  });
});
