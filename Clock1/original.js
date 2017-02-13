// // (c) 2016-17 Fathom Information Design BY-NC-SA
// // https://creativecommons.org/licenses/by-nc-sa/4.0/


// function setup() {
//   createCanvas(400, 400);
//   textAlign(CENTER, CENTER);
//   rectMode(CENTER);
// }


// function draw() {
//   // background(255);

//   stroke(0);
//   noFill();
//   var between = 4;
//   var square = 40;
//   for (var i = 0; i < second(); i++) {
//     rect(width/2, height/2, square, square);
//     square += between;
//   }

//   noStroke();
//   fill(0);
//   text(hoursMinutes(), width/2, 30);
//   text(nf(second(), 2), width/2, height/2);
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
