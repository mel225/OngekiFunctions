function read_html2canvas(){
  return new Promise(function(resolve, reject){
    if(location.href != "https://ongeki-net.com/ongeki-mobile/home/ratingTargetMusic/"){
      if(window.confirm("指定のページでの実行をお願いいたします。\n指定ページへ移動しますか？（ログインが必要です）")){
        location.href = "https://ongeki-net.com/ongeki-mobile/home/ratingTargetMusic/";
      }
      reject();
    }
    if(document.getElementById("mel225_score2img")){
      reject();
    }else{
      var s = document.createElement("script");
      s.src = "https://mel225.github.io/OngekiFunctions/html2canvas.js";
      s.id = "mel225_score2img";
      document.head.appendChild(s);
      s.onload = function(){
        console.log("html2canvas.js loaded.");
        resolve();
      }
    }
  });
}

function score2img(){
  var title_imgs = document.getElementsByClassName("title");
  var no = 0;
  Promise.all([].map.call(title_imgs, function(img){
    if(img.src.includes("rating")){
      var img_div, element, canvas_div;
      if(document.getElementById("img_" + no)){
        canvas_div = document.getElementById("img_" + no);
        canvas_div.parentNode.removeChild(canvas_div);
        img_div = document.getElementById("img_div_" + no);
        img_div.style.display = "block";
      }else{
        element = img.parentNode.nextElementSibling;
        img_div = element.parentNode.insertBefore(document.createElement("div"), element);
        img_div.className = "m_t_5 m_b_5";
        img_div.id = "img_div_" + no;
        
        while(element.tagName.toLowerCase() == "div"){
          var score_div = element;
          element = element.nextElementSibling;
          score_div.parentNode.removeChild(score_div);
          img_div.appendChild(score_div);
        }
      }
      
      var canvas_div = img_div.parentNode.insertBefore(document.createElement("img"), img_div);
      canvas_div.id = "img_" + no;
      canvas_div.className = "m_5";
      var promise = html2canvas(img_div).then(function(canvas){
        canvas_div.src = canvas.toDataURL();
        return Promise.reslove;
      });
      no++;
      console.log(canvas_div);
      return promise;
    }
  })).then(function(){
    var i;
    for(i=0; document.getElementById("img_"+i); i++){
      document.getElementById("img_div_" + i).style.display = "none";
    }

    document.body.oncontextmenu = "";
    document.oncontextmenu = "";
    recursion(document.body.chileNodes);
  });
}

function recursion(obj){
  var tempArray = Array.prototype.slice.call(obj.children);
  /*ここで要素を何か操作する*/
  console.log(obj);
  if(!obj.id || !obj.id.includes("img_")){
    obj.oncontextmenu = function(){return false;};
    console.log("   oncontextmenu change to false.");
  }
  tempArray.forEach(recursion);
}