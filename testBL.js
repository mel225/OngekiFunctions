javascript:
(function(d, s){
  console.log("mel225");
  var s = d.createElement("script");
  s.src = "https://mel225.github.io/OngekiFunctions/html2canvas.js";
  d.head.appendChild(s);
  
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
        insertBefore(img_div, canvas);
        canvas.className = "m_15";
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
}) (document)