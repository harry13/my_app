(function(window, undefined) {

//初期設定
var basePosition = 3;
var items;
var btnRight;
var btnLeft;
var prevItem;
var currentItem;
var nextItem;
var positionLeftNum;
var positionRightNum;
var isAnimation;
var positionCurrentNum;
var carouselNum;

//初回処理
function init(){
  items = document.getElementsByClassName('s-carousel-item');
  btnRight = document.getElementById('s-btn-right-action');
  btnLeft = document.getElementById('s-btn-left-action');
  itemLength = items.length

  addActionClass();

  // ここはaddEventListenersのようなメソッドを用意すると直前のaddActionClassと共通化出来る
  btnRight.addEventListener('click', toLeft, false);
  btnLeft.addEventListener('click', toRight, false);
}

//左から右にアニメーション
function toRight(){
  if (isAnimation) return;
  isAnimation = true;
  addClass(document.getElementsByClassName('is-left')[0], 'is-active');
  addClass(document.getElementsByClassName('is-current')[0], 'to-left-current');
  document.getElementsByClassName('is-left')[0].addEventListener('webkitAnimationEnd', toRightEnd, false);
}

//右から左にアニメーション
function toLeft(){
  if (isAnimation) return;
  isAnimation = true;
  addClass(document.getElementsByClassName('is-right')[0], 'is-active');
  addClass(document.getElementsByClassName('is-current')[0], 'to-right-current');
  document.getElementsByClassName('is-right')[0].addEventListener('webkitAnimationEnd', toLeftEnd, false);
}

//アニメーション用CSSクラス付与
function addActionClass(){
  positionCurrentNum = basePosition;
  if (basePosition === 1){
    positionLeftNum = itemLength;
  } else {
    positionLeftNum = basePosition - 1;
  }
  if (basePosition === itemLength){
    positionRightNum = 1;
  } else {
    positionRightNum = basePosition + 1;
  }

  for(var i = 0, l = itemLength; l > i; i++){
    carouselNum = +items[i].getAttribute('data-carousel-num');

    if (carouselNum === positionLeftNum){
      addClass(items[i], 'is-left');
      prevItem = items[i];
    } else if (carouselNum === positionCurrentNum){
      addClass(items[i], 'is-current');
      currentItem = items[i];
    } else if (carouselNum === positionRightNum){
      addClass(items[i], 'is-right');
      nextItem = items[i];
    }
  }
}

//アニメーション用CSSクラス削除
function removeActionClass(actionType){
  removeClass(currentItem, 'is-current');
  if (actionType === 'actionLeft') {
    removeClass(nextItem, 'is-right');
    removeClass(prevItem, 'is-active');
    removeClass(prevItem, 'is-left');
    removeClass(currentItem, 'to-left-current');
  // elseのみで良い感じです
  } else {
    removeClass(prevItem, 'is-left');
    removeClass(nextItem, 'is-active');
    removeClass(nextItem, 'is-right');
    removeClass(currentItem, 'to-right-current');
  }
}

//アニメーション終了時の処理：左 ⇒ 右（toRightEnd）
function toRightEnd(){
  document.getElementsByClassName('is-left')[0].removeEventListener('webkitAnimationEnd', toRightEnd, false);

  basePosition--;

  if (basePosition === 0){
    basePosition = itemLength;
  }

  removeActionClass('actionLeft');

  addActionClass();
  isAnimation = false;
};

//アニメーション終了時の処理：右 ⇒ 左（toLeftEnd）
function toLeftEnd(){
  document.getElementsByClassName('is-right')[0].removeEventListener('webkitAnimationEnd', toLeftEnd, false);

  basePosition++;

  if (basePosition > itemLength){
    basePosition = 1;
  }

  removeActionClass('actionRight');

  addActionClass();
  isAnimation = false;
};

//クラス付与
function addClass(elem, classNameValue){
  //正規表現オブジェクトを作成
   var regexp = new RegExp('(?:^|\\b)' + classNameValue + '(?:\\b|$)', 'g');
  // 二重登録防止
  if (!elem.className.match(regexp)){
    elem.className += " " + classNameValue;
  }
}

//クラス削除
function removeClass(elem, classNameValue){
  //正規表現オブジェクトを作成
  var regexp = new RegExp('(?:^|\\b)' + classNameValue + '(?:\\b|$)\\s?', 'g');
  //該当箇所を""で置換する
  var replaced = elem.className.replace(regexp, '');
  // 文末のスペースを削除
  elem.className = replaced.replace(/\s+$/, '');
}

//初回処理を実行
document.addEventListener('DOMContentLoaded', init, false);

})(window, void 0);