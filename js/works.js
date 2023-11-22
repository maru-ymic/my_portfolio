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