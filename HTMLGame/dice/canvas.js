var cwidth = 400;
var cheight = 300;
var dx = 50;
var dy = 50;
var dicewidth = 100;
var diceheight = 100;
var dotrad = 6;
var ctx;
var dicex;
var dicey;

function throwdice() {
  dicex = dx;
  dicey = dy;
  var ch = 1 + Math.floor(Math.random() * 6);
  drawface(ch);
  dicex = dx + 150;
  console.log(ch);
  ch = 1 + Math.floor(Math.random() * 6);
  console.log(ch);
  drawface(ch);
}

//function init() {
//  var ch = 1 + Math.floor(Math.random() * 6);
//    console.log(ch);
//  drawface(ch);
//}

function drawface(n) {
  ctx = document.getElementById('canvas').getContext('2d');
  ctx.lineWidth = 5;
  console.log(dicex, dicey);
  ctx.clearRect(dicex, dicey, dicewidth, diceheight);
  ctx.strokeRect(dicex, dicey, dicewidth, diceheight);
  ctx.fillStyle = '#009966';

  switch (n) {
  case 1:
    draw1();
    break;
  case 2:
    draw2();
    break;
  case 3:
    draw2();
    draw1();
    break;
  case 4:
    draw4();
    break;
  case 5:
    draw4();
    draw1();
    break;
  case 6:
    draw4();
    draw2mid();
    break;
  }
}

function draw1() {
  var dotx;
  var doty;
  ctx.beginPath();
  dotx = dicex + 0.5 * dicewidth;
  doty = dicey + 0.5 * diceheight;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function draw2() {
  var dotx;
  var doty;
  ctx.beginPath();

  dotx = dicex + 3 * dotrad;
  doty = dicey + 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  dotx = dicex + dicewidth - 3 * dotrad;
  doty = dicey + diceheight - 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  ctx.closePath();
  ctx.fill();
}

function draw4() {
  var dotx;
  var doty;
  ctx.beginPath();

  dotx = dicex + 3 * dotrad;
  doty = dicey + 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  dotx = dicex + dicewidth - 3 * dotrad;
  doty = dicey + diceheight - 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

//  ctx.closePath();
//  ctx.fill();
//  ctx.beginPath();

  dotx = dicex + 3 * dotrad;
  doty = dicey + diceheight - 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  dotx = dicex + dicewidth - 3 * dotrad;
  doty = dicey + 3 * dotrad;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  ctx.closePath();
  ctx.fill();
}

function draw2mid() {
  var dotx;
  var doty;
  ctx.beginPath();

  dotx = dicex + 3 * dotrad;
  doty = dicey + 0.5 * diceheight;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  dotx = dicex + dicewidth - 3 * dotrad;
  doty = dicey + 0.5 * diceheight;
  ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

  ctx.closePath();
  ctx.fill();
}

