var PHI = (1 + 2.236067977)/2;
var balls;
var counter = 0;
var curmin;
var minsize = 5;
var hrsize = 10;
var clockrad = 260;
var hrrad = 50;
var start;

function setup() {
  createCanvas(400, 400);
  start = second();

  balls = [];

  ellipseMode(CENTER);
  frameRate(30);

}

function draw() {
  background(150);

  var angle = -90;

  for(var i = 1; i<61; i++){
    fill(0);
    stroke(0);
    angle+= 360.0/60;

    if(i % 5 === 0){
      hrsize = 10;
      if(i/5 == hour()%12 || (i == 60 && hour() === 0)){
        stroke(255);
        fill(255);
        hrsize = 20;
      }
       ellipse(hrrad*cos(radians(angle)) + width/2, hrrad*sin(radians(angle)) + height/2, hrsize, hrsize);
    }
      if(i == minute()){
        curmin = createVector(clockrad/2*cos(radians(angle)) + width/2, clockrad/2*sin(radians(angle)) + height/2);
      }
    if(i> minute()){
        fill(0);
        stroke(0);
      }
      else{
        fill(255);
        stroke(255);
      }
      ellipse(clockrad/2*cos(radians(angle)) + width/2, clockrad/2*sin(radians(angle)) + height/2, minsize, minsize);
  }

  stroke(255);
  fill(255);

for (i = balls.length - 1; i >= 0; i--)
  {
    var b = balls[i];
    b.move(i, balls);
    fill(255);
    b.display();
  }

  if(second() != start){
    start = second();
    balls = [];
    counter = 0;
  }

    counter++;

  if(second() !==0){
  b = new Ball(random(5, 20), counter*PHI*TAU, curmin);
  balls.push(b);
  }


  fill(255);

}


var Ball = function(diameter, angle, center){
  this.diameter = diameter;
  this.center = center.copy();
  this.angle = center.copy();
  this.pos = center.copy();
  this.dir = createVector(cos(angle), sin(angle));
}

Ball.prototype.move = function(id, balls){
  for(var i = id+1; i<balls.length -1; i++){
    var b = balls[i];
    var distance = p5.Vector.dist(this.pos, balls[i].pos);
    if ( distance < 12){
      this.pos.add(this.dir);
    }
  }
}

Ball.prototype.display = function(){
  ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  textSize(this.diameter*.75);
  fill(0);
  textAlign(CENTER, CENTER);
  text(second(), this.pos.x, this.pos.y+this.diameter/20);

}
