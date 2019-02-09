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
  if(document.getElementById("mel225_score2img")){
    return Promise.reject;
  }
  var title_imgs = document.getElementsByClassName("title");
  var no = 0;
  return Promise.all([].map.call(title_imgs, function(img){
    return new Promise(function(resolve, reject){
      // divに乗せる
      if(img.src.includes("rating")){
        var img_div = document.createElement("div");
        img_div.className = "m_t_5 m_b_5";
        img_div.id = "img_div_" + no;
        
        var element = img.parentNode.nextElementSibling;
        element.parentNode.insertBefore(img_div, element);

        console.log(img_div, element);
        while(element.tagName.toLowerCase() == "div"){
          var score_div = element;
          element = element.nextElementSibling;
          score_div.parentNode.removeChild(score_div);
          img_div.appendChild(score_div);
        }
        
        console.log("divに乗せた。");
        resolve(img_div);
      }else{
        reject();
      }
    }).then(function(img_div){
      // canvasにする
      var canvas_div = img_div.parentNode.insertBefore(document.createElement("img"), img_div);
      canvas_div.id = "img_" + no;
      canvas_div.className = "m_5";
      return html2canvas(img_div).then(function(canvas){
        canvas_div.src = canvas.toDataURL();
        console.log("w:h", canvas_div.scrollHeight, ":", canvas_div.scrollWidth);
        var ratio = canvas_div.scrollHeight / canvas_div.scrollWidth;
        canvas_div.style.width = document.body.clientWidth;
        canvas_div.style.height = document.body.clientWidth * ratio;
        console.log(canvas_div);
        conosole.log("canvasにした。");
        return img_div;
      });
    }).then(function(img_div){
      // img_divを非表示にする
      img_div.style.display = "none";
      return;
    }).catch(function(){
      console.log("catched");
      return;
    });
    console.log("img_" + no + " finished.");
    no++;
  })).then(function(){
    // img_div以外の要素に右クリック禁止属性を付与する
    document.body.oncontextmenu = "";
    document.oncontextmenu = "";
    document.body.childNodes.forEach(recursion);
  });
}

function recursion(obj){
  if(obj.children){
    var tempArray = Array.prototype.slice.call(obj.children);
    /*ここで要素を何か操作する*/
    console.log(obj);
    if(!obj.id || !obj.id.includes("img_")){
      obj.oncontextmenu = function(){return false;};
      console.log("   oncontextmenu change to false.");
      tempArray.forEach(recursion);
    }else if(obj.id){
      alert(obj);
      obj.parentNode.oncontextmenu = "";
    }
  }
}