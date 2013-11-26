var ctx;
var roomx;
var roomy;
var vStatus;
var hStatus;
var lineWidth =5;
var step = 5;
var basex = 50;
var basey = 50;
var roomwidth = 200;
var roomheight = 200;
var dotrad = 10;

function init () {
	roomx = basex;
	roomy = basey;
	vStatus = 'up';
	hStatus = 'right';
	ctx = document.getElementById ('canvas').getContext ('2d');
	ctx.lineWidth = lineWidth;
	ctx.clearRect (roomx, roomy, roomwidth, roomheight);
	ctx.strokeRect (roomx, roomy, roomwidth, roomheight);
	ctx.fillStyle = '#009966';
	drawball ();
};

function start () {
	setInterval (move, 100);
};

function move () {
	clear ();
	if (vStatus === 'up') {
		jump ();
		if (roomy < basey + 3 * dotrad - roomheight)
			vStatus = 'down';
	}
	else {
		fall ();
		if (roomy > basey)
			vStatus = 'up';
	}
	
	if (hStatus === 'right') {
		goRight ();
		if (roomx > roomwidth + 2 * dotrad)
			hStatus = 'left';
	}
	else {
		goLeft ();
		if (roomx < basex)
			hStatus = 'right';
	}
	
	drawball ();
		
};

function clear () {
	ctx.clearRect (50, 50, roomwidth, roomheight);
};

function jump () {
	roomy = roomy - step;
};

function fall () {
	roomy = roomy + step;
};

function goLeft () {
	roomx = roomx - step;
};

function goRight () {
	roomx = roomx + step;
	
};

function drawball () {
	
	var ballx = roomx + dotrad + lineWidth;
	var bally = roomy + roomheight - dotrad - lineWidth;
	
	ctx.beginPath ();
	ctx.arc (ballx, bally, dotrad, 0, Math.PI * 2, false);
	ctx.closePath ();
	ctx.fill ();
}