var ctx;
var Canvas;
var basex = 50;
var basey = 50;
var roomwidth = 800;
var roomheight = 400;
var lineWidth = 1;


function init () {
	ctx = document.getElementById ('canvas').getContext ('2d');
	Canvas = document.getElementById ('canvas');
	ctx.lineWidth = lineWidth;
	ctx.clearRect (basex, basey, roomwidth, roomheight);
	ctx.strokeRect (basex, basey, roomwidth, roomheight);
	ctx.fillStyle = '#009966';
	
	drawBase ();
	drawBow ();
	
	
	ctx.beginPath ();
	ctx.arc (200, 450, 5, 0, Math.PI * 2, false);
	ctx.closePath ();
	ctx.fill ();
};

//First point 200, 450
//Second point 200, 250
//

function mouseTracking (evt) {

	var mousePos = getMousePos(Canvas, evt);
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//	writeMessage(Canvas, message);
	
	
	dragBowString (message.x, message.y);
	
}

function getMousePos(canvas, evt) {
    var rect = Canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function writeMessage(canvas, message) {
    ctx.clearRect(0, 0, .1 * canvas.width, .1 * canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(message, 10, 25);

  }

function dragBowString (handX, handY) {
	drawBow (handX, handY);
}

function drawBase () {
	ctx.strokeRect (50, 430, 800, 20);
	ctx.fillStyle = '#808080';
	ctx.fillRect (50, 430, 800, 20);
}

function drawBow (positionX, positionY) {
	var px = positionX === undefined ? 80 : positionX;
	var py = positionY === undefined ? 200 : positionY;;
	
	writeMessage (Canvas, px + '' + py);
	
	ctx.beginPath();
	ctx.fillStyle = '#000000';
	ctx.lineWidth = 8;
	ctx.lineJoin="round";
	ctx.moveTo (200, 450);
	ctx.lineTo (200, 250);
	
//	ctx.lineTo (positionX,positionY);
	ctx.lineTo (px, py);
	ctx.lineTo (200, 270);
	ctx.stroke ();
}