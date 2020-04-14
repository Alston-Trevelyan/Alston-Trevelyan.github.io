$(document).ready(function() {
/*
 *  参数详解:
 * upTime          上移的时间
 * downTime        下落的时间
 * beatHeight      上移高度
 * isAuth          是否自动
 * isRotate        是否旋转
$('#beatText').beatText({isAuth:false,isRotate:false});
$('#rotateText').beatText({isAuth:false,isRotate:true, beatHeight: "3em"});
$('#autoText').beatText({isAuth:true,beatHeight:"3em",isRotate:false});
$('#roloadText').beatText({isAuth:true,beatHeight:"3em",isRotate:false,upTime:700,downTime:700});
$('#autoRotateText').beatText({isAuth:true,upTime:700,downTime:700,beatHeight:"3em",isRotate:true});
*/
$('.post-title').beatText({isAuth:false,isRotate:false});
$('.post-title-link').beatText({isAuth:false,isRotate:false});
// tags页面
$('.tag-cloud-tags a').beatText({isAuth:false,isRotate:false});
// 404
$('#404Beat').beatText({isAuth:false,isRotate:false});
$('#404Auto').beatText({isAuth:true,beatHeight:"3em",isRotate:false});
});
