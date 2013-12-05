var cwidth     = 600;
var cheight    = 400;
var gravity    = 1;
var iballx     = 20;
var ibally     = 300;
var everything = [];
var ctx;
var tid;
var horvelocity;
var verticalvel1;// = 25;
var verticalvel2;

var cannonx      = 10;
var cannony      = 280;
var cannonlength = 200;
var cannonht     = 20;
var ballrad      = 10;
var targetx      = 500;
var targety      = 50;
var targetw      = 85;
var targeth      = 280;
var htargetx     = 450;
var htargety     = 220;
var htargetw     = 335;
var htargeth     = 96;

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
  this.sy += dy;
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

function Picture(sx, sy, swidth, sheight, filen) {
  var imga = new Image();
  imga.src = filen;
  this.sx = sx;
  this.sy = sy;
  this.img = imga;
  this.swidth = swidth;
  this.sheight = sheight;
  this.draw = drawAnImage;
  this.moveit = moveball();
}

function drawAnImage() {
  ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight);
}

var target = new Picture(targetx, targety, targetw, targeth, 'hill.jpg');
var htarget = new Picture(htargetx, htargety, htargetw, htargeth, 'plateau.jpg');
var ground = new Myrectangle(0, 300, 600, 30, 'rgb(10, 250, 0)');
var cannon = new Myrectangle(cannonx, cannony, cannonlength, cannonht, 'rgb(40, 40, 0)');
var targetindex = everything.length;

everything.push([target, false]);
everything.push([ground, false]);

var ballindex = everything.length;
everything.push([cball, false]);
var cannonindex = everything.length;
everything.push([cannon, true, 0, cannonx, cannony + cannonht * 5]);

// var target = new Myrectangle(300, 100, 80, 200, "rgd(0,5, 90)");
// var ground = new Myrectangle(0, 300, 600, 30, "rgd(10, 250, 0)");
// everything.push(target);
// everything.push(ground);
// everything.push(cball);

function init() {
  ctx = document.getElementById('canvas').getContext('2d');
  drawall();
}

function fire() {

  var angle = Number(document.f.ang.value);
  var outofcannon = Number(document.f.vo.value);
  var angleradians = angle * Math.PI / 180;
  horvelocity = outofcannon * Math.cos(angleradians);
  verticalvel1 = -outofcannon * math.sin(angleradians);
  everything[cannonindex][2] = -angleradians;
  cball.sx = cannonx + cannonlength * Math.cos(angleradians);
  cball.sy = cannony + cannonht * 0.5 - cannonlength * math.sin(angleradians);
  drawall();
  tid = setInterval(change, 100);
  return false;


  // cball.sx = iballx;
  // cball.sy = ibally;
  // horvelocity  = Number(document.f.hv.value);
  // verticalvel1 = Number(document.f.vv.value);
  // drawall();
  // tid = setInterval(change, 100);
  // return false;
}

function drawall() {
  ctx.clearRect(0, 0, cwidth, cheight);
  var i;
  for (i = 0; i < everything.length; i++) {
    // everything[i].draw();
    var ob = everything[i];
    if (ob[1]) {
      ctx.save();
      ctx.translate(ob[3], ob[4]);
      ctx.rotate(ob[2]);
      ctx.translate(-ob[3], -ob[4]);
      ob[0].draw();
      ctx.restore();
    } else {
      ob[0].draw();
    }
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

    //
    everything.splice(targetindex, 1, [htarget, false]);
    everything.splice(ballindex, 1);
    drawall();
  }
  if (by >= ground.sy) {
    clearInterval(tid);
  }
  // console.log (by >= ground.sy, by, ground.sy, dx, dy);

  drawall();
}

