var connect;
connect = require('connect');
/*
 Connect - Analytics
 Copyright(c) 2011 Francois Lafortune
 MIT Licensed
*/
/*
    Injects an Async Google Analytics Snippet nefore and html </body> tag
    if present. (nb: replaces "</body>" /w "snippet + </body>" using regex.)
*/
module.exports = function(UAString) {
  return function(req, res, next) {
    var end;
    end = res.end;
    res.end = function(data, encoding) {
      var snippet;
      res.end = end;
      if (typeof data === 'string' && (!/GA_ASYNC_SNIPPET/.test(data) && /\<\/body\>/.test(data))) {
        snippet = "<script type=\"text/javascript\" charset=\"utf-8\"><!-- GA_ASYNC_SNIPPET -->var _gaq=_gaq||[];_gaq[_gaq.length] = [\"_setAccount\", \"" + UAString + "\"];_gaq[_gaq.length] = [\"_trackPageview\"];                           (function() {   var ga = document.createElement(\"script\");   ga.src = (\"https:\" == document.location.protocol ? \"https://ssl\" : \"http://www\") + \".google-analytics.com/ga.js\";   ga.setAttribute(\"async\", \"true\");   document.documentElement.firstChild.appendChild(ga);})();</script>";
      }
      data = data.replace(/\<\/body\>/, "" + snippet + "</body>");
      return res.end(data, encoding);
    };
    return next();
  };
};