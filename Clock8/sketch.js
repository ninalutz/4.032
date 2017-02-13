// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

/*

The original code was written by Fathom Information Design and is in the original.js tab
I modified it for my class assignment
*/

var outerSize = 175; // radius of the outer circle
var hourDistance = 120;
var hourSize = 40;
var minuteDistance = 28;
var minuteSize = 7;

var screenCenter;


function setup() {
  createCanvas(400, 400);
  screenCenter = createVector(width/2, height/2);

  ellipseMode(RADIUS);
  noStroke();
}


function draw() {
  background(255);

  fill(0);
  ellipse(screenCenter.x, screenCenter.y, outerSize, outerSize);

  fill(255);
  //var angle = map(hour(), 0, 12, radians(-90), radians(270));
  //ellipse(centerX + hourRadius*cos(
  hourCenter = analogClock(hour() % 12, 12, screenCenter, hourDistance);
  ellipse(hourCenter.x, hourCenter.y, hourSize, hourSize);

  fill(0);
  minuteCenter = analogClock(minute(), 60, hourCenter, minuteDistance);
  ellipse(minuteCenter.x, minuteCenter.y, minuteSize, minuteSize);

  fill(255);
  textAlign(CENTER, CENTER);
  text(hoursMinutesSeconds(), screenCenter.x, screenCenter.y);
}


function analogClock(value, high, mid, radius) {
  var angle = map(value, 0, high, radians(-90), radians(270));
  return createVector(mid.x + cos(angle)*radius, mid.y + sin(angle)*radius);
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
