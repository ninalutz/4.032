var Nmax = 800;
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

function setup() {
  R = 2*sqrt((4*PI*(200*200)/Nmax)/(2*sqrt(3)));
  createCanvas(600, 600);
  background(237, 163, 255);
  stroke(255, 255, 255);
  fill(236, 163, 255);

  for(N = 0; N< Nmax; N++){
    X[N] = random(-300,300);
    Y[N] = random(-200,300);
    Z[N] = random(-200,300);
    V[N] = 0;
    dV[N] = 0;
  }
}

function draw() {
  background(0);
  stroke(255);
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
           stroke(125+(Z[N]/2),125+(Z[N]/2),125+(Z[N]/2)) ;
        //  stroke(255);
        //  console.log(X[N]*1.2*(200+V[N])/200+300,Y[N]*1.2*(200+V[N])/200+300,X[NN]*1.2*(200+V[NN])/200+300,Y[NN]*1.2*(200+V[NN])/200+300);
          line(X[N]*1.2*(200+V[N])/200+300,Y[N]*1.2*(200+V[N])/200+300,X[NN]*1.2*(200+V[NN])/200+300,Y[NN]*1.2*(200+V[NN])/200+300) ;
        }
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
     Z[N] = (KZ*cos(float(300-mouseX)/10000))-(KX*sin(float(300-mouseX)/10000)) ;
     X[N] = (KZ*sin(float(300-mouseX)/10000))+(KX*cos(float(300-mouseX)/10000)) ;
     KZ = Z[N] ; KY = Y[N] ;
     Z[N] = (KZ*cos(float(300-mouseY)/10000))-(KY*sin(float(300-mouseY)/10000)) ;
     Y[N] = (KZ*sin(float(300-mouseY)/10000))+(KY*cos(float(300-mouseY)/10000)) ;
     dV[N] = dV[N] - (V[N]*HH) ;
     V[N] = V[N] + dV[N] ; dV[N] = dV[N] * H ;
  }
}

function mousePressed(){
  Lmin = 600 ; i = 0 ;
  for ( N = 0 ; N <= Nmax ; N++ ){
     L = sqrt(((mouseX-(300+X[N]))*(mouseX-(300+X[N])))+((mouseY-(300+Y[N]))*(mouseY-(300+Y[N])))) ;
     if ( Z[N] > 0 && L < Lmin ){i = N ; Lmin = L ; }
  }
  if ( K == 0 ){ dV[i] = -200 ; K = 1 ; }
           else{ dV[i] = +200 ; K = 0 ; }
}
