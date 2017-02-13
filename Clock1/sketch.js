// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/


var z = -250;
var r = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  frameRate(1);
}


function draw() {
  

  fill(255);
  noStroke(0);
  rect(0, 0, width*2, 100)
  fill(0);
  textSize(20);
  text(hoursMinutes() +":" +  nf(second(), 2), width/2, 30);
  

  noFill();
  stroke(0, second()/60*255, 0);  
  translate(width/2, height/2,z);
  rotate(r);
  
  rect(1, 1, minute()*2, minute()*2);
  r+=1;
  z=z+1;
  

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
