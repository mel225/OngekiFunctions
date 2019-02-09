load_html2canvas().then(score2img);
/*
load_html2canvas().then(
  function(){
    console.log("loaded html2canvas");
    var btn = document.body.appendChild(document.createElement("button"));
    btn.style.width = "100%";
    btn.style.height = "40px";
    btn.style.textalign = "center";
    btn.style.background = "#fff";
    btn.innerText = "score2imgを実行する";
    btn.onclick = function(){
      alert("ボタンがクリックされました。");
      if(!document.getElementById("img_0"))
        score2img();
    };
    btn.id = "exec_button";
  });
*/

function load_html2canvas(){
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
  
  return Promise.all([].map.call(title_imgs, function(img){
    return new Promise(function(resolve, reject){
      // divに乗せる
      var img_div = score_onto_div(img);
      if(img_div){
        resolve(img_div);
      }else{
        reject();
      }
    }).then(function(img_div){
      // canvasにする
      return div2img(img_div);
    }).then(function(img_div){
      // img_divを非表示にする
      //img_div.style.display = "none";
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
    console.log("========== completed. ==========");
  });
}

function score_onto_div(img){
  return new Promise(function(resolve, reject){
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
      
      console.log(img_div.id + " divに乗せた。");
      return img_div;
    }else{
      return null;
    }
  });
}

function div2img(img_div){
  // canvasにする
  var canvas_div = img_div.parentNode.insertBefore(document.createElement("img"), img_div);
  canvas_div.id = img_div.id.replace("div_", "");
  canvas_div.className = "m_5";
  
  return html2canvas(img_div).then(function(canvas){
    alert(canvas);
    console.log(canvas);
    img_div.parentNode.insertBefore(canvas, img_div);
    
    canvas_div.src = canvas.toDataURL();
    canvas_div.style.width = "100%";
    $("#"+canvas_div.id).css({"-webkit-touch-callout":"default", "touch-callout":"default"});
    console.log(canvas_div);
    console.log(img_div.id + " canvasにした。");
    return img_div;
  });
}

function recursion(obj){
  if(obj.children){
    var tempArray = Array.prototype.slice.call(obj.children);
    /*ここで要素を何か操作する*/
    if(!obj.id || !obj.id.includes("img_")){
      obj.oncontextmenu = function(){return false;};
      tempArray.forEach(recursion);
    }else if(obj.id){
      console.log(obj);
      obj.parentNode.oncontextmenu = "";
    }
  }
}