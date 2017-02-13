// // (c) 2016-17 Fathom Information Design BY-NC-SA
// // https://creativecommons.org/licenses/by-nc-sa/4.0


// function setup() {
//   createCanvas(400, 400);
// }


// function draw() {
//   background(255);
//   fill(0);
//   noStroke();
//   ellipseMode(RADIUS);

//   var startAngle = radians(-90);
//   var stopAngle = radians(270);

//   var cx = width/2;
//   var cy = height/2;

//   var secondRadius = width * 0.4;
//   var minuteRadius = secondRadius * 0.95;
//   var hourRadius = minuteRadius * 0.7;
//   var innerRadius = hourRadius * 0.8;
  
//   fill(0);
//   var secondAngle = map(second(), 0, 60, startAngle, stopAngle);
//   arc(cx, cy, secondRadius, secondRadius, startAngle, secondAngle);
//   fill(255);
//   ellipse(cx, cy, minuteRadius, minuteRadius);

//   fill(0);
//   var minuteAngle = map(minute(), 0, 60, startAngle, stopAngle);
//   arc(cx, cy, minuteRadius, minuteRadius, startAngle, minuteAngle);
//   fill(255);
//   ellipse(cx, cy, hourRadius, hourRadius);

//   fill(0);
//   var hourAngle = map(hour() % 12, 0, 12, startAngle, stopAngle);
//   arc(cx, cy, hourRadius, hourRadius, startAngle, hourAngle);
//   fill(255);
//   ellipse(cx, cy, innerRadius, innerRadius);
  

//   noStroke();
//   fill(0);
//   textAlign(CENTER, CENTER);
//   text(hoursMinutesSeconds(), width/2, height/2);
  
// }


// // return hours that read 1 through 12 rather than 0 through 23
// function twelveHour() {
//   var h = hour() % 12;
//   if (h === 0) {
//     h = 12;
//   }
//   return h;
// }


// // format hours and minutes
// function hoursMinutes() {
//   return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
// }


// // format hours, minutes, and seconds
// function hoursMinutesSeconds() {
//   return hoursMinutes() + ':' + nf(second(), 2);
// }
