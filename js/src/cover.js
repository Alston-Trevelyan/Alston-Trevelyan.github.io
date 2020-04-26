cover = {
  path: "/images/static/covers/",
  covers: $("article.post .index-post-cover .cover"),
  coversObj: [],
  init: function () {
    $.getJSON("/images/static/coverslist.json", function (data) {
      that.render(data);
    });
  },
  render: function (data) {
    var b, j, coverName, coverSize, coverX, coverY, rate, padding;
    for (var i = 0; i < covers.length; i++) {
      this.coversObj.push(new Obj());
      b = data.length - 1;
      j = Math.floor(Math.random() * (b + 1));
      coverName = data[j].split(' ')[1];
      data[j] = data[b];
      data = data.slice(0, b);
      $(covers[i]).css("background-image", "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(" + path + coverName + ")");
      // $(covers[i]).css("background-image", "url(" + path + coverName + ")");
    }
  }
  resize: function () {
    this.
  },
  Obj: function () {
    this.coverName = '';
    this.coverSize = "";
    this.coverX = "";
    this.coverY = "";
    this.padding = "";
  }
}
$(function(){cover.init()})
function coverResize(is_post){
  var data = null;
  $.ajax({
    url: '/images/static/coverslist.json',
    async: false,
    success: function (arr) {
      data = arr;
    }
  });
  if (is_post === "true"){
    var cover = $("article.post .index-post-cover .cover.post").get(0);
    main(data, cover, true, 0);
    // paopao();
  } else if (is_post === "false"){
    var covers = $("article.post .index-post-cover .cover.index");
    for (var i = 0; i < covers.length; i++) {
      main(data, covers[i], false, i);
    }
  }
}

function main(data, cover, is_post, a){
  console.log(cover.style.backgroundImage)
  var coverName = cover.style.backgroundImage.match('url[(].*?[)]')[0].split("/").pop().replace('")','');
  for (var i = 0; i < data.length; i++) {
    if (data[i].match(coverName)) {
      var coverSize =  data[i].split(" ")[0];
      break;
    }
  }
  var coverX = parseFloat(coverSize.split('.')[0]);
  var coverY = parseFloat(coverSize.split('.')[1]);
  if (!is_post){$($(".post-block.index")[a]).prepend("<div class='cc'></div>");}
  calculate(coverX,coverY,cover,is_post,a);
  window.addEventListener("resize", function() {calculate(coverX, coverY, cover, is_post,a)})
}

function calculate(coverX, coverY, cover, is_post, a){
  var coverHeight = parseFloat($(cover).css("height"));
  var coverWidth = parseFloat($(cover).css("width"));
  var windowWidth = $(window).width();
  var rate = coverWidth / coverX;
  var padding = rate * coverY - coverHeight;
  if (is_post){
    $(cover).css("padding-top", padding + "px");
  } else {
    if (windowWidth > 1199.9){
      padding += coverHeight;
      $($("article.post")[a]).css("height", padding + 'px');
      $(cover).css("padding-top", "0px");
      if (padding > 650) {
        $($(".post-block.index .cc")[a]).css("height", padding * 0.35 + "px");
      } else {
        $($(".post-block.index .cc")[a]).css("height", padding * 0.2 + "px");
      }
    } else {
      $(cover).css("padding-top", padding + "px");
      $($('article.post')[a]).css("height", '');
      $($(".post-block.index .cc")[a]).css("height", '');
    }
  }
}