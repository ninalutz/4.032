function Obstacle(x, y, mass, disColor) {
  this.pos = new p5.Vector(x, y);
  this.target = new p5.Vector(x, y);
  this.disasterColor = disColor;
  this.mass = mass;
  this.targetMass = mass;

  this.getBoundingBox = function() {
    var radius = this.mass/2;
    var ax = this.pos.x-radius;
    var ay = this.pos.y-radius;
    var bx = this.pos.x+radius;
    var by = this.pos.y+radius;
    return [ax, ay, bx, by];
  }

  this.display = function() {
    if(comp){
    if(this.pos.x > width/2){
    fill(150, 50);
    rectMode(CORNERS);
    rect(width-20, this.pos.y, width/2+20, this.pos.y + 20);
    fill(255);
    textSize(12);
    text("ages: ", width/2+50, this.pos.y + 15);
  }
  if(this.pos.x < width/2){
    fill(150, 50);
  rectMode(CORNERS);
  rect(20, this.pos.y, width/2-20, this.pos.y + 20);
  fill(255);
  textSize(12);
  text("ages: ", width/2-50, this.pos.y + 15);
}
}
      fill(this.disasterColor);
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.mass*0.95, this.mass*0.95);
  }
}
