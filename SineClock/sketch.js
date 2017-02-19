/*
Some oscillation notes:
http://natureofcode.com/book/chapter-3-oscillation/
*/

var shift, amplitude, x, y, rad, grow, n, incr, showtime, startsec;

function setup() {
  background(255);
  createCanvas(400, 400);
  strokeWeight(.1);
  grow = millis()%1000/1000;
  n = hour();
  incr = TWO_PI/1000;
  showtime = false;
	startsec = second();
}

function draw() {
  grow+=.002;
  amplitude = (sin(second()*.01)*n)*grow;
  shift = (hour() + sin(second()*.016)*minute())*grow;
  rad = map(sin(second()*.001), -1, 1, .1, 1);
  
	if(second() != startsec){
    print("shift =" + hour() + " + (sin(" + second() + "*.016)*"+minute()+")*grow");
    print("time =" + hour() + ":" + minute() + ":" + second());
		startsec = second();
		}

  fill(255);
  translate(width/2, height/2);
  rotate(sin(frameCount*.005)*.9);
  
  for(var i = 0; i<TWO_PI; i+=incr){
    x = (shift + amplitude*sin(n*i)) * cos(i);
    y = (shift + amplitude*cos(n*i)) * sin(i);
    stroke(abs(sin(i*3)*240), grow*60);
    ellipse(x, y, rad, rad);
    
  }
  
  if(second() === 0){
    loop();
    background(255);
    grow = millis()%1000/1000;
  }
 
}

function keyPressed(){
  showtime = !showtime;
}

