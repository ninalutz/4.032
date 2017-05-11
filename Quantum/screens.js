function Intro(){
  Slide11();

}

var movers = [];
function Slide1(){
  for (var i = 0; i < movers.length; i++) {
      // Gravity is scaled by mass here!
      var gravity = createVector(0, 0.05*movers[i].mass);
      // Apply gravity
      movers[i].applyForce(gravity);

      // Update and display
      movers[i].update();
      movers[i].display();
      movers[i].checkEdges();
}
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(35);
  text("In classical mechanics particles have mass, position, and velocity.", width/2, 120);
  textAlign(LEFT);
}

function reset(){
  for (var i = 0; i < 20; i++) {
    movers[i] = new Mover(random(0.2, 3), width/5+40+i*55, 150);
  }
}

function Mover(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Mover.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

Mover.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  stroke(255);
  strokeWeight(1);
  fill(255);
  ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

// Bounce off bottom of window
Mover.prototype.checkEdges = function() {
  if (this.position.y > (700 - this.mass*8)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= -0.9;
    this.position.y = (700 - this.mass*8);
  }
};


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
  var xoffset = 200;
  var yoffset = 200;
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
          line(xoffset + X[N]*1.2*(200+V[N])/200+300, yoffset + Y[N]*1.2*(200+V[N])/200+300,xoffset + X[NN]*1.2*(200+V[NN])/200+300, yoffset + Y[NN]*1.2*(200+V[NN])/200+300) ;

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
  push();
  translate(100, 20);
  fill(255);
  textAlign(LEFT);
  textSize(35);
  text("Quantum mechanics are different.", width/2 + 50, height/3);
  text("A particle's mass, velocity, position,\nand state are uncertain.", width/2 + 50, height/3 + 70);
  text("A particle can be in any state\nor multiple states at the same time.", width/2 + 50, height/3 + 180)
  pop();
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
  textAlign(CENTER);
    textSize(35);
  text("A qubit is a quantum particle that represents a bit of information with two states, like a coin.", width/2, 120);
  drawQubit(400);
}

function drawQubitEn(rad){
  for(var i = 0; i < 6; i++){
    var p = Math.cos((frameCount+i/6)/10);
    var n = Math.cos((frameCount+i/6)/10);
    if(p<0){
      fill(lerpColor(color(255, 0, 0),color(0, 0, 255), p/-2));
    }
    else{
      fill(lerpColor(color(255, 0, 0),color(0, 0, 255), p));
    }
      noStroke();
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5),rad);

      noFill();
      stroke(225,255/6);
      strokeWeight(1);
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5)+3,rad+3);

      strokeWeight(1);
      stroke(255);
      ellipse(width/2, height/2 + 50 ,max(abs(n*rad),5)+3,rad+3);

      noStroke();
      fill(255);
  }

}

function drawQubit(rad){
  //blendMode(ADD);
  for(var i = 0; i < 6; i++){
    var p = Math.cos((frameCount+i/6)/10);
    var n = Math.cos((frameCount+i/6)/10);
    if(p<0){
      fill(0, 0, 255);
    }
    else{
      fill(255, 0, 0);
    }
      noStroke();
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5),rad);

      noFill();
      stroke(225);
      strokeWeight(1);
      ellipse(width/2, height/2 + 50 ,max(abs(p*rad),5)+3,rad+3);

      strokeWeight(1);
      stroke(255);
      ellipse(width/2, height/2 + 50 ,max(abs(n*rad),5)+5,rad+5);

      noStroke();
      fill(255);
  }
  //blendMode(BLEND);
}
var rightDoor = false;
var leftDoor = false;
var topDoor = false;
var num = false;
var prep = -300;
//686, 364
function Slide4(){
  // image(cube, width/4, 100, 500, 500);
  console.log(prep);
  //if(prep >= 50){
    image(cube, width/4, 100, 500, 500);
  //}
  if(prep < 695-546){
      fill(255, 0, 0);
      strokeWeight(2);
      stroke(255);
     ellipse(546 + prep, 364, 100, 100);
    prep+=2;
  }
    // ellipse(546 + prep, 364, 100, 100);
  if(prep < 50){
    image(cube, width/4, 100, 500, 500);
  }

  if(prep >= 695-546){
    push();
    translate(-240, -200);
    drawQubitEn(100);
    pop();
    fill(255);
    textSize(30);
    noStroke();
    push();
    translate(50, 0);
    text("Click the left and right sides of the cube\nand see what state you observe.", width/2 + 100, 120);
    textSize(40);
    noFill();
    stroke(255);
    rect(width/2 + 80, 600-55, 440, 90, 20, 20, 20, 20);
    noStroke();
    fill(255);
    text("Why is this happening?", width/2 + 100, 600);
    pop();
  }

  fill(255);
  textSize(30);
  noStroke();
  text("Qubits are prepared in a state.", 100, 120);
  text("Here we start in a red state.", 100, 160);
  stroke(255);
  if(rightDoor){
    fill(255, 0, 0);
    ellipse(width-500, 356, 150, 150);
  }
  if(leftDoor){
    if(num){
    fill(0, 0, 255);
    ellipse(width-500, 356, 150, 150);
  }
  else{
    fill(255, 0, 0);
    ellipse(width-500, 356, 150, 150);
  }
  }
      noStroke();
  if(topDoor){
    push();
    translate(-600, 400);
    text("From the right side, the qubit is always red.\n\nFrom the left, 50% of the time it's red, 50% of the time it's blue.", 700, 300);
    text("This is becuase of the uncertainty in quantum.\n\nThe qubit can be both red and blue at the same time,\nbut we can only observe one at a time.\n\nEach state is equally likely to be observed.", 1680, 300);
    pop();
  }

}

