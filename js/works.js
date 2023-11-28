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
  } else {
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
  if ($('#about-area, #works-area').height()  < $(this).scrollTop()) {
    $('.header').addClass('change-color');
  } else {
    $('.header').removeClass('change-color');
  }
  });
});


// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw"
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let humberger = document.getElementById("js-hamberger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");

// メニュー開閉制御
humberger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {// flgの状態で制御内容を切り替え
    backgroundFix(false);
    humberger.setAttribute("aria-expanded", "false");
    humberger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    humberger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});

window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    humberger.classList.remove(CLASS);
    menu.classList.remove(CLASS);

    backgroundFix(false);
    humberger.focus();
    humberger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});