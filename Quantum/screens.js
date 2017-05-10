function Intro(){
  // background(50, 50, 60);
  fill(255);
  text("Press space bar to go through the project.", 100, 70);
  text("In classical physical a particle has mass, position, and velocity.", 100, 100);

  ellipse(width/2, height/2, 100, 100);
}
var thingy = 0;
var thingx = 0;
function Slide1(){
  noStroke();
  fill(255, 0, 0);
  ellipse(width/3 + thingx, 0 + thingy, 100, 100);
  fill(255);

  text("And while these change, we can still measure and know all of them at once.", 100, 100);
  thingx += 3;
  thingy += 3;
}

//All the things for quantum
function Slide2(){
  //Modified fork of KaijinQ's WavesOnSphere
  var redAmnt = 125;
  var blueAmnt = 205;
  var greenAmnt = 125;

  if(second() % 5 == 0){
    disturbX = 500;
    disturbY = 200;
    disturbance();
  }
  push();
  translate(0, random(-10, 10));
  for (N = 0 ; N <= Nmax ; N++ ){
     for (NN = N+1 ; NN <= Nmax ; NN++ ){
       L = sqrt(((X[N]-X[NN])*(X[N]-X[NN]))+((Y[N]-Y[NN])*(Y[N]-Y[NN]))) ;
       L = sqrt(((Z[N]-Z[NN])*(Z[N]-Z[NN]))+(L*L)) ;
        if ( L < R ){
          X[N] = X[N] - ((X[NN]-X[N])*((R-L)/(2*L))) ;
          Y[N] = Y[N] - ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
          Z[N] = Z[N] - ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
          X[NN] = X[NN] + ((X[NN]-X[N])*((R-L)/(2*L))) ;
          Y[NN] = Y[NN] + ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
          Z[NN] = Z[NN] + ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
          dV[N] = dV[N] + ((V[NN]-V[N])/M) ;
          dV[NN] = dV[NN] - ((V[NN]-V[N])/M) ;
          stroke(redAmnt+(Z[N]/2),greenAmnt+(Z[N]/2),blueAmnt+(Z[N]/2));
          line(X[N]*1.2*(200+V[N])/200+300, 50 + Y[N]*1.2*(200+V[N])/200+300,X[NN]*1.2*(200+V[NN])/200+300, 50 + Y[NN]*1.2*(200+V[NN])/200+300) ;

        }
        pop();
        if ( Z[N] > Z[NN] ){
          KX = X[N] ; KY = Y[N] ; KZ = Z[N] ; KV = V[N] ; KdV = dV[N] ;
          X[N] = X[NN] ; Y[N] = Y[NN] ; Z[N] = Z[NN] ; V[N] = V[NN] ; dV[N] = dV[NN] ;
          X[NN] = KX ; Y[NN] = KY ; Z[NN] = KZ ; V[NN] = KV ; dV[NN] = KdV ;
        }
     }
     L = sqrt((X[N]*X[N])+(Y[N]*Y[N])) ;
     L = sqrt((Z[N]*Z[N])+(L*L)) ;
     X[N] = X[N] + (X[N]*(200-L)/(2*L)) ;
     Y[N] = Y[N] + (Y[N]*(200-L)/(2*L)) ;
     Z[N] = Z[N] + (Z[N]*(200-L)/(2*L)) ;
     KZ = Z[N] ; KX = X[N] ;
     var rotX = width/2 + second();
     var rotY = height/2 + second();
     Z[N] = (KZ*cos(float(300-rotX)/10000))-(KX*sin(float(300-rotX)/10000)) ;
     X[N] = (KZ*sin(float(300-rotX)/10000))+(KX*cos(float(300-rotX)/10000)) ;
     KZ = Z[N] ; KY = Y[N] ;
     Z[N] = (KZ*cos(float(300-rotY)/10000))-(KY*sin(float(300-rotY)/10000)) ;
     Y[N] = (KZ*sin(float(300-rotY)/10000))+(KY*cos(float(300-rotY)/10000)) ;
     dV[N] = dV[N] - (V[N]*HH) ;
     V[N] = V[N] + dV[N] ; dV[N] = dV[N] * H ;
  }

  noStroke();
  fill(255);
  textAlign(LEFT);
  text("Quantum is totally different.", width/2 + 50, height/3);
  text("A particle's mass, velocity, position, and state are uncertain.", width/2 + 50, height/3 + 100);
}
var Nmax = 400;
var M = 50;
var H = .99;
var HH = .01;

var X = [];
var Y = [];
var Z = [];
var V = [];
var dV = [];
var L, Lmin, N, i, KX, KV, NN, KdV, K, KZ, KY;
var R;
var disturbX, disturbY = 0;

