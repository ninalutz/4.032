function Particle(x, y, mass, displayColor) {
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.mass = mass;
  this.displayColor = displayColor;
  this.fallRate = map(this.mass, 1, 8, 0.1, 0.05);

  this.getBoundingBox = function() {
    var radius = this.mass/2;
    var offset = 2; // Just to expand its bb a bit.
    var ax = this.pos.x-radius-offset;
    var ay = this.pos.y-radius-offset;
    var bx = this.pos.x+radius+offset;
    var by = this.pos.y+radius+offset;
    return [ax, ay, bx, by];
  }

  this.move = function() {
    var gravity = new p5.Vector(0, this.fallRate);
    this.acc.add(gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.resolveobstacles = function() {
    var hit_object = false;
    var bb1 = this.getBoundingBox();

    for (var c = 0; c < obstacles.length; c++) {
      var col = obstacles[c];
      var bb2 = col.getBoundingBox();
      var distance = dist(this.pos.x, this.pos.y, col.pos.x, col.pos.y);
      var offset = this.pos.copy();
      var friction = .2;
      var dampening = map(this.mass, 2, 8, 1, 0.8);
      var mag = this.vel.mag();
      var bounce = this.pos.copy();
      var splitCount = 1;

      if (distance < col.mass/2) {
          offset.sub(col.pos);
          offset.normalize();
          offset.mult(col.mass/2-distance);
          this.pos.add(offset);

          bounce.sub(col.pos);
          bounce.normalize();
          bounce.mult(mag*friction*dampening);
          this.vel = bounce;
          this.displayColor = col.disasterColor;
          this.mass = 6;

          for (var s = 0; s < splitCount; s++) {
            var mass = max(1, this.mass-1);
            var displayColor = col.disasterColor;
            var reflect = new Particle(this.pos.x, this.pos.y, mass, displayColor);

            reflect.vel = this.vel.copy();
            reflect.vel.rotate(radians(random(-45, 45)));
            reflect.vel.mult(random(0.6, 0.9));

            particles[particles.length] = reflect;
            particles.pop();
          }
          hit_object = true;
          break;
        }
    }
    return hit_object;
  }

  this.display = function() {
    stroke(this.displayColor);
    strokeWeight(this.mass);
    point(this.pos.x, this.pos.y);
  }
}
