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
    fill(this.disasterColor);
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.mass*0.95, this.mass*0.95);
  }
}
