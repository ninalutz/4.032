function quibit3D(){
  background(50, 50, 60);
  pointLight(255, 255, 255, mouseX, mouseY, 50);

  ambientMaterial(250, 0, 0, 50);

  push();
  rotateX(frameCount * 0.005);
  cylinder(100, 20, 50);
  pop();
}

function quibit(){
  background(50, 50, 60);
  ellipse(width/2, height/2, 100, 100);
}

function Intro(){
  background(50, 50, 60);
  fill(255);
  text("In classical physical a particle has ", width/2, 100);
  text("mass, ", width/3, 400);
  text("position, ", width/3, 450);
  text("and velocity", width/3, 500);
}

function Slide1(){
  background(50, 50, 60);
  text("We know where the particle is in space and what state it's in ", width/2, 100);
}

//All the things for quantum
function Slide2(){
  // background(50, 50, 60);
  background(27, 28, 30);
  stroke(255);

  if(second() % 10 == 0){
    disturbX = 50;
    disturbY = 200;
    disturbance();
  }
  push();
  translate(0, random(-10, 10));
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
           stroke(125+(Z[N]/2),125+(Z[N]/2),125+(Z[N]/2));

        //  stroke(255);
        //  console.log(X[N]*1.2*(200+V[N])/200+300,Y[N]*1.2*(200+V[N])/200+300,X[NN]*1.2*(200+V[NN])/200+300,Y[NN]*1.2*(200+V[NN])/200+300);
          line(X[N]*1.2*(200+V[N])/200+300,Y[N]*1.2*(200+V[N])/200+300,X[NN]*1.2*(200+V[NN])/200+300,Y[NN]*1.2*(200+V[NN])/200+300) ;

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
  text("But not in quantum.", width/2 + 50, height/3);
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

function Slide4(){
  background(50, 50, 60);
  text("A qubit is a quantum bit of information with two states, like a coin.", width/2, 100);
}
function Slide5(){
  background(50, 50, 60);
  text("Qubits are prepared in a state.", width/2, 100);
}
function Slide6(){
  background(50, 50, 60);
  text("But depending on how you access them, the states vary...", width/2, 100);
}
function Slide7(){
  background(50, 50, 60);
  fill(255, 0, 0);
  ellipse(width/2, height, 100, 100);
}
function Slide8(){
  fill(255);
    background(50, 50, 60);
  text("As you can see, a qubit can be in multiple states at once...so what does this mean in a computer?", width/2, 100);
}

function Slide10(){
    background(50, 50, 60);
  text("Computers rely on performing lots of simple logic to complete complex tasks.", width/2, 100);
}

function Slide11(){
    background(50, 50, 60);
  text("Logic is done by gates, which are electronics that perform logic inside a computer.", width/2, 100);
}

function Slide12(){
    background(50, 50, 60);
  text("This is what a simple expression x = 7 + 8 would look like in this digital circuit", width/2, 100);
}

function Slide13(){
    background(50, 50, 60);
  text("A single qubit can be a gate.", width/2, 100);
}

function Slide14(){
    background(50, 50, 60);
  text("INTERACTIVE.", width/2, 100);
}
function Slide15(){
    background(50, 50, 60);
  text("Because of its multiple states a single qubit can replace simple logic gates.", width/2, 100);
}
function Slide16(){
    background(50, 50, 60);
  text("Multiple qubits can make complex gates.", width/2, 100);
}
function Slide17(){
    background(50, 50, 60);
  text("This is what a piece of code looks like on both...", width/2, 100);
}
function Slide18(){
    background(50, 50, 60);
  text("In size, quantum scales up more than bytes. And in speed.", width/2, 100);
}
function Slide19(){
    background(50, 50, 60);
  text("We have a long way to go before quantum computing, but the possibilities are limitless.", width/2, 100);
}

function disturbance(){
  Lmin = 300 ; i = 0 ;
  for ( N = 0 ; N <= Nmax ; N++ ){
     L = sqrt(((disturbX-(300+X[N]))*(disturbX-(300+X[N])))+((disturbY-(300+Y[N]))*(disturbY-(300+Y[N])))) ;
     if ( Z[N] > 0 && L < Lmin ){i = N ; Lmin = L ; }
  }
  if ( K == 0 ){ dV[i] = -200 ; K = 1 ; }
           else{ dV[i] = +200 ; K = 0 ; }
}
