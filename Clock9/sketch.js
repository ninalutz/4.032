// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0
/*
Original code by Fathom Studio and is in the original.js tab, I modified it for a class assignment
*/


var ringXsec = [];
var ringYsec = [];
var ringOrderSec = [];

var ringXmin = [];
var ringYmin = [];
var ringOrderMin = [];

var ringXhr = [];
var ringYhr = [];
var ringOrderHr = [];


var R = 5;
var S = 2;
var T = 2;

function setup() {
  createCanvas(800, 700);
  textAlign(CENTER, CENTER);
  var i;
    for (i = 0; i < 60; i++) {
        ringXsec[i] = 0.5 * width;
        ringYsec[i] = 0.2 * height;
        ringOrderSec[i] = i+1;
        
        ringXmin[i] = .5*width;
        ringYmin[i] = .4*height;
        ringOrderMin[i] = i+1;
        
    }
    
    for(i = 0; i<12; i++){
        ringXhr[i] = .5*width;
        ringYhr[i] = .6*height;
        ringOrderHr = i+1;
      
    }
}


function draw() {
  background(255);
  
  noStroke();
  fill(0);
  textSize(20);
  text(hoursMinutesSeconds(), width/2, 20);  noStroke();

  stroke(0);
  ellipseMode(RADIUS);

  
  noFill();
  
  translate(width/2, height/5, 20);
  
  for (var i = 0; i < second(); i++) {
      ringYsec[i] += 0.2 * (second() - i) * (second()*5 - ringYsec[i]) / second();
      drawRing(ringXsec[i], ringYsec[i]+25, R * ringOrderSec[i], +S * ringOrderSec[i], T);
  }
  
    for (var i = second()-1; i >= 0; i--) {
      drawRing(ringXsec[i], ringYsec[i]+25, R * ringOrderSec[i], -S * ringOrderSec[i], T);
  }
   
  
    translate(0, height/3, 20);
  
  for(var i = 0; i<minute(); i++){
      ringYmin[i]  += 0.2 * (minute() - i) * (minute()*5 - ringYmin[i]) / minute();
      drawRing(ringXmin[i], ringYmin[i]+25, (R)*ringOrderMin[i], S*ringOrderMin[i], T);
  }
  
  for(var i = minute()-1; i>= 0; i--){
    drawRing(ringXmin[i], ringYmin[i]+25, R * ringOrderMin[i], -S * ringOrderMin[i], T);
  }
  
  noFill();
  
  translate(-width/2, 0)
  
  for(var i = 0; i<hour()%12; i++){
    xpos = 200;
    ypos = 220;
    ellipse(xpos + 20*i, ypos, i*6, i*6);
    
  }
  
}


// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}
// format hours and minutes
function hoursMinutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}
// format hours, minutes, and seconds
function hoursMinutesSeconds() {
  return hoursMinutes() + ':' + nf(second(), 2);
}


function drawRing(x, y, a, b, c) {
      // translate(x, y);
    beginShape();
    vertex(-a, -c);
    bezierVertex(-a, b - c, a, b - c, a, -c);
    vertex(a, c);
    bezierVertex(a, b + c, -a, b + c, -a, c);
    endShape(CLOSE);
}

