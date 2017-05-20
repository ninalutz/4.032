var mass = 1.0;
var gravity = 0.8;
var bounce = 1.0;

var numBalls = 40;
var balls1 = [];
var balls2 = [];
var minRadius = 2;
var maxRadius = 20;

function setup() {
   var color1 = color(255, 0, 0);
   var color2 = color(0, 0, 255);
   createCanvas(900, 600);
   initBalls(0, 400, 0, 600, balls1, .6, color1);
   initBalls(750, 800, 0, 600, balls2, .15, color2);

}

function initBalls(xmin, xmax, ymin, ymax, balls, grav, color){
  for(var i = 0; i < numBalls; i++)
  {
    var rad = random(minRadius, maxRadius);
    var startPosition = createVector(random(xmin, xmax), random(ymin, ymax));
    var startVelocity = createVector(random(-4, 4), random(-4, 4));
    balls[i] = new Ball(startPosition, startVelocity, rad, grav, color);
     balls[i].bounce = -1;
     balls[i].mass = rad / 5;
  }

}

function draw() {
  noStroke();
  fill(0, 5);
  rect(0,0,width,height);
  doBalls(balls1);
  doBalls(balls2);
}


function doBalls(balls){
  for(var i = 0; i < numBalls; i++)
  {
    balls[i].move();
    balls[i].display();
    checkWalls(balls[i]);
    balls[i].velocity.limit(maxRadius - balls[i].radius);
  }
  for(var i = 0; i < numBalls - 1; i++)
  {
    for(var j = i + 1; j < numBalls; j++)
    {
      spring(balls[i], balls[j]);
    }
  }
}

var Ball = function(position, velocity, radius, gravity, color){
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this.gravity = gravity;
  this.color = color;
}


Ball.prototype.move = function(){
  this.velocity.y += this.gravity;
  this.velocity.y += 0.1;
  this.position.y += this.velocity.y;
  this.position.x += this.velocity.x;
}

Ball.prototype.display= function(){
  fill(this.color);
  noStroke();
  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
}

function checkWalls(ball)
{
  if(ball.position.x + ball.radius > width)
  {
    ball.position.x = width - ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.x < ball.radius)
  {
    ball.position.x = ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.y > height - ball.radius)
  {
    ball.position.y = height - ball.radius;
    ball.velocity.y *= ball.bounce;
  }
  else if(ball.position.y < ball.radius)
  {
    ball.position.y = ball.radius;
    ball.velocity.y *= ball.bounce;
  }
}


var minDist = 200;
var springAmount = 0.00001;

function spring(ballA, ballB)
{
  var dx = ballA.position.x - ballB.position.x;
  var dy = ballA.position.y - ballB.position.y;
  var dist = sqrt(dx*dx + dy*dy);

  if(dist < minDist)
  {
    var a = createVector(dx * springAmount, dy * springAmount);

    ballA.velocity.x += a.x / ballA.mass;
    ballA.velocity.y += a.y / ballA.mass;
    ballB.velocity.x -= a.x / ballB.mass;
    ballB.velocity.y -= a.y / ballB.mass;

    strokeWeight(1);
    stroke(ballB.color, 50);
    line(ballA.position.x, ballA.position.y, ballB.position.x, ballB.position.y);

  }
}
