read_html2canvas().then(score2img);

function read_html2canvas(){
  return new Promise(function(resolve, reject){
    if(location.href != "https://ongeki-net.com/ongeki-mobile/home/ratingTargetMusic/"){
      if(window.confirm("指定のページでの実行をお願いいたします。\n指定ページへ移動しますか？（ログインが必要です）")){
        location.href = "https://ongeki-net.com/ongeki-mobile/home/ratingTargetMusic/";
      }
      reject();
    }else if(document.getElementById("mel225_score2img")){
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
  // 強制的にviewportを書き換えるviewportContent = "width=device-width,initial-scale=1.0,user-scalable=yes,shrink-to-fit=no";
  var defaultIsiOS = isiOS;
  isiOS = false;
  updateMetaViewport();
  
  return Promise.all([].map.call(title_imgs, function(img){
    return new Promise(function(resolve, reject){
      // divに乗せる
      if(img.src.includes("rating")){
        var img_div = document.createElement("div");
        img_div.className = "m_t_5 m_b_5";
        img_div.id = "img_div_" + no++;
        
        var element = img.parentNode.nextElementSibling;
        element.parentNode.insertBefore(img_div, element);

        console.log(img_div, element);
        while(element.tagName.toLowerCase() == "div"){
          var score_div = element;
          element = element.nextElementSibling;
          score_div.parentNode.removeChild(score_div);
          img_div.appendChild(score_div);
        }
        
        alert(img_div.id + " divに乗せた。");
        resolve(img_div);
      }else{
        reject();
      }
    }).then(function(img_div, n){
      // canvasにする
      var canvas_div = img_div.parentNode.insertBefore(document.createElement("img"), img_div);
      canvas_div.id = img_div.id.replace("div_", "");
      canvas_div.className = "m_5";
      
      return html2canvas(img_div).then(function(canvas){
        canvas_div.src = canvas.toDataURL();
        /*
        console.log("w:h", canvas_div.scrollHeight, ":", canvas_div.scrollWidth);
        var ratio = canvas_div.scrollHeight / canvas_div.scrollWidth;
        canvas_div.style.width = document.body.clientWidth;
        canvas_div.style.height = document.body.clientWidth * ratio;
          */
        canvas_div.style.width = "100%";
        console.log(canvas_div);
        alert(img_div.id + " canvasにした。");
        return img_div;
      });
    }).then(function(img_div){
      // img_divを非表示にする
      img_div.style.display = "none";
      alert(img_div.id + " finished.");
      return;
    }).catch(function(){
      console.log("catched");
      return;
    });
  })).then(function(){
    // img_div以外の要素に右クリック禁止属性を付与する
    document.body.oncontextmenu = "";
    document.oncontextmenu = "";
    document.body.childNodes.forEach(recursion);
    isiOS = defaultIsiOS;
    updateMetaViewport();
    console.log("========== completed. ==========");
  });
}

function recursion(obj){
  if(obj.children){
    var tempArray = Array.prototype.slice.call(obj.children);
    /*ここで要素を何か操作する*/
    console.log(obj);
    if(!obj.id || !obj.id.includes("img_")){
      obj.oncontextmenu = function(){return false;};
      tempArray.forEach(recursion);
    }else if(obj.id){
      console.log(obj);
      obj.parentNode.oncontextmenu = "";
    }
  }
}