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
var img = new Image();

img.src = "pearl.jpg";
var ctx;
var grad;
var color;
var hue = [
  [255, 0, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255]
];

function init() {
  var h;
  ctx = document.getElementById('canvas').getContext('2d');
  grad = ctx.createLinearGradient(boxx, boxy, boxx + boxwidth, boxy + boxheight);
  for (h = 0; h < hue.length; h++) {
    color = 'rgb(' + hue[h][0] + ',' + hue[h][1] + ',' + hue[h][2] + ')';
    console.log(color);
    grad.addColorStop(h * (1 / 6), color);
  }
  ctx.fillStyle = grad;
  ctx.lineWidth = ballrad;
  moveball();
  setInterval(moveball, 100);
}

function moveball() {
  ctx.clearRect(boxx, boxy, boxwidth, boxheight);
  moveandcheck();
  ctx.drawImage(img, ballx - ballrad, bally - ballrad, 2 * ballrad, 2 * ballrad);
  ctx.fillRect(boxx - ballrad, boxy, ballrad, boxheight);
  ctx.fillRect(boxx + boxwidth, boxy, ballrad, boxheight);
  ctx.fillRect(boxx, boxy - ballrad, boxwidth, ballrad);
  ctx.fillRect(boxx, boxy + boxheight, boxwidth, ballrad);
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