function Slide6(){
  fill(255);
  textAlign(CENTER);
  textSize(50);
  text("As you can see, a qubit can be in multiple states at once...\nso what does this mean in a computer?", width/2, height/2-20);
  textSize(20);
  textAlign(LEFT);
}

function Slide7(){
  fill(255);
  textAlign(CENTER);
  // textSize(30);
  drawCircuit();
  fill(255);
  noStroke();
  push();
  translate(0, -30);
  textSize(45);
  text("Computers rely on performing lots of simple logic to complete complex tasks.\nElectricity flows thorugh circuits that convert voltage to binary.\nBinary is assembled into logic to carry out tasks.", width/2, height/2);
  textSize(20);
  textAlign(LEFT);
  pop();
 }

var A1 = 0;
var B1 = 0;
var C1 = 10;
var D1 = 10;
var E1 = -15;
var goingdown = true;
var goingup = false;
var goingdownA = false;
var goingupA = true;
var goingdownC = false;
var goingupC = true;
var goingdownD = false;
var goingupD = true;
var goingdownE = false;
var goingupE = true;
function Slide8(){
  textSize(35);
  textAlign(CENTER);
  noStroke();
  text("Information goes through quantum circuits differently.\nThe circuit is simpler and smaller becuase the qubits can hold multiple states or be in the same state at once.", width/2, 100);
  stroke(255);
  push();
  translate(40, 0);
   line(544, 300, 544, height-100);
   line(780, 300, 780, height-100);
   line(961, 300, 961, height-100);
   line(1215, 300, 1215, height-100);
  noStroke();

  push();
  translate(-160, B1);
  // stroke(255);
  // line(50, 50, 50, 100);
  if(goingdown){
    B1 += 1;
  }
  else if (goingup){
    B1 -= 1;
  }

  if(B1 == 100){
    goingup = !goingup;
    goingdown = !goingdown;
  }

  if(B1 == -170){
    goingup = !goingup;
    goingdown = !goingdown;
  }
  drawQubit(100);
  pop();

  push();
  translate(20, C1);
  if(goingdownC){
    C1 += 4;
  }
  else if (goingupC){
    C1 -= 2;
  }

  if(C1 == 50){
    goingupC = !goingupC;
    goingdownC = !goingdownC;
  }

  if(C1 == -190){
    goingupC = !goingupC;
    goingdownC = !goingdownC;
  }
  drawQubitEn(100);
  pop();

  push();
  translate(275, D1);
  if(goingdownD){
    D1 += 2;
  }
  else if (goingupD){
    D1 -= 10;
  }

  if(D1 == 250){
    goingupD = !goingupD;
    goingdownD = !goingdownD;
  }

  if(D1 == -100){
    goingupD = !goingupD;
    goingdownD = !goingdownD;
  }
  drawQubit(100);
  pop();

  push();
  translate(-400, A1);
  if(goingdownA){
    A1 += 1;
  }
  else if (goingupA){
    A1 -= 1;
  }

  if(A1 == 200){
    goingupA = !goingupA;
    goingdownA = !goingdownA;
  }

  if(A1 == -190){
    goingupA = !goingupA;
    goingdownA = !goingdownA;
  }
  drawQubitEn(100);
  pop();
  pop();
}

