var coverObjs = new Array();
var k = 1;
var bubbleObjs = new Array();
function init () {
  var root = "/images/static/covers/",
    covers = $(".index-post-cover .cover"),
    post = true;

  var data = null;
  $.ajax({
    url: '/images/static/coverslist.json',
    async: false,
    success: function (arr) {
      data = arr;
    }
  });

  render(data);
  function render (data) {
    var b, j, coverName, coverSize, coverX, coverY, rate, padding;
    for (var i = 0; i < covers.length; i++) {
      coverObjs.push(new cover());
      b = data.length - 1;
      j = Math.floor(Math.random() * (b + 1));
      coverName = data[j].split(' ')[1];
      coverSize = data[j].split(" ")[0];
      coverObjs[i].coverName = coverName;
      coverObjs[i].coverX = coverSize.split(".")[0];
      coverObjs[i].coverY = coverSize.split(".")[1];
      coverObjs[i].cover = $(covers[i]);
      data[j] = data[b];
      data = data.slice(0, b);
      if (is_post){
        coverObjs[i].cover.css("background-image", "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(" + root + coverName + ")");
      } else {
        coverObjs[i].cover.css("background-image", "url(" + root + coverName + ")");
      }
    }
  }
  function cover () {
    this.coverName = '';
    this.coverX = "";
    this.coverY = "";
    this.cover = "";
  }
}

var m,g,y,b,w,C, _ = !0,
  k = 1;
function bubbles(){
  y = $(".index-post-cover").get(0), b = document.getElementById("bubbles"), m = y.offsetWidth, g = y.offsetHeight, b.width = m, b.height = g, w = b.getContext("2d"), C = [];
  for (var t = 0; t < .2 * m; t++) {
    var a = new O;
    C.push(a);
  }
  if (k == 1){h();k=0}
}

function main () {
  init();
  if (!is_post) {$(".post-block.index").prepend("<div class='cc'></div>");}
  if (is_post) {
    post_cover(coverObjs[0].cover, coverObjs[0].coverX, coverObjs[0].coverY);
    setTimeout("bubbles()","300");
    window.addEventListener("resize", function(){
      post_cover(coverObjs[0].cover, coverObjs[0].coverX, coverObjs[0].coverY);
      S();
    }, false);
  } else {
    function run(){
      for (var i = 0; i < coverObjs.length; i++) {
        index_cover(coverObjs[i].cover, coverObjs[i].coverX, coverObjs[i].coverY, i);
      }
    }
    window.addEventListener("resize", function() {
      run();
    }, false);
    run();
  }
}
function S() {
  y = $(".index-post-cover").get(0), m = y.offsetWidth, g = y.offsetHeight, b.width = m, b.height = g;
}
function h() {
  for (var t in w.clearRect(0, 0, m, g), C) C[t].draw();
  requestAnimationFrame(h)
}
function O() {
  function t() {
    a.pos.x = Math.random() * m, a.pos.y = g + 110 * Math.random(), a.alpha = .1 + .3 * Math.random(), a.scale = .1 + .5 * Math.random(), a.velocity = Math.random()
  }
  var a = this;
  !function() {
    a.pos = {}, t()
  }(), this.draw = function() {
    a.alpha <= 0 && t(), a.pos.y -= a.velocity, a.alpha -= 5e-4, w.beginPath(), w.arc(a.pos.x, a.pos.y, 10 * a.scale, 0, 2 * Math.PI, !1), w.fillStyle = "rgba(255,255,255," + a.alpha + ")", w.fill()
  }
}

