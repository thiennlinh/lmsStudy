$(window).on("turbolinks:load", function () {
  $(".course-like").on("click", function () {
    var course_id = $(this).data("id");

    $.ajax ({
      url: "/course/rate/"+course_id,
      method: "POST"
    }).done(function (response) {
      console.log(response);
    })
  })
});
