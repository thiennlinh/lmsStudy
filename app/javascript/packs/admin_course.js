var lessonBox, questionBox, answer;

$(window).on("turbolinks:load", function(){
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
  $(".remove-answer").hide();
  $(".remove-question").hide();
  if ($("#sortable .lesson-box").length == 1) {
    $(".remove-lesson").hide();
  }
  lessonBox = $("#sortable .lesson-box").first().html();
  questionBox = $(".quiz-form").find(".list .quiz-element").first().html();
  answer = $(questionBox).find(".input-choice").last().html();
  add_remove_answer_btn($(".list-answer"));
});

function add_remove_answer_btn(selector) {
  selector.each(function () {
    $(this).find(".edit-answer").last().find(".row").last()
      .append('<div class="btn btn-danger btn-remove-answer" data-toggle="modal" data-taget="#confirm-delete-answer">×</div>');
  })
  $(".btn-remove-answer").show();
}

$(document).on("click", ".btn-add-question", function () {
  let milis = Date.now();
  parent = "<div class='quiz-element list-question'></div>";
  question = $(this).closest(".quiz-form").find(".quiz-element");
  let questionElement = $(questionBox);
  name = $(this).closest(".quiz-form").find(".input-question").first().attr("name");
  changeNameQuestion(questionElement, milis);
  $(this).closest(".quiz-form").find(".list").append(parent);
  $(this).closest(".quiz-form").find(".quiz-element").last().append(questionElement);
  $(this).closest(".quiz-form").find(".quiz-element").last().find(".edit-answer").last().find(".row").last()
    .append('<div class="btn btn-danger btn-remove-answer" data-toggle="modal" data-taget="#confirm-delete-answer">×</div>');
  $(this).closest(".quiz-form").find(".remove-question").show();
});

$(document).on("click", ".btn-add-lesson", function() {
  let newBox = $(lessonBox);
  addLesson(newBox);
});

$(document).on("click", ".remove-answer", function () {
  let removeButton = '<div class="btn btn-danger remove-answer">×</div>';
  removeAnswer($(this), removeButton);
});

$(document).on("click", ".remove-question", function () {
  let parent = $(this).closest(".list");
  $(this).closest(".quiz-element").remove();
  if (parent.find(".quiz-element").length == 1) {
    parent.find(".remove-question").hide();
  }
});

$(document).on("click", ".remove-lesson", function() {
  let parent = $(this).closest("#sortable");
  $(this).closest(".lesson-box").remove();
  if (parent.find(".lesson-box").length == 1) {
    parent.find(".remove-lesson").hide();
  }
});

$(document).on("click", ".btn-add-option, .edit-btn-add-answer", function () {
  let milis = Date.now();
  let ans = $(answer)
  let parent = "<div class='input-choice'></div>";
  question = $(this).closest($(".quiz-element"));
  name = question.find(".input-answer").attr("name");
  changeNameAnswer(ans, milis);
  question.find(".remove-answer").remove();
  question.find(".list-answer").append(parent);
  question.find(".input-choice").last().append(ans);
  question.find(".input-choice .remove-answer").show();
});

$(document).on("click", ".btn-submit-course", function () {
  $("#sortable").find(".lesson-box").each(function (index) {
    $(this).find(".lesson_seq").val(index + 1);
  })
  $(".form-course").submit()
})

$(document).on("click", ".delete-lesson-btn", function () {
  let btnDeleteLesson = $(this);
  $('#confirm-delete').on('shown.bs.modal', function() {
    let deleteModal = $(this);
    $(document).on("click", ".btn-ok", function () {
      btnDeleteLesson.parent().find(".delete-lesson").val("true");
      btnDeleteLesson.closest(".lesson-box").hide();
      deleteModal.modal("hide");
    })
  });
})

$(document).on("click", ".delete-question-btn", function() {
  let btnDeleteQuestion = $(this);
  $('#confirm-delete').on("shown.bs.modal", function() {
    let deleteModal = $(this);
    $(document).on("click", ".btn-ok", function () {
      btnDeleteQuestion.parent().find(".delete-question").val("true");
      btnDeleteQuestion.closest(".list-question").hide();
      deleteModal.modal("hide");
    })
  });
})

$(document).on("click", ".btn-edit-course", function () {
  $("#sortable").find(".lesson-box").filter(function () {
    return $(this).find(".delete-lesson").val() == "false"
  }).each(function (index) {
    $(this).find(".lesson_seq").val(index + 1);
  })
  $(this).submit();
})

function changeNameLesson(lesson, milis) {
  lesson.find("input").each(function () {
    if ($(this).attr("name").includes("course[lessons_attributes]")) {
      $(this).attr("name", $(this).attr("name").replace($(this).attr("name").substring(0,$(this).attr("name").indexOf(']', 26)),
      "course[lessons_attributes][" + milis));
    }
  })
  lesson = lesson.html();
}

function changeNameQuestion(question, milis) {
  question.find("input").each(function () {
    $(this).attr("name", $(this).attr("name").replace($(this).attr("name").substring(0, $(this).attr("name").indexOf("]", 52)),
      name.substring(0, name.indexOf("[", 50)) + "[" + milis));
  });
  question = question.html();
}

function changeNameAnswer(answer, milis) {
  answer.find("input").each(function () {
    $(this).attr("name", $(this).attr("name").replace($(this).attr("name").substring(0, $(this).attr("name").indexOf("]", 85)),
      name.substring(0, name.indexOf("[", 83)) + "[" + milis));
  });
  answer = answer.html();
}

function removeAnswer(selector, removeButton) {
  var parent =  selector.closest($(".list-answer"));
  selector.closest($(".input-choice")).remove();
  parent.find((".input-choice")).last().find(".row").last().append(removeButton);
  if (parent.find(".input-choice").length == 1) {
    parent.find(".remove-answer").hide();
  }
}

function addLesson(newBox) {
  let milis = Date.now()
  var parent = "<div class='lesson-box lesson-field ui-sortable-handle'></div>"
  newBox.find(".lesson_seq").val(milis +1);
  changeNameLesson(newBox, milis, 0, 0);
  $("#sortable").append(parent);
  $("#sortable .lesson-box").last().append(newBox);
  $(".remove-lesson").show();
}
