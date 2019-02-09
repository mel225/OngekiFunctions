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
      
      var canvas_div = img_div.parentNode.insertBefore(document.createElement("a"), img_div);
      canvas_div.id = "img_" + no;
      canvas_div.className = "m_5";
      var promise = html2canvas(img_div).then(function(canvas){
        /*
        var image = canvas.toDataURL("image/png").replace(/^data:image\/png/, "data:application/octet-stream");
        //document.querySelector("#"+canvas_div.id)
        canvas_div.addEventListener("click", (e)=>e.target.href=URL.createObjectURL(
          new Blob(['hello'], { type: "text/plain" })
          ));
        $("#"+canvas_div.id).attr("href", image).attr("download", img.src.slice(img.src.lastIndexOf("_")+1))
          .attr("data-ajax", false);
          */
        canvas.toBlob(blob=>{
          canvas_div.addEventListener("click", (e)=>e.target.href=URL.createObjectURL(blob));
        });
        canvas_div.appendChild(document.createElement("img")).src = canvas.toDataURL();
        //canvas_div.src = canvas.toDataURL();
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
  });
/*
  document.body.oncontextmenu = "";
  document.oncontextmenu = "";
  document.body.childNodes.forEach(function(element){
    console.log(element);
    if(!element.id || !element.id.includes("img_")){
      element.oncontextmenu = function(){return false;};
    }
  });
  */
}