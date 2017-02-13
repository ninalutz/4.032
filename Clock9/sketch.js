// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0


function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}


function draw() {
  background(255);
  

  stroke(0);
  ellipseMode(RADIUS);

  
  noFill();

  var margin = width * 0.15;
  var left = margin;
  var right = width - margin;

  var hourY = height * 0.25;
  var hourLarge = 40;
  var hourSmall = 10;

  var x, r;
  
  var hh = hour() % 12;
  for (var i = 0; i < hh; i++) {
    x = map(i, 0, hh - 1, left + hourLarge, right - hourSmall);
    r = map(i, 0, hh - 1, hourLarge, hourSmall);
    ellipse(x, hourY, r, r);
  }

  var minuteY = height * 0.5;
  var minuteLarge = 30;
  var minuteSmall = 8;
  for (var j = 0; j < minute(); j++) {
    x = map(j, 0, minute() - 1, left + minuteSmall, right - minuteLarge);
    r = map(j, 0, minute(), minuteSmall, minuteLarge);
    ellipse(x, minuteY, r, r);
  }

  var secondY = height * 0.75;
  var secondLarge = 15;
  var secondSmall = 4;
  for (var k = 0; k < second(); k++) {
    x = map(k, 0, second() - 1, left + secondLarge, right - secondSmall);
    r = map(k, 0, second(), secondLarge, secondSmall);
    ellipse(x, secondY, r, r);
  }

  noStroke();
  fill(0);
  text(nf(twelveHour(), 2), margin/2, hourY);
  text(nf(minute(), 2), width - margin/2, minuteY);
  text(nf(second(), 2), margin/2, secondY);
}


// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}
