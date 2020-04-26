/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {
  /* code */
  var initCopyCode = function(){
    var copyHtml = '';
    copyHtml += '<div class="code-buttons"><button class="code-btn btn-copy" data-clipboard-snippet="">';
    copyHtml += '  <i class="fa fa-clipboard"></i><span>copy</span>';
    copyHtml += '</button></div>';
    $(".highlight").prepend(copyHtml);
    var clipboard = new ClipboardJS('.btn-copy', {
        target: function(trigger) {
            return trigger.parentNode.nextElementSibling;
        }
    });
  };
  initCopyCode();
}(window, document);