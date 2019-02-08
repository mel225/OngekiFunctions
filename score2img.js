read_html2canvas().then(score2img);

function read_html2canvas(){
  return new Promise(function(resolve, reject){
    var s = d.createElement("script");
    s.src = "https://mel225.github.io/OngekiFunctions/html2canvas.js";
    d.head.appendChild(s);
    s.onload = function(){
      console.log("html2canvas.js loaded.");
      resolve();
    }
  });
}

function score2img(){
  var title_imgs = d.getElementsByClassName("title");
  [].forEach.call(title_imgs, function(img){
    if(img.src.includes("rating")){
      var element = img.parentNode.nextElementSibling;
      var img_div = insertBefore(element, d.createElement("div"));
      img_div.className = "m_t_5 m_b_5";
      
      while(element.tagName.toLowerCase() == "div"){
        var score_div = element;
        element = element.nextElementSibling;
        score_div.parentNode.removeChild(score_div);
        img_div.appendChild(score_div);
      }
      
      html2canvas(img_div, {
      onrendered: function(canvas){
        var canvas_div = insertBefore(img_div, d.createElement("img"));
        canvas_div.src = canvas.toDataURL();
        canvas_div.className = "m_5";
      }
      });
      
      img_div.display = "none";
      console.log(img);
    }
  });
  
  function insertBefore(target, newItem) {
    target.parentNode.insertBefore(newItem, target);
    return newItem;
  }
}