function initWaves(){
  R = 2*sqrt((4*PI*(200*200)/Nmax)/(2*sqrt(3)));
  for(N = 0; N< Nmax; N++){
    X[N] = random(-400,400);
    Y[N] = random(-400,400);
    Z[N] = random(-400,400);
    V[N] = 0;
    dV[N] = 0;
  }
}
var xaxis = 50;
var turned = false;
function Slide3(){
  text("A qubit is a quantum particle that represents a bit of information with two states, like a coin.", 100, 100);
  drawQubit(400);
}

function drawQubit(rad){
  blendMode(ADD);
  [0,1,2,3,4,5].forEach((i)=>{
    var p = Math.cos((frameCount+i/6)/10);
    if(p<0){
      fill(0, 0, 255,255/6);
    }
    else{
      fill(255, 0, 0,255/6);
    }
      noStroke();
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5),rad);

      noFill();
      stroke(100,255/6);
      strokeWeight(10);
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5)+10,rad+10);

      noStroke();
      fill(255);
  })
  blendMode(BLEND);
}
function Slide4(){
  //background(50, 50, 60);
  var cubheight = 150;

  image(cube, width/4, 100, 500, 500);
  stroke(100);
  strokeWeight(6);
  fill(255, 0, 0);
  ellipse(546, 366, 100, 100);
  fill(255);
  noStroke();
  text("Qubits are prepared in a state.", 100, 100);

}
var rightDoor = false;
var leftDoor = false;
var topDoor = false;
var num = false;
function Slide5(){
  textAlign(LEFT);
    image(cubeclosed, width/4, 200, 400, 400);
    fill(255);
  text("But depending on how you access them, the states vary.", 100, 100);
  text("Your qubit started in a red state, click the left and right sides and see what state it turns into.", 100, 140);
  text("Click this side to find out more!", 498 - 120 ,276);
  stroke(100);
  strokeWeight(6);

  if(rightDoor){
    fill(255, 0, 0);
    ellipse(965, 356, 150, 150);
  }
  if(leftDoor){
    if(num){
    fill(0, 0, 255);
    ellipse(965, 356, 150, 150);
  }
  else{
    fill(255, 0, 0);
    ellipse(965, 356, 150, 150);
  }
  }
      noStroke();
  if(topDoor){
    text("When you observe the qubit in the right door, \nit's always red.", 750, 250);
    text("But in the left door, 50% of the time it's red, \n50% of the time it's blue.", 750, 330);
    text("This is becuase of the uncertainty in quantum. \nStates are probabilities.", 750, 410);
    push();
    translate(350, 160);
    drawQubit(180);
    pop();
  }

}

function Slide6(){
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("As you can see, a qubit can be in multiple states at once...\nso what does this mean in a computer?", width/2, height/2-20);
  textSize(20);
  textAlign(LEFT);
}

function Slide7(){
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("Computers rely on performing lots of simple logic to complete complex tasks.", width/2, height/2-20);
  text("Logic is done by gates, which are electronics that perform logic inside a computer.", width/2, height/2 + 40);
  textSize(20);
  textAlign(LEFT);
}

function Slide8(){
  fill(255);
  text("This is a OR gate.", 100, 100);
  text("Its inputs are high and low electric signals, which we represent with 1s and 0s", 100, 130);
  text("The OR gate determines if either A or B is equal to 1, and returns 1 if yes, 0 if no", 100, 160);
  text("Didn't have time to code this up. Here's a sketch. It's basically animated circles going through gates.", 100, 190);
  image(slide8, 100, 200, width-200, height - 200);
}

function Slide9(){
  text("This is what a simple expression x = 7 + 8 would look like in a digital circuit", 100, 100);
  text("Didn't have time to code this up. Here's a sketch. It's basically animated circles going through gates.", 100, 130);
  image(slide9, 100, 200, width-200, height - 200);
}

function Slide10(){
  text("This is what it would look like on a quantum circuit.\n You need less qubits than gates because they can be in multiple states at once.", 100, 100);
  text("Didn't have time to code this up. Here's a sketch. It's basically animated circles going through gates.", 100, 160);
  image(slide10, 100, 200, width-200, height - 200);
}

function Slide11(){
  push();
  translate(-200, 0);
  drawQubit(200);
  pop();
  push();
  translate(200, 0);
  drawQubit(200);
  pop();
  noStroke();
  fill(255);
  text("Qubits can also be entangled with one another. Meaning that they can be linked at any distance. \nIf you modify one, the other is also instantly modified. \nThis is one of the many ways we can cut repeated logic in quantum computing.", 100, 100);
}

function Slide12(){
  fill(0, 50);
  noStroke();
  rect(0,0,width,height);
  doBalls(balls1, balls1num);
  push();
  translate(width/2, 0)
  doBalls(balls2, balls2num);
  pop();
  fill(255);
  textAlign(CENTER);
  text("Imagine more complex code on a quantum and traditional computer.", width/2, 50);
  textAlign(LEFT);
  fill(210);
  text("Qubits cut down on logic and bits to express information.\nCode finishes execution millions of times faster\nand is more efficient with data.", 50, 100);
}

