function read_html2canvas(){
  return new Promise(function(resolve, reject){
    if(document.getElementById("mel225_score2img")) reject();
    var s = document.createElement("script");
    s.src = "https://mel225.github.io/OngekiFunctions/html2canvas.js";
    s.id = "mel225_score2img";
    document.head.appendChild(s);
    s.onload = function(){
      console.log("html2canvas.js loaded.");
      resolve();
    }
  });
}

function score2img(){
  var title_imgs = document.getElementsByClassName("title");
  var no = 0;
  [].forEach.call(title_imgs, function(img){
    if(img.src.includes("rating")){
      var img_div, element, canvas_div;
      if(document.getElementById("img_" + no)){
        canvas_div = document.getElementById("img_" + no);
        canvas_div.parentNode.removeChild(canvas_div);
        img_div = document.getElementById("img_div_" + no);
      }else{
        element = img.parentNode.nextElementSibling;
        img_div = insertBefore(element, document.createElement("div"));
        img_div.className = "m_t_5 m_b_5";
        
        while(element.tagName.toLowerCase() == "div"){
          var score_div = element;
          element = element.nextElementSibling;
          score_div.parentNode.removeChild(score_div);
          img_div.appendChild(score_div);
        }
      }
      
      var canvas_div = insertBefore(img_div, document.createElement("img"));
      canvas_div.className = "m_5";
      canvas_div.id = "img_" + no;
      html2canvas(img_div, {
      onrendered: function(canvas){
        canvas_div.src = canvas.toDataURL();
      }
      });
      
      img_div.style.display = "none";
      no++;
      console.log(canvas_div);
    }
  });
  
  function insertBefore(target, newItem) {
    target.parentNode.insertBefore(newItem, target);
    return newItem;
  }
}