if(document.getElementById("mel225_html2canvas")){
  exec(document);
}else{
  var s = document.head.appendChild(document.createElement("script"));
  s.id = "mel225_html2canvas";
  s.src = "https://mel225.github.io/OngekiFunctions/html2canvas.js";
  s.onload = function(){
    alert("html2canvas 読込完了");
    exec(document);
  };
}

function exec(d){
  console.log("---- mel225 html2canvas ----");
  html2canvas(d).then(function(canvas){
    var input = d.body.appendChild(d.createElement("input"));
    var a = input.appendChild(d.createElement("a"));
    a.href = canvas.toDataURL();
    a.download = "test.png";
    a.id = "mel225_download";
    input.type = "button";
    input.onclick = getImage;
    input.innerText = "ダウンロード";
    alert("ボタンを押してね。");
  });
}

function getImage(){
  document.getElementById("mel225_download").click();
}

/*
javascript:
(function(d, s){
  if(d.getElementById("mel225")){
    exec();
  }else{
    s = d.head.appendChild(d.createElement("script"));
    s.src = "https://mel225.github.io/OngekiFunctions/use_htoc.js";
    s.id = "mel225";
  }
}) (document);
  */