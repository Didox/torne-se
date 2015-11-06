var app = window.app || {};

app.appVersion       = 5;
app.updateHost       = "https://rawgit.com/Didox/torne-se/master/data/data.js";

app.showLoading = function(){
  $(".carregando").show();
};

app.hideLoading = function(moveTop){
  setTimeout(function(){
    moveTop = moveTop == undefined ? true : false;
    $(".carregando").hide();
    if(moveTop) app.scrollTop(0);
  }, 500);
};

app.showLoading();

$(document).ready(function(){
  if($("iframe").size() == 0){
    app.hideLoading();
  }
});