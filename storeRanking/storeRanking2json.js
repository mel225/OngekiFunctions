javascript:
(function(d){
  var BASIC = 0;
  var ADVANCED = 1;
  var EXPERT = 2;
  var MASTER = 3;
  var LUNATIC = 10;
  var ALL = 99;
  var Diffs = [BASIC, ADVANCED, EXPERT, MASTER, LUNATIC, ALL];

  var BS = 1;
  var TS = 2;
  var OD = 3;
  var ScoreTypes = [BS, TS, OD];
  
  var url = "https://ongeki-net.com/ongeki-mobile/ranking/";
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "document";
  request.send("");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      if(request.responseURL.indexOf(url) == -1){
        alert("アクセスできませんでした。\nログインしなおしてください");
        location.href = "https://ongeki-net.com/ongeki-mobile/";
      }else{
        d = request.response;
        exec(d);
      }
    }
  };

  function exec(d){
    var data = {};
    
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var w = now.getDay();
    var h = now.getHours();
    var ms= now.getMinutes();
    if(m < 10) m = '0' + m;
    if(d < 10) d = '0' + d;
    if(h < 10) h = '0' + h;
    if(ms< 10) ms= '0' + ms;
    data.date = y + "/" + m + "/" + d + " " + h + ":" + ms;
    
    /***************** 楽曲別ランキング *****************/
    var musicRanking = {};
    data.MusicRanking = musicRanking;
    var genre = 99;
    var rankingType = 2;
    ScoreTypes.forEach(function(st){
      musicRanking[st] = {};
      Diffs.slice(0, Diffs.length-1).forEach(function(df){
        musicRanking[st][df] = {};
        var url = "https://ongeki-net.com/ongeki-mobile/ranking/musicRankingDetail/";
        var params = [];
        params.push("genre=" + genre);
        params.push("scoreType=" + st);
        params.push("rankingType=" + rankingType);
        params.push("diff=" + df);

        doXHR(url, params, function(document){
          var forms = document.forms;
          for(var i=1; i<forms.length; i++){
            var url = "https://ongeki-net.com/ongeki-mobile/ranking/musicRankingDetail/";
            var params = [];
            params.push("idx=" + forms[i].getAttribute("action"));
            params.push("scoreType=" + st);
            params.push("diff=" + df);
            doXHR(url, params, getRankingData, st, df);
            var req = new XMLHttpRequest();
            req.onreadystatechange = function(){
              if(request.readyState = 4 && request.status == 200){
                if(request.responseURL.indexOf(url) == -1){
                  alert("アクセスに失敗しました。\nログインしなおしてください。");
                  location.href = "https://ongeki-net.com/ongeki-mobile/";
                }else{
                  getRankingData(req.response, musicRanking[st][df]);
                }
              }
            };
            req.open("GET", url + "?" + prms.join("&"), true);
            req.responseType = "document";
            req.send("");
          }
        });
      });
    });

    /***************** バトルポイント *****************/
    doXHR("https://ongeki-net.com/ongeki-mobile/ranking/battlePoint/", ["rankingType=2"], getBPRankingData);

    /***************** レーティング *****************/
    doXHR("https://ongeki-net.com/ongeki-mobile/ranking/rating/", ["rankingType=2"], getRatingRankingData);

    /***************** トータルハイスコア *****************/
    var tsRanking = {};
    data.TotalHighScoreRanking = tsRanking;
    ScoreTypes.slice(0, ScoreTypes.length-1).forEach(function(st){
      tsRanking[st] = {};
      Diffs.forEach(function(df){
        tsRanking[st][df] = {};
        url = "https://ongeki-net.com/ongeki-mobile/ranking/totalHiscore/";
        params = [];
        params.push("scoreType=" + st);
        params.push("rankingType=2");
        params.push("diff=" + df);
        doXHR(url, params, getTSRankingData, tsRanking[st][df]);
      });
    });

    /***************** 総獲得マニー *****************/
    doXHR("https://ongeki-net.com/ongeki-mobile/ranking/totalPoint/", ["rankingType=2"], getTPRankingData);


    /***************** 関数群 *****************/
    /* 楽曲別ランキング取得関数 */
    function getMusicRankingData(d, musicRankingSD){
      var musicRankingData = {};
      musicRankingData.musicName = d.getElementsByClassName("music_label p_5 break")[0].innerText;
      var table = d.getElementsByClassName("border_block lunatic_score_back m_5 p_5 t_l")[0].firstElementChild;
      for(var i=0; i<table.rows.length; i++){
        musicRankingData[i] = {};
        musicRankingData[i].name = table.rows[i].cells[2].innerText;
        musicRankingData[i].date = table.rows[i].cells[3].firstElementChild.innerText;
        musicRankingData[i].score = table.rows[i].cells[3].lastElementChild.innerText;
      }
      musicRankingSD[musicRankingData.musicName] = musicRankingData;
    }

    /* バトルポイントランキング取得関数 */
    function getBPRankingData(d){
      data.location = d.getElementsByClassName("m_5 f_15 ranking_type_name f_b")[0].innerText;
      var BPRankingData = {};
      var table = d.getElementsByClassName("ranking_inner_table f_14")[0];
      for(var i=0; i<100; i++){
        BPRankingData[i] = {};
        BPRankingData[i].name = table.rows[i+1].cells[2].innerText;
        BPRankingData[i].score = table.rows[i+1].cells[4].innerText;
      }
      data.BPRanking = BPRankingData;
      console.log("completed getting battle point ranking data.");
    }

    /* トータルハイスコアランキング取得関数 */
    function getTSRankingData(d, tsRankingSD){
      var tsRankingData = {};
      var table = d.getElementsByClassName("ranking_inner_table f_14")[0];
      for(var i=0; i<100; i++){
        tsRankingDataSD[i] = {};
        tsRankingDataSD[i].name = table.rows[i+1].cells[2].innerText;
        tsRankingDataSD[i].score = table.rows[i+1].cells[3].innerText;
      }
      tsRankingSD = tsRankingData;
    }

    /* レートランキング取得関数 */
    function getRatingRankingData(d){
      var RatingRankingData = {};
      var table = d.getElementsByClassName("ranking_inner_table f_14")[0];
      for(var i=0; i<100; i++){
        RatingRankingData[i] = {};
        RatingRankingData[i].name = table.rows[i+1].cells[2].innerText;
        RatingRankingData[i].score = table.rows[i+1].cells[3].innerText;
      }
      data.RatingRanking = RatingRankingData;
      console.log("completed getting rating ranking data.");
    }

    /* 総獲得マニーランキング取得関数 */
    function getTPRankingData(d){
      var TPRankingData = {};
      var table = d.getElementsByClassName("ranking_inner_table f_14")[0];
      for(var i=0; i<100; i++){
        TPRankingData[i] = {};
        TPRankingData[i].name = table.rows[i+1].cells[2].innerText;
        TPRankingData[i].score = table.rows[i+1].cells[3].innerText;
      }
      data.TotalPointRanking = TPRankingData;
      console.log("completed getting ranking data.");
    }

    console.log(JSON.stringify(data));
  }

  /* XHRをする関数 */
  function doXHR(url, params, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState = 4 && request.status == 200){
        if(request.responseURL.indexOf(url) == -1){
          alert("アクセスに失敗しました。\nログインしなおしてください。");
          location.href = "https://ongeki-net.com/ongeki-mobile/";
        }else{
          callback(request.response, arguments[3]);
        }
      }
    };
    request.open("GET", url + "?" + params.join("&"), true);
    request.responseType = "document";
    request.send("");
  }
  
}) (document);