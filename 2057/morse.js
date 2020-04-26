// 编码
function encode() {
    $('#encode').val(xmorse.encode($('#decode').val(), getoption()));
    $('#btn-play').show();
};

// 解码
function decode() {
    $('#decode').val(xmorse.decode($('#encode').val(), getoption()) || '解码失败，请确认输入是否正确');
    $('#btn-play').hide();
};

function getoption() {
    return {
        space: $('#divider').val(),
        short: $('#short').val(),
        long: $('#long').val()
    };
}

function randomPlay () {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var ctx = new AudioContext();
    var dot = 1.2 / 15;

    var splits = {
        space: ' ',
        short: ".",
        long: "-"
    };

    var t = ctx.currentTime;

    var oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    var gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);

    var chars = " .-";
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 1; i < 9999; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    pwd.split("").forEach(function(letter) {
        switch (letter) {
        case splits.short:
            gainNode.gain.setValueAtTime(1, t);
            t += dot;
            gainNode.gain.setValueAtTime(0, t);
            t += dot;
            break;
        case splits.long:
            gainNode.gain.setValueAtTime(1, t);
            t += 3 * dot;
            gainNode.gain.setValueAtTime(0, t);
            t += dot;
            break;
        case splits.space:
            t += 7 * dot;
            break;
        }
    });

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
};

function play() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    window.ctx = new AudioContext();
    window.oscillator = window.ctx.createOscillator();
    var dot = 1.2 / 15;
    var splits = getoption();

    $("#btn-play").get(0).innerHTML = "取消";
    $("#btn-play").attr("onclick","stop()");

    var t = window.ctx.currentTime;
    
    window.oscillator.type = "sine";
    window.oscillator.frequency.value = 600;

    var gainNode = window.ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);

    $('#encode').val().split("").forEach(function(letter) {
        switch (letter) {
        case splits.short:
            gainNode.gain.setValueAtTime(1, t);
            t += dot;
            gainNode.gain.setValueAtTime(0, t);
            t += dot;
            break;
        case splits.long:
            gainNode.gain.setValueAtTime(1, t);
            t += 3 * dot;
            gainNode.gain.setValueAtTime(0, t);
            t += dot;
            break;
        case splits.space:
            t += 7 * dot;
            break;
        }
    });

    window.oscillator.connect(gainNode);
    gainNode.connect(window.ctx.destination);

    window.oscillator.start();

    return false;
};

function stop(){
    $("#btn-play").get(0).innerHTML = "播放";
    $("#btn-play").attr("onclick","play()");
    window.oscillator.stop();
    delete window.oscillator;
    delete window.ctx;
    return false;
}