function post_cover (cover, coverX, coverY) {
  coverHeight = parseFloat(cover.css("height"));
  coverWidth = parseFloat(cover.css("width"));
  coverObjs[0].coverHeight = coverHeight;
  coverObjs[0].coverWidth = coverWidth;
  var windowWidth = $(window).width();
  var padding = (coverWidth / coverX) * coverY - coverHeight;
  cover.css("padding-top", padding + "px");
} 
function index_cover (cover, coverX, coverY, a) {
  coverHeight = parseFloat(cover.css("height"));
  coverWidth = parseFloat(cover.css("width"));
  coverObjs[a].coverHeight = coverHeight;
  coverObjs[a].coverWidth = coverWidth;
  var windowWidth = $(window).width();
  var padding = (coverWidth / coverX) * coverY - coverHeight;
  if (windowWidth > 1199.9){
    padding += coverHeight;
    $($("article.post")[a]).css("height", padding + 'px');
    cover.css("padding-top", "0px");
    if (padding > 650) {
      $($(".post-block.index .cc")[a]).css("height", padding * 0.35 + "px");
    } else {
      $($(".post-block.index .cc")[a]).css("height", padding * 0.2 + "px");
    }
  } else {
    cover.css("padding-top", padding + "px");
    $($('article.post')[a]).css("height", '');
    $($(".post-block.index .cc")[a]).css("height", '');
  }
}
// function init(){var root="/images/static/covers/",covers=$(".index-post-cover .cover"),post=true;var data=null;$.ajax({url:'/images/static/coverslist.json',async:false,success:function(arr){data=arr}});var coverObjs=render(data);function render(data){var b,j,coverName,coverSize,coverX,coverY,rate,padding;var coverObjs=new Array();for(var i=0;i<covers.length;i++){coverObjs.push(new cover());b=data.length-1;j=Math.floor(Math.random()*(b+1));coverName=data[j].split(' ')[1];coverSize=data[j].split(" ")[0];coverObjs[i].coverName=coverName;coverObjs[i].coverX=coverSize.split(".")[0];coverObjs[i].coverY=coverSize.split(".")[1];coverObjs[i].cover=$(covers[i]);data[j]=data[b];data=data.slice(0,b);coverObjs[i].cover.css("background-image","linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url("+root+coverName+")")}return coverObjs}function cover(){this.coverName='';this.coverSize="";this.coverX="";this.coverY="";this.cover="";this.coverHeight="";this.coverWidth=""}return coverObjs}function main(is_post){var coverObjs=init();var post=true;if(is_post==="false"){post=false}if(!post){$(".post-block.index").prepend("<div class='cc'></div>")}console.log(coverObjs);for(var i=0;i<coverObjs.length;i++){coverObjs[i].coverHeight=parseFloat(coverObjs[i].cover.css("height"));coverObjs[i].coverWidth=parseFloat(coverObjs[i].cover.css("width"));console.log(coverObjs);var coverObj=coverObjs[i];console.log(coverObjs);if(post){post_cover(coverObj.coverX,coverObj.coverY,coverObj.cover,i,coverObj.coverWidth,coverObj.coverHeight);window.addEventListener("resize",post_cover(coverObj.coverX,coverObj.coverY,coverObj.cover,i,coverObj.coverWidth,coverObj.coverHeight))}else{index_cover(coverObj.coverX,coverObj.coverY,coverObj.cover,i,coverObj.coverWidth,coverObj.coverHeight);window.addEventListener("resize",index_cover(coverObj.coverX,coverObj.coverY,coverObj.cover,i,coverObj.coverWidth,coverObj.coverHeight))}}}function post_cover(coverX,coverY,cover,a,coverWidth,coverHeight){var windowWidth=$(window).width();var padding=(coverWidth/coverX)*coverY-coverHeight;cover.css("padding-top",padding+"px")}function index_cover(coverX,coverY,cover,a,coverCurWidth,coverCurHeight){var windowWidth=$(window).width();var padding=(coverWidth/coverX)*coverY-coverHeight;if(windowWidth>1199.9){padding+=coverHeight;$($("article.post")[a]).css("height",padding+'px');cover.css("padding-top","0px");if(padding>650){$($(".post-block.index .cc")[a]).css("height",padding*0.35+"px")}else{$($(".post-block.index .cc")[a]).css("height",padding*0.2+"px")}}else{cover.css("padding-top",padding+"px");$($('article.post')[a]).css("height",'');$($(".post-block.index .cc")[a]).css("height",'')}}

