var particles = [];
var pixelSteps = 6;
var words = [];
var wordIndex = 0; 
var bgColor;
var fontName = "Arial Bold";

Particle = function(){
  this.pos;
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.target;
  this.closeEnoughTarget = 50;
  this.maxSpeed = 4.0;
  this.maxFore = .1;
  this.particleSize = 5;
  this.isKilled = false;
  
  this.startColor = color(0);
  this.targetColor = color(0);
  this.colorWeight = 0;
  this.colorBlendRate = 0; 
  
  this.move = function(){
    this.proximityMult = 1.0;
    this.distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if(this.distance < this.closeEnoughTarget){
      this.proximityMult = this.distance/this.closeEnoughTarget;
    }
    
    this.towardsTarget = createVector(this.target.x, this.target.y);
    this.towardsTarget.sub(this.pos);
    this.towardsTarget.normalize();
    this.towardsTarget.mult(this.maxSpeed*this.proximityMult);
    
    this.steer = createVector(this.towardsTarget.x, this.towardsTarget.y);
    this.steer.sub(this.vel);
    this.steer.normalize();
    this.steer.mult(this.maxForce);
    
    this.acc.add(this.steer);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.display = function(){
    this.currentColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
    noStroke();
    fill(this.currentColor);
    if(!this.isKilled){
    ellipse(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
    }
    if(this.colorWeight < 1.0){
      this.colorWeight = min(this.colorWeight + this.colorBlendRate, 1.0);
    }
  }
  
  this.kill = function(){
    if(!this.isKilled){
      this.randomPos = createVector(random(width), random(height));
      this.target.x = this.randomPos.x;
      this.target.y = this.randomPos.y;
      
      this.startColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
      this.targetColor = color(0);
      this.colorWeight = 0;

      this.isKilled = true;
    }
    
  }
  
}

var pg;

function doWord(word){
  pg = createGraphics(width, height);
  // beginDraw();
  pg.fill(0);
  pg.textSize(100);
  pg.textAlign(CENTER);
  var font = textFont(fontName, 100);
  pg.textFont(font);
  pg.text(word, width/2, height/2);
  // endDraw();
  pg.loadPixels();
  
  var newColor = color(random(0.0, 255.0), random(0.0, 255.0), random(0.0, 255.0));


  var particleCount = particles.length;
  var particleIndex = 0;

   var coordsIndexes = [];
  for (var i = 0; i < (width*height)-1; i+= pixelSteps) {
    coordsIndexes.push(i);
  }
  
  for(var i = 0; i<coordsIndexes.length; i++){
    var randomIndex = coordsIndexes.pop();
    var coordIndex = coordsIndexes[randomIndex];

    
    if(pg.pixels[coordIndex] != 0){
            // Convert index to its coordinates
      var x = coordIndex % width;
      var y = coordIndex / width;

      var newParticle;

      if (particleIndex < particleCount) {
        // Use a particle that's already on the screen
        newParticle = particles[particleIndex];
        newParticle.isKilled = false;
        particleIndex += 1;
      } else {
        // Create a new particle
        newParticle = new Particle();

        var randomPos = createVector(random(width), random(height));
        newParticle.pos = createVector(randomPos.x, randomPos.y);
        // newParticle.pos.x = randomPos.x;
        // newParticle.pos.y = randomPos.y;

        newParticle.maxSpeed = random(2.0, 5.0);
        newParticle.maxForce = newParticle.maxSpeed*0.025;
        newParticle.particleSize = random(3, 6);
        newParticle.colorBlendRate = random(0.0025, 0.03);

        particles.push(newParticle);
      }

      // Blend it from its current color
      newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
      newParticle.targetColor = newColor;
      newParticle.colorWeight = 0;

      // Assign the particle's new target to seek
      newParticle.target = createVector(x, y);
      // newParticle.target.x = x;
      // newParticle.target.y = y;
    }
  }
  
    if (particleIndex < particleCount) {
    for (var i = particleIndex; i < particleCount; i++) {
      var particle = particles[i];
      particle.kill();
    }
  }
  
}
  

function setup() {
  createCanvas(700, 300);
  bgColor = color(255, 100);
  words.push("HELLO THERE");
  doWord("HELLO THERE");
}

function draw() {
  background(255);
  fill(bgColor);
    noStroke();
   rect(0, 0, width*2, height*2);

  for (var x = particles.length-1; x > -1; x--) {
    // Simulate and draw pixels
    var particle = particles[x];
    particle.move();
    particle.display();

    // Remove any dead pixels out of bounds
    if (particle.isKilled) {
      if (particle.pos.x < 0 || particle.pos.x > width || particle.pos.y < 0 || particle.pos.y > height) {
        particles.remove(particle);
      }
    }
  }
  
}