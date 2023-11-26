"use strict";

// スムーズスクロール
$('.page-top').click(function () {
  $('body,html').animate({
      scrollTop: 0//ページトップまでスクロール
  }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});

$(function(){
  $('.js-modalButton').on('click', function(){
    // 自分自身の data-id の値を取得
    const dataID = $(this).attr('data-id');
    $('.js-modal[data-id="' + dataID + '"]').addClass('on');
  });

  $('.js-modalClose').on('click', function(){
    $('.js-modal').removeClass('on');
  })
});


var beforePos = 0;//スクロールの値の比較用の設定

//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
function ScrollAnime() {
  var elemTop = $('#about-area').offset().top;//#area-2の位置まできたら
  var scroll = $(window).scrollTop();
  //ヘッダーの出し入れをする
  if(scroll == beforePos) {
  //IE11対策で処理を入れない
  } else if(elemTop > scroll || 0 > scroll - beforePos){
  //ヘッダーが上から出現する
  $('.header').removeClass('UpMove'); //#headerにUpMoveというクラス名を除き
  $('.header').addClass('DownMove');//#headerにDownMoveのクラス名を追加
  }else {
  //ヘッダーが上に消える
    $('.header').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
  $('.header').addClass('UpMove');//#headerにUpMoveのクラス名を追加
  }
  
  beforePos = scroll;//現在のスクロール値を比較用のbeforePosに格納
}


// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  ScrollAnime();//スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  ScrollAnime();//スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
});


// スクロールしたらヘッダー背景色変更
$(function () {
  $(window).on('scroll', function () {
  if ($('#about-area').height()  < $(this).scrollTop()) {
    $('.header').addClass('change-color');
  } else {
    $('.header').removeClass('change-color');
  }
  });
});