function Slide9(){
  // push();
  // translate(-200, 0);
  // drawQubit(200);
  // pop();
  // push();
  // translate(200, 0);
  // drawQubit(200);
  // pop();
  drawEntangle();
  noStroke();
  fill(255);
  textSize(35);
  textAlign(CENTER);
  text("Qubits can also be entangled with one another, meaning linked at any distance.\nIf you modify one, the other is instantly modified too. \n\nThis is one of the many ways we can minimize logic and storage space in quantum computers.", width/2, 120);
}

function drawEntangle(){
  push();
  translate(-200, 0);
  drawQubitEn(200);
  pop();
  push();
  translate(200, 0);
  drawQubitEn(200);
  pop();
}


function Slide10(){
  fill(27, 28, 30, 50);
  noStroke();
  rect(0,0,width,height);
  doBalls(balls1, balls1num);
  push();
  translate(width/2, 0)
  doBalls(balls2, balls2num);
  pop();
  fill(255);
  textAlign(CENTER);
  textSize(35);
  text("Imagine more complex code on a quantum and traditional computer.", width/2, 100);
  textAlign(LEFT);
  textSize(30);
  fill(240);
  text("Qubits cut down on logic and bits to express information.\nCode finishes execution millions of times faster\nand is more efficient with data.", 50, 180);
  text("Meanwhile, in traditional computer logic takes much longer\nand more data to execute stepsbecause it much be done\nwith single state bits and circuits.", width - 850, 180);
}