function Slide13(){
  var redAmnt = 150;
  var blueAmnt = 0;
  var greenAmnt = 0;

  if(second() % 10 == 0){
    disturbX = 500;
    disturbY = 200;
    disturbance();
  }
  push();
  for (N = 0 ; N <= Nmax ; N++ ){
     for (NN = N+1 ; NN <= Nmax ; NN++ ){
       L = sqrt(((X[N]-X[NN])*(X[N]-X[NN]))+((Y[N]-Y[NN])*(Y[N]-Y[NN]))) ;
       L = sqrt(((Z[N]-Z[NN])*(Z[N]-Z[NN]))+(L*L)) ;
      //  console.log(X[N], V[N])
      //V[N] == NaN
        if ( L < R ){
          X[N] = X[N] - ((X[NN]-X[N])*((R-L)/(2*L))) ;
          Y[N] = Y[N] - ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
          Z[N] = Z[N] - ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
          X[NN] = X[NN] + ((X[NN]-X[N])*((R-L)/(2*L))) ;
          Y[NN] = Y[NN] + ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
          Z[NN] = Z[NN] + ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
          dV[N] = dV[N] + ((V[NN]-V[N])/M) ;
          dV[NN] = dV[NN] - ((V[NN]-V[N])/M) ;

          // stroke(225+(Z[N]/2),125+(Z[N]/2),125+(Z[N]/2));
            stroke(redAmnt+(Z[N]/2),greenAmnt+(Z[N]/2),blueAmnt+(Z[N]/2));
              strokeWeight(1);
          line(300 + X[N]*1.2*(200+V[N])/200+300, 50 + Y[N]*1.2*(200+V[N])/200+300,300 + X[NN]*1.2*(200+V[NN])/200+300, 50 + Y[NN]*1.2*(200+V[NN])/200+300) ;

        }
        pop();
        if ( Z[N] > Z[NN] ){
          KX = X[N] ; KY = Y[N] ; KZ = Z[N] ; KV = V[N] ; KdV = dV[N] ;
          X[N] = X[NN] ; Y[N] = Y[NN] ; Z[N] = Z[NN] ; V[N] = V[NN] ; dV[N] = dV[NN] ;
          X[NN] = KX ; Y[NN] = KY ; Z[NN] = KZ ; V[NN] = KV ; dV[NN] = KdV ;
        }
     }
     L = sqrt((X[N]*X[N])+(Y[N]*Y[N])) ;
     L = sqrt((Z[N]*Z[N])+(L*L)) ;
     X[N] = X[N] + (X[N]*(200-L)/(2*L)) ;
     Y[N] = Y[N] + (Y[N]*(200-L)/(2*L)) ;
     Z[N] = Z[N] + (Z[N]*(200-L)/(2*L)) ;
     KZ = Z[N] ; KX = X[N] ;
     var rotX = width/2 + second();
     var rotY = height/2 + second();
     Z[N] = (KZ*cos(float(300-rotX)/10000))-(KX*sin(float(300-rotX)/10000)) ;
     X[N] = (KZ*sin(float(300-rotX)/10000))+(KX*cos(float(300-rotX)/10000)) ;
     KZ = Z[N] ; KY = Y[N] ;
     Z[N] = (KZ*cos(float(300-rotY)/10000))-(KY*sin(float(300-rotY)/10000)) ;
     Y[N] = (KZ*sin(float(300-rotY)/10000))+(KY*cos(float(300-rotY)/10000)) ;
     dV[N] = dV[N] - (V[N]*HH) ;
     V[N] = V[N] + dV[N] ; dV[N] = dV[N] * H ;

  }
  fill(0, 70);
  noStroke();
    // rect(0, 0, width, height);
  noStroke();
  fill(255);
    textSize(30);
  text("Quantum computers can handle more than traditional computers, like adding large\nnumbers normal computers can't. This could be used in computer security. \n\nQuantum computing can also simulate physical and biological systems traditional\ncomputers can't. Imagine what we could discover. ", 70, 250);
  fill(0, 50);

}

function disturbance(){
  Lmin = 300 ; i = 0 ;
  stroke(10+(Z[N]/2),125+(Z[N]/2),225+(Z[N]/2));
  for ( N = 0 ; N <= Nmax ; N++ ){
     L = sqrt(((disturbX-(300+X[N]))*(disturbX-(300+X[N])))+((disturbY-(300+Y[N]))*(disturbY-(300+Y[N])))) ;
     if ( Z[N] > 0 && L < Lmin ){i = N ; Lmin = L ; }
  }
  if ( K == 0 ){ dV[i] = -200 ; K = 1 ; }
           else{ dV[i] = +200 ; K = 0 ; }
}

