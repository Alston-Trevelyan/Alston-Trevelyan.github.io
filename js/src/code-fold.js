!function (e, t, a) {
  var initFoldCode = function () {
    var foldHtml = '';
    foldHtml += '<button onclick="fold_code(this)" fold="false" class="code-btn btn-fold">';
    foldHtml += '  <i class="fa fa-angle-down code-expand"></i><span>hide</span>';
    foldHtml += '</button>';
    var figure = $(".highlight .code-buttons");
    figure.prepend(foldHtml);
    for (var i = 0; i < figure.length; i++){
      var block = $(figure[i]);
      if (block.parent().parent().attr("class") === "auto_fold"){
        hide($(block.children("button.btn-fold")));
      }
    }
  };
  initFoldCode();
}(window, document);

function fold_code(btn) {
  btn = $(btn);
  if (btn.attr("fold") === "false"){
    hide(btn);
  } else if (btn.attr("fold") === "true"){
    display(btn);
  }
}

function hide(btn) {
  var i = btn.children("i");
  var span = btn.children("span");
  btn.attr("fold", true);
  i.attr("class", "fa fa-angle-right code-expand");
  btn.parent().siblings("table").css("display", "none");
  span.html("display");
}
function display(btn) {
  var i = btn.children("i");
  var span = btn.children("span");
  btn.attr("fold", false);
  btn.parent().siblings("table").css("display", 'block');
  i.attr("class", "fa fa-angle-down code-expand");
  span.html("hide");
}
