var options = {
    strings: ['Veni!', 'Vidi!', 'Vici!'],
    typeSpeed: 240, //打印的速度。数值越大，速度越慢
    loop: true, //开启循环
    loopCount: Infinity, //设置循环次数，值为：Infinity，也可以使用数值
    backSpeed: 50, //延迟时间后才后退，值越大，延迟的时间就越长
    cursorChar: '' //光标的符号，比如：
};
var typed = new Typed('.site-subtitle', options);

var title = {
	strings: ["网站崩溃!", '༼ つ ◕_◕ ༽つ'],
	typeSpeed: 240,
    loop: true,
    loopCount: Infinity,
    backSpeed: 50,
    cursorChar: '$'
};

var title_typed = new Typed("title", title);