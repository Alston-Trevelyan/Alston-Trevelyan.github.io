function decrypt(content){
  var en = {'𝓪':'a','𝓫':'b','𝓬':'c','𝓭':'d','𝓮':'e','𝓯':'f','𝓰':'g','𝓱':'h','𝓲':'i','𝓳':'j','𝓴':'k','𝓵':'l','𝓶':'m','𝓷':'n','𝓸':'o','𝓹':'p','𝓺':'q','𝓻':'r','𝓼':'s','𝓽':'t','𝓾':'u','𝓿':'v','𝔀':'w','𝔁':'x','𝔂':'y','𝔃':'z','𝓐':'A','𝓑':'B','𝓒':'C','𝓓':'D','𝓔':'E','𝓕':'F','𝓖':'G','𝓗':'H','𝓘':'I','𝓙':'J','𝓚':'K','𝓛':'L','𝓜':'M','𝓝':'N','𝓞':'O','𝓟':'P','𝓠':'Q','𝓡':'R','𝓢':'S','𝓣':'T','𝓤':'U','𝓥':'V','𝓦':'W','𝓧':'X','𝓨':'Y','𝓩':'Z'}
  var output = '';
  for (let char of content) {
    if (char in en){char = en[char];}
    output += char;
  }
  return output;
}
function check(list){
	var index = list.indexOf("𝓲𝓷𝓭𝓮𝔁");
	if (index != -1){
		list.splice(index, 1);
		return check(list);
	}else if (index == -1){return list;}
}

function postNav(path){
	var breadcrumbs = path.split("/").slice(1, -1);
	breadcrumbs = check(breadcrumbs);
	var nav = "<ul class='breadcrumb'>";
	for (var i = 0; i < breadcrumbs.length; i++) {
	  nav += "<li>";
	  var name = decrypt(breadcrumbs[i]);
	  if (i != breadcrumbs.length - 1){
	    nav += "<a href='" + path.split(breadcrumbs[i + 1])[0] + "𝓲𝓷𝓭𝓮𝔁'>" + name + "</a>";
	  } else if (i == breadcrumbs.length - 1){nav += name;}
	  nav += "</li>";
	}
	nav += "</ul>";
	return nav;
}