/*var m, g, y, w, C, _, __, vv, wW, tt = !0,
  k = 1,
  lld = "/images/static/covers/",
  ___ADSD = [];


function MMMM(){
  vv = $(".index-post-cover .cover");
  for (var i = 0; i < vv.length; i++) {
    ___ADSD.push(
      {___N: "",
      ___X: "",
      ___Y: "",
      ___C_X: '',
      ___C_Y: '',
      ___: $(vv.get(i)),
      P: 0,
      B: 0
      }
    );
    z();
    ___ADSD[i].___N = tt.split(' ')[1];
    ___ADSD[i].___X = tt.split(" ")[0].split(".")[0];
    ___ADSD[i].___Y = tt.split(" ")[0].split(".")[1];
    ___ADSD[i].___.css("background-image", "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(" + lld + ___ADSD[i].___N + ")");
    if (!_is_){$($(".post-block.index")[i]).prepend("<div class='cc'></div>");}
    ad(i);
    window.addEventListener("resize", ad(i));
  }
  alert("cuuc")
}

function ad(ii){
  alert(ii);
  //alert(___ADSD[ii].___.attr("class"));
  ___ADSD[ii].___C_X = parseFloat(___ADSD[ii].___.css("width"));
  ___ADSD[ii].___C_Y = parseFloat(___ADSD[ii].___.css("height"));
  wW = $(window).width();
  ___ADSD[ii].P = ___ADSD[ii].___C_X * ___ADSD[ii].___Y / ___ADSD[ii].___X  - ___ADSD[ii].___C_Y;
  if (_is_){
    ___ADSD[ii].___.css("padding-top", ___ADSD[ii].P + "px");
    ___ADSD[ii].B = document.getElementById("bubbles"), m = ___ADSD[ii].___.offsetWidth, g = ___ADSD[ii].___.offsetHeight, w = ___ADSD[ii].B.getContext("2d"), C = [];
    for (var t = 0; t < ___ADSD[ii].___C_X.length; t++) {
      var a = new O;
      C.push(a);
    }
    1 == k && (h(), k = 0);
  } else {
    if (wW > 1199.9){
      ___ADSD[ii].P += ___ADSD[ii].___C_Y;
      $($("article.post")[ii]).css("height",___ADSD[ii]. P + 'px');
      ___ADSD[ii].___.css("padding-top", "0px");
      if (___ADSD[ii].P > 650) {
        $($(".post-block.index .cc")[ii]).css("height", ___ADSD[ii].P * 0.35 + "px");
      } else {
        $($(".post-block.index .cc")[ii]).css("height", ___ADSD[ii].P * 0.2 + "px");
      }
    } else {
      ___ADSD[ii].___.css("padding-top", ___ADSD[ii].P + "px");
      $($('article.post')[ii]).css("height", '');
      $($(".post-block.index .cc")[ii]).css("height", '');
    }
  }
}
function h() {
  if (_) for (var t in w.clearRect(0, 0, m, g), C) C[t].draw();
  requestAnimationFrame(h)
}
function O() {
  function t() {
    a.pos.x = Math.random() * m, a.pos.y = g + 110 * Math.random(), a.alpha = .1 + .3 * Math.random(), a.scale = .1 + .5 * Math.random(), a.velocity = Math.random()
  }
  var a = this;
  !
  function() {
    a.pos = {}, t()
  }(), this.draw = function() {
    a.alpha <= 0 && t(), a.pos.y -= a.velocity, a.alpha -= 5e-4, w.beginPath(), w.arc(a.pos.x, a.pos.y, 10 * a.scale, 0, 2 * Math.PI, !1), w.fillStyle = "rgba(255,255,255," + a.alpha + ")", w.fill()
  }
}*/