function Slide11(){
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
          line(width/3 + X[N]*1.2*(200+V[N])/200+300, 200 + Y[N]*1.2*(200+V[N])/200+300, width/3 + X[NN]*1.2*(200+V[NN])/200+300, 200 + Y[NN]*1.2*(200+V[NN])/200+300) ;

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
  fill(0, 10);
  rect(0, 0, width, height);
  fill(255);
  push();

  textAlign(CENTER);
  textSize(30);
  text("Introducing the possibilities.", width/2, height/2 + 100);
    textSize(90);
  text("Quantum Computing.", width/2, height/2);
  textSize(30);
  text("Nina M. Lutz", 200, height-100);
  pop();
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
var vec1, vec2;
function initElec(){
  vec1 = createVector(random(width), random(height));
  vec2 = createVector(1, 1);
  guide = new photon(vec1, vec2);
  guide.col = color(255);
  guide.vel.mult(1.5);
  guide.radius = 10;

  for(var i = 0; i<n; i++){

    var dir = createVector(1, 0);
    dir.rotate(i * (float(PI/4)));
    var vec3 = createVector(width/2, height/2)
    var t = new photon(vec3, dir);
    t.col = color(58, 196, 88);
    t.focus = createVector(width,height);
    t.radius = 1 + random(1);
    t.focus = guide.pos;
    p.push(t);
  }
}
function keyPressed(){
  reset();

  if (key != ' '){
    console.log(mouseX, mouseY);
  }
  if (key == ' '){
    switchthing += 1;

  if(switchthing == 9){
    var color1 = color(255, 0, 0);
    var color2 = color(0, 0, 255);
      initBalls(width/2 - 20, height-20, 220, 20, balls1, .7, color1, balls1num);
      initBalls(width/2 - 20, height-20, 220, 20, balls2, .02, color2, balls2num);
    }
    if(switchthing == 6){
      fill(27, 28, 30);
      rect(0, 0, width, height);
      initElec();
    }
    if(switchthing > 9){
      switchthing = 0;
    }
    initSwitches();
    switchtimes[switchthing] = true;
  }
}

function mousePressed(){
  reset();
    if(mouseX < width && mouseX > width-100 && mouseY < 100 && mouseY > 0){
      switchthing += 1;

    if(switchthing == 9){
      var color1 = color(255, 0, 0);
      var color2 = color(0, 0, 255);
        initBalls(width/2 - 20, height-20, 220, 20, balls1, .7, color1, balls1num);
        initBalls(width/2 - 20, height-20, 220, 20, balls2, .02, color2, balls2num);
      }
      if(switchthing == 6){
        fill(27, 28, 30);
        rect(0, 0, width, height);
        initElec();
      }
      if(switchthing > 9){
        switchthing = 0;
      }
      initSwitches();
      switchtimes[switchthing] = true;
    }
  else  if(mouseX < 100 && mouseX > 0 && mouseY < 100 && mouseY > 0){
      switchthing -= 1;

    if(switchthing == 9){
      var color1 = color(255, 0, 0);
      var color2 = color(0, 0, 255);
        initBalls(width/2 - 20, height-20, 220, 20, balls1, .7, color1, balls1num);
        initBalls(width/2 - 20, height-20, 220, 20, balls2, .02, color2, balls2num);
      }
      if(switchthing == 6){
        fill(27, 28, 30);
        rect(0, 0, width, height);
        initElec();
      }
      if(switchthing > 9){
        switchthing = 0;
      }
      // if(switchthing < 0){
      //   switchthing = 9;
      // }
      initSwitches();
      switchtimes[switchthing] = true;
    }
  else if(mouseX < 910 && mouseX > 788 && mouseY < 526 && mouseY > 165){
    rightDoor = true;
    leftDoor = false;
    topDoor = false;
  }
  else if(mouseX < 697 && mouseX > 537 && mouseY < 532 && mouseY > 160){
    leftDoor = true;
    rightDoor = false;
    topDoor = false;
    num = !num;
  }

else if(mouseX < 1502 && mouseX > 1080 && mouseY < 635 && mouseY > 550){
    leftDoor = false;
    rightDoor = false;
    topDoor = true;
  }
  else{
    leftDoor = false;
    rightDoor = false;
    topDoor = false;
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
    fill(27, 28, 30);
    noStroke();
    rect(0, 0, width, 120);
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
  fill(red(this.color), green(this.color), blue(this.color), map(this.position.y,0,height,255,100));
  stroke(255, map(this.position.y,0,height,20,255));
  // strokeWeight(1);
  noStroke();
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
    // stroke(ballB.color, 20);
    stroke(100, 100, 100, map(ballA.position.y,0,height, 200,50));
    line(ballA.position.x, ballA.position.y, ballB.position.x, ballB.position.y);

  }
  noStroke();
}

var n = 70;
var guide;
var p = [];
function drawCircuit(){
  fill(27, 28, 30, 20);
  rect(0, 0, width, height);
  for(var i = 0; i< n; i++){
    var t = p[i];
    t.display();
    t.update();
  }
}


var photon = function(pos, dir){
  this.c = 8;
  this.radius = 1;
  this.old = pos;
  this.pos = pos;
  dir.normalize();
  dir.mult(this.c);
  this.vel = dir;
  this.col;
  this.focus;
  this.visible = true;
  this.countr = 0;
  this.countl = 0;
  this.countmin = 5;
  this.oneHit = false;

  this.update = function(){
    this.countr+=1;
    this.countl+=1;

    if(this.pos.x < this.radius){
      this.pos.x = this.radius;
      this.vel.x *= -1;
      this.visible = !(this.visible | this.oneHit);
    }
   if(this.pos.x > width-this.radius){
      this.pos.x = width - this.radius;
      this.vel.x *= -1;
      this.visible = !(this.visible | this.oneHit);
    }

  if(this.pos.y < this.radius){
    this.pos.y = this.radius;
    this.vel.y*=-1;
    this.visible = !(this.visible | this.oneHit);
  }
    if(this.pos.y > height - this.radius){
    this.pos.y = height - this.radius;
    this.vel.y*=-1;
    this.visible = !(this.visible | this.oneHit);
  }

  this.rnd = random(0, 1);

  if (this.rnd < 0.04 && this.countl > this.countmin) {
    this.vel.rotate(float(PI/4));
    this.countl = 0;
  }
  else if (this.rnd < 0.08 && this.countr > this.countmin) {
    this.vel.rotate(-(float(PI/4)));
    this.countr = 0;
  }
    this.old = createVector(pos.x,pos.y);
    this.pos.add(this.vel);

  }

  this.display = function(){
    if(this.visible){
      stroke(red(this.col), green(this.col), red(this.col), 200);
      strokeWeight(this.radius*2);
      //fill(red(this.col), green(this.col), red(this.col), 50);
      fill(this.col);
      line(this.old.x, this.old.y, this.pos.x, this.pos.y);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
  }

}
