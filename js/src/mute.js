function muteMe(elem, value) {elem.muted = value;}
$(function(){document.addEventListener('visibilitychange', function() {
	if(document.hidden) {
		document.querySelectorAll("audio").forEach( audio => muteMe(audio, true) );
		document.querySelectorAll("video").forEach( video => muteMe(video, true) );
	}else {
		document.querySelectorAll("audio").forEach( audio => muteMe(audio, false) );
		document.querySelectorAll("video").forEach( video => muteMe(video, false) );
	}
})})