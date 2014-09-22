/*
// correct function to load jQuery
var loadjQuery = function(wnd){
  var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
   .getService(Components.interfaces.mozIJSSubScriptLoader);
   loader.loadSubScript("chrome://markdownviewer/content/jquery-1.4.3.min.js", wnd);
   var jQuery = XPCNativeWrapper.unwrap(wnd).$;
   jQuery.noConflict(true);
  return jQuery;
};


// field to store the jQuery for the current document window (as there can be multiple tabs)
var jQueryForWindow = null;

// event to call on window load (didn't include the code, left for reader to do)
windowLoad = function (event)
{
    var appcontent = document.getElementById("appcontent"); // browser  
    appcontent.addEventListener("DOMContentLoaded", pageLoad, false);
}

// load jQuery on DOMContentLoaded event
pageLoad = function (event) {
      var doc = event.originalTarget;
      var wnd = doc.defaultView;
      jQueryForWindow = loadjQuery(wnd);
  var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
   .getService(Components.interfaces.mozIJSSubScriptLoader);
   loader.loadSubScript("chrome://markdownviewer/content/jqmath-etc-0.4.0.min.js",
                                    context, "UTF-8" );
}

*/

gBrowser.addEventListener('DOMContentLoaded', function load(event) {
	gBrowser.removeEventListener('DOMContentLoaded', load, false);
	Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
.getService(Components.interfaces.mozIJSSubScriptLoader)
.loadSubScript("chrome://markdownviewer/content/marked.js"); 
//Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader).loadSubScript("chrome://markdownviewer/content/marked.js"); 
	markdownviewer.init();
}, false);


if (typeof markdownviewer === 'undefined') {

	var markdownviewer = {

		init: function() {
			var appcontent = document.getElementById('appcontent');
			if (appcontent) {
				appcontent.addEventListener('DOMContentLoaded', this.onPageLoad, true);
			}
		},

		onPageLoad: function(aEvent) {
			var document = aEvent.originalTarget,
			    regexpMdFile = /\.m(arkdown|kdn?|d(o?wn)?)(#.*)?$/i;

			if (regexpMdFile.test(document.location.href)) {
				marked.setOptions({
					gfm: true,
					pedantic: false,
					sanitize: false,
					tables: true,
					smartLists: true,
					langPrefix: 'language-'
				});
				var content = document.firstChild;
				//var crurl=document.URL.split('/');crurl.pop();
				var txt = content.textContent;
				content.innerHTML = '<!DOCTYPE html>' +
				                    '<head>' + //'<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />'+
				                    '    <title></title>' +
				                    '    <link rel="stylesheet" type="text/css" href="resource://mdskin/bootstrapLite.css">' +
				                    '    <link rel="stylesheet" type="text/css" href="resource://mdskin/default.min.css">' +
				                   '    <link rel="stylesheet" type="text/css" href="resource://mdskin/katex/katex.min.css">' +
/*				                    ' <script type="application/x-javascript" src="resource://mdskin/jquery-1.4.3.min.js" '+
				                    ' <script type="application/x-javascript" src="resource://mdskin/jqmath-etc-0.4.0.min.js" '+
				                    ' <script type="application/x-javascript" src="resource://mdskin/marked.js" '+*/
				                    '</head>' +
				                    '<body>' +
									//'<div class="container">'+
									//'<a href='+crurl.join('/')+'>UP</a><br>' +
				                        //M.parseMath(marked(content.textContent)) +
				                        marked(txt) +
										//'</div>'+
									
				                    '</body>';
				  /*  try {
					      var mrkd=document.querySelector(".container");
						 M.parseMath(mrkd);//M.parseMath(content.textContent);
						} catch (e) {
						 var mathmarked = e;
						}
						mrkd.innerHTML = mrkd.innerHTML;
                        */
				document.title = document.body.firstChild.textContent.substr(0, 50).replace('<', '&lt;').replace('>', '&gt;');// + " - Markdown Viewer";

				var loadjsfile = function(doc, jsfile){
					var script  = doc.createElement("script");
					script.type = "text/javascript";
					script.src  = "resource://mdskin/" + jsfile;
					var head = doc.getElementsByTagName("head")[0] || doc.documentElement;
					head.insertBefore(script, head.firstChild);
				};

				//loadjsfile(document, 'highlight.min.js');
				//loadjsfile(document, 'inithighlight.js');
			}
		}
	};
}
