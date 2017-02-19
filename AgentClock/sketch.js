var sec;

var count = 70;

var secrad = 150;

var startsec;

var hrrad = secrad;
var hrsize = 50;
var minsize = 20;

var angle = -90;

function setup() {
  sec = [];
  createCanvas(400, 400);
  startsec = second();
  
  for(var i = 0; i<70; i++){
    s = new Particle(60, startsec, 200);
    sec.push(s);
  }
  
  mouseX = width/2;
  mouseY = height/2;
  
}

function draw() {
  noStroke();
  fill(0, 40);
  rect(0, 0, width, height);
  
  fill(50, 50, 255);
  stroke(255);
  
  if(second() != startsec){
    startsec = second();
  }
  
  for(var i = 0; i<sec.length; i++){
    sec[i].update(startsec, 60);
    sec[i].display();
  }
  
  noFill();
  
  ellipse(width/2, height/2, secrad*2, secrad*2);
  angle = -90;
  
 for(i = 1; i<61; i++){
      angle += 360.0/60;
      if(i % 5 === 0){
          if(i/5 == hour() || (i == 60 && hour() === 0)){
            stroke(255);
             fill(255);
             ellipse(hrrad*cos(radians(angle)) + width/2, hrrad*sin(radians(angle)) + height/2, hrsize, hrsize);
          }
      }
     
      if(i == minute()){
            fill(255);
            ellipse(hrrad*cos(radians(angle)) + width/2, hrrad*sin(radians(angle)) + height/2, minsize, minsize);
          }

    }
  
}

var Particle = function(num, time, speed){
  this.num = num;
  this.time = time;
  this.turnFactor = random(3, 10);
  this.spdLimit = speed;
  
  this.pos = createVector(random(width), random(height));
  this.prev = this.pos.copy();
  this.spd = createVector(random(2), random(2));
  this.acel = createVector();
}

Particle.prototype.update = function(time, num){
  this.attract = createVector(secrad*cos(radians((360*time/num)-90)) + width/2, secrad*sin(radians((360*time/num)-90)) + height/2);
  fill(255);
  stroke(255);
  this.applyBehaviors(this.attract, this.pos);
}

Particle.prototype.applyBehaviors = function(attractor, position){
  this.prev = this.pos.copy();
  this.attractor = this.attract;
  
  if(this.pos.x > width || this.pos.x<0){
    this.spd.x*=-0.9;
  }
    
  if(this.pos.y > height || this.pos.y<0){
    this.spd.y*=-0.9;
  }
  
  this.attractor.sub(this.pos);
  this.acel.set(this.attractor);
  this.acel.normalize();
  this.acel.div(this.turnFactor);
  this.spd.add(this.acel);
  this.spd.limit(this.spdLimit * (1/60));
  this.pos.add(this.spd);
    
}

Particle.prototype.display = function(){
  stroke(255);
  line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  
}