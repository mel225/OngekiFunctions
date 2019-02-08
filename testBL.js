javascript:
(function(d,s){
  s = d.head.appendChild(d.createElement('script'));
  s.src = "https://mel225.github.io/OngekiFunctions/score2img.js";
  s.onload = function(){
    read_html2canvas().then(score2img);
  };
})(document);