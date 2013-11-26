var boxx        = 20;
var boxy        = 30;
var boxwidth    = 350;
var boxheight   = 250;
var ballrad     = 10;
var boxboundx   = boxwidth + boxx - ballrad;
var boxboundy   = boxheight + boxy - ballrad;
var inboxboundx = boxx + ballrad;
var inboxboundy = boxy + ballrad;
var ballx  = 50;
var bally  = 60;
var ballvx = 4;
var ballvy = 8;
var ctx;

function init() {
  ctx = document.getElementById('canvas').getContext('2d');
  ctx.linewidth = ballrad;
  ctx.fillStyle = "rgb(200, 0, 50)";
  moveball();
  setInterval(moveball, 100);
}

function moveball() {
  ctx.clearRect(boxx, boxy, boxwidth, boxheight);
  moveandcheck();
  ctx.beginPath();
  ctx.arc(ballx, bally, ballrad, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.strokeRect(boxx, boxy, boxwidth, boxheight);
}

function moveandcheck() {
  var nballx = ballx + ballvx;
  var nbally = bally + ballvy;
  if (nballx > boxboundx) {
    ballvx = -ballvx;
    nballx = boxboundx;
  }
  if (nballx < inboxboundx) {
    nballx = inboxboundx;
      ballvx = - ballvx;
  }
  if (nbally > boxboundy) {
    nbally = boxboundy;
    ballvy = -ballvy;
  }
  if (nbally < inboxboundy) {
    nbally = inboxboundy;
    ballvy = -ballvy;
  }
  ballx = nballx;
  bally = nbally;
}

function change() {
  ballvx = Number(f.hv.value);
  ballvy = Number(f.vv.value);
  return false;
}
