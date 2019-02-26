if(document.getElementById("mel225")){
  exec(document);
}else{
  var s = document.head.appendChild(document.createElement("script"));
  s.id = "mel225";
  s.src = "html2canvas.js";
  s.onload = function(){
    exec(document);
  };
}

function exec(d){
  console.log("---- mel225 html2canvas ----");
  html2canvas(d).then(function(canvas){
    var input = d.body.appendChild(d.createElement("input"));
    var a = div.appendChild(d.createElement("a"));
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