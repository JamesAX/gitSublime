var cwidth     = 600;
var cheight    = 400;
var gravity    = 1;
var iballx     = 20;
var ibally     = 300;
var everything = [];
var ctx;
var tid;
var horvelocity;
var verticalvel1 = 25;
var verticalvel2;

function Ball(sx, sy, rad, stylestring) {
  this.sx   = sx;
  this.sy   = sy;
  this.rad  = rad;
  this.draw = drawball;
  this.moveit    = moveball;
  this.fillstyle = stylestring;
}

function drawball() {
  ctx.fillStyle = this.fillstyle;
  ctx.beginPath();
  ctx.arc(this.sx, this.sy, this.rad, 0, Math.PI * 2, true);
  ctx.fill();
}

function moveball(dx, dy) {
  this.sx += dx;
  this.sy -= dy;
}

var cball = new Ball(iballx, ibally, 10, "rgb(250, 0, 0)");

function Myrectangle(sx, sy, swidth, sheight, stylestring) {
  this.sx = sx;
  this.sy = sy;
  this.swidth    = swidth;
  this.sheight   = sheight;
  this.fillstyle = stylestring;
  this.draw      = drawrects;
  this.moveit    = moveball;
}

function drawrects() {
  ctx.fillStyle = this.fillstyle;
  ctx.fillRect(this.sx, this.sy, this.swidth, this.sheight);
}

var target = new Myrectangle(300, 100, 80, 200, "rgd(0,5, 90)");
var ground = new Myrectangle(0, 300, 600, 30, "rgd(10, 250, 0)");
everything.push(target);
everything.push(ground);
everything.push(cball);

function init() {
  ctx = document.getElementById('canvas').getContext('2d');
  drawall();
}

function fire() {
  cball.sx = iballx;
  cball.sy = ibally;
  horvelocity  = Number(document.f.hv.value);
  verticalvel1 = Number(document.f.vv.value);
  drawall();
  tid = setInterval(change, 100);
  return false;
}

function drawall() {
  ctx.clearRect(0, 0, cwidth, cheight);
  var i;
  for (i = 0; i < everything.length; i++) {
    everything[i].draw();
  }
}

function change() {
  var dx = horvelocity;
  // verticalvel2 = verticalvel1 + gravity;
  // var dy = (verticalvel1 + verticalvel2) * 0.5;
  verticalvel2 = verticalvel1 - gravity;
  var dy = (verticalvel1 + verticalvel2) * 0.5;
  verticalvel1 = verticalvel2;
  cball.moveit(dx, dy);
  var bx = cball.sx;
  var by = cball.sy;

  if ((bx >= target.sx) && (by <= (target.sx + target.swidth)) && (by >= target.sy) && (by <= (target.sy + target.sheight))) {
    clearInterval(tid);
  }
  if (by >= ground.sy) {
    clearInterval(tid);
  }
  console.log (by >= ground.sy, by, ground.sy, dx, dy);

  drawall();
}


