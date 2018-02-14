var cnv1 = document.getElementById("canvas");
var cnv2 = document.getElementById("graf");
var ctx1 = cnv2.getContext("2d");
var ctx = cnv1.getContext("2d");
var width = cnv1.width;
var height = cnv1.height;
var width1 = cnv2.width;
var height1 = cnv2.height;
const g = 9.8;
var i = 0;


var circle = function(x, y, r, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = "lightblue";
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function animation() {
  if (typeof anim != "undefined"){
    clearInterval(anim);
    clearInterval(log);
    ctx.clearRect(0, 0, width, height);
    i=0;
    document.getElementById('log').value ="";
	ctx1.clearRect(0, 0, width1, height1);
  }
  var x = parseInt(document.getElementById("X").value);
  var y = parseInt(document.getElementById("Y").value);
  var r = parseInt(document.getElementById("r").value);
  var dx = parseInt(document.getElementById("dx").value);
  var dy = parseInt(document.getElementById("dy").value);
  var dt = parseInt(document.getElementById("dt").value);
  var t = parseFloat(document.getElementById("t").value)*1000;
  var k = parseFloat(document.getElementById("k").value);
  var ball = new Ball(x, y, r,dx,dy,k);
  var logX = ball.x;
  var logY = ball.y;
  ctx1.beginPath();

  ctx1.strokeRect(0, 0, width1, height1);
  log = setInterval(function() {
	var ballHeight = height-ball.y-ball.r;
	ctx1.stroke();
    document.getElementById('log').value += "t"+i+": ("+logX.toFixed(1) +", "+logY.toFixed(1) +") -> ("+ball.x.toFixed(1)+", "+ball.y.toFixed(1)+")"+"   Высота "+(ballHeight.toFixed(1))+", скорость "+(Math.sqrt(Math.pow(ball.xSpeed,2)+Math.pow(ball.ySpeed,2))).toFixed(1)+"\n";
    logX=ball.x;
    logY=ball.y;
    ctx1.lineTo(logX/2,height1-(ballHeight/2));
    i++;
  },dt);
  anim = setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    ball.draw();
    ball.move();
    ball.pr();
    ball.ySpeed+=(g/4);
    ctx.strokeRect(0, 0, width, height);
  }, 30);

  setTimeout(function() {
      clearInterval(anim);
      clearInterval(log);
	  i=0;
  }, t);
  }

class Ball {
  constructor(x, y, r,dx,dy,k) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = dx;
    this.ySpeed = dy;
    this.k=k;
  }

  draw() {circle(this.x, this.y, this.r, true);}

  move() {this.x += this.xSpeed; this.y += this.ySpeed;}

  pr() {
    if ((this.x + this.r) > width){
      this.x=width-this.r;
      this.xSpeed = -this.xSpeed;
      this.ySpeed*=this.k;
      this.xSpeed*=0.5;
    }
    if (this.y - this.r < 0)  {
      this.y=this.r;
      this.ySpeed = -this.ySpeed;
      this.ySpeed*=this.k;
    }
    if ((this.x - this.r) < 0) {
          this.x=this.r;
          this.xSpeed = -this.xSpeed;
          this.ySpeed*=this.k;
          this.xSpeed*=0.5;
        }
    if ((this.y + this.r) > height){
      this.y=height-this.r;
      this.ySpeed = -this.ySpeed;
      this.ySpeed*=this.k;
    }
  }
}