var balls1num = 30;
var balls2num = 60;
function keyPressed(){
  if (key == ' '){
    switchthing += 1;

  if(switchthing == 12){
    var color1 = color(255, 0, 0);
    var color2 = color(0, 0, 255);
      initBalls(width/2 - 20, height, 50, 10, balls1, .5, color1, balls1num);
      initBalls(width/2 - 20, height, 50, 10, balls2, .05, color2, balls2num);
    }
    if(switchthing > 13){
      switchthing = 0;
    }
    initSwitches();
    switchtimes[switchthing] = true;
  }
}

function mousePressed(){
  if(mouseX < 697 && mouseX > 489 && mouseY < 586 && mouseY > 360){
    rightDoor = true;
    leftDoor = false;
    topDoor = false;
  }
  if(mouseX < 493 && mouseX > 312 && mouseY < 597 && mouseY > 268){
    leftDoor = true;
    rightDoor = false;
    topDoor = false;
    num = !num;
  }
  if(mouseX < 697 && mouseX > 317 && mouseY < 352 && mouseY > 202){
    leftDoor = false;
    rightDoor = false;
    topDoor = true;
  }
}

var mass = 1.0;
var gravity = 0.8;
var bounce = 1.0;

// var numBalls = 40;
var balls1 = [];
var balls2 = [];
var minRadius = 2;
var maxRadius = 20;
//width/2, height, 50, width,
function initBalls(xmax, ymax, ymin, xmin, balls, grav, color, numBalls){
  for(var i = 0; i < numBalls; i++)
  {
    var rad = random(minRadius, maxRadius);
    var startPosition = createVector(random(xmin, xmax), random(ymin, ymax));
    var startVelocity = createVector(random(-4, 4), random(-4, 4));
      balls[i] = new Ball(startPosition, startVelocity, rad, grav, color,  xmax, ymax, ymin, xmin);
     balls[i].bounce = -1;
     balls[i].mass = rad / 5;
  }

}


function doBalls(balls, numBalls){
  // for(var i = 0; i < numBalls; i++)
  // {
  //   balls[i].move();
  //   balls[i].display();
  //   checkWalls(balls[i]);
  //   balls[i].velocity.limit(maxRadius - balls[i].radius);
  // }
  for(var i = 0; i < numBalls - 1; i++)
  {
    for(var j = i + 1; j < numBalls; j++)
    {
      bounceBalls(balls[i], balls[j]);
    }
  }
  for(var i = 0; i < numBalls; i++)
  {
    balls[i].move();
    balls[i].display();
    checkWalls(balls[i]);
    balls[i].velocity.limit(maxRadius - balls[i].radius);
  }
}

var Ball = function(position, velocity, radius, gravity, color, xmax, ymax, ymin, xmin){
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this.gravity = gravity;
  this.color = color;
  this.xmax = xmax;
  this.xmin = xmin;
  this.ymax = ymax;
  this.ymin = ymin;
}


Ball.prototype.move = function(){
  this.velocity.y += this.gravity;
  this.velocity.y += 0.1;
  this.position.y += this.velocity.y;
  this.position.x += this.velocity.x;
}

Ball.prototype.display= function(){
  fill(this.color);
  stroke(20)
  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
}

function checkWalls(ball)
{
  if(ball.position.x + ball.radius > ball.xmax)
  {
    ball.position.x = ball.xmax - ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.x < ball.xmin - ball.radius)
  {
    ball.position.x = ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.y > ball.ymax - ball.radius)
  {
    ball.position.y = ball.ymax - ball.radius;
    ball.velocity.y *= ball.bounce;
  }
  else if(ball.position.y < ball.ymin - ball.radius)
  {
    ball.position.y = ball.radius;
    ball.velocity.y *= ball.bounce;
  }
}


var minDist = 200;
var bounceBallsAmount = 0.00001;

function bounceBalls(ballA, ballB){
  var dx = ballA.position.x - ballB.position.x;
  var dy = ballA.position.y - ballB.position.y;
  var dist = sqrt(dx*dx + dy*dy);

  if(dist < minDist)
  {
    var a = createVector(dx * bounceBallsAmount, dy * bounceBallsAmount);

    ballA.velocity.x += a.x / ballA.mass;
    ballA.velocity.y += a.y / ballA.mass;
    ballB.velocity.x -= a.x / ballB.mass;
    ballB.velocity.y -= a.y / ballB.mass;

    strokeWeight(3*ballA.radius/maxRadius);
    stroke(ballB.color, 20);
    line(ballA.position.x, ballA.position.y, ballB.position.x, ballB.position.y);

  }
  noStroke();
}
