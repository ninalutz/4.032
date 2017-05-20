var n = 70;
var guide;
var p = [];
function setup() {
  createCanvas(1000, 600);
  var vec1 = createVector(random(width), random(height));
  var vec2 = createVector(1, 1);
  guide = new photon(vec1, vec2);
  guide.col = color(255);
  guide.vel.mult(1.5);
  guide.radius = 10;

  for(var i = 0; i<n; i++){

    var dir = createVector(1, 0);
    dir.rotate(i * (float(PI/4)));
    var vec3 = createVector(width/2, height/2)
    var t = new photon(vec3, dir);
    t.col = color(0, 255, 0);
    t.focus = createVector(width,height);
    t.radius = 1 + random(1);
    // t.orbit = false;
  //  t.visible = 1 == (i & 1);
    t.focus = guide.pos;
    //t.vel.mult(0.5+random(1));
    p.push(t);
  }
}

function draw() {
  fill(0, 10);
  rect(0, 0, width, height);

  for(var i = 0; i< n; i++){
    var t = p[i];
    t.display();
    t.update();
  }
}

var photon = function(pos, dir){
  this.c = 8;
  this.radius = 1;
  this.old = pos;
  this.pos = pos;
  dir.normalize();
  dir.mult(this.c);
  this.vel = dir;
  this.col;
  this.focus;
  this.visible = true;
  this.countr = 0;
  this.countl = 0;
  this.countmin = 5;
  this.oneHit = false;

  this.update = function(){
    this.countr+=1;
    this.countl+=1;

    if(this.pos.x < this.radius){
      this.pos.x = this.radius;
      this.vel.x *= -1;
      this.visible = !(this.visible | this.oneHit);
    }
   if(this.pos.x > width-this.radius){
      this.pos.x = width - this.radius;
      this.vel.x *= -1;
      this.visible = !(this.visible | this.oneHit);
    }

  if(this.pos.y < this.radius){
    this.pos.y = this.radius;
    this.vel.y*=-1;
    this.visible = !(this.visible | this.oneHit);
  }
    if(this.pos.y > height - this.radius){
    this.pos.y = height - this.radius;
    this.vel.y*=-1;
    this.visible = !(this.visible | this.oneHit);
  }

  this.rnd = random(0, 1);

  if (this.rnd < 0.04 && this.countl > this.countmin) {
    this.vel.rotate(float(PI/4));
    this.countl = 0;
  }
  else if (this.rnd < 0.08 && this.countr > this.countmin) {
    this.vel.rotate(-(float(PI/4)));
    this.countr = 0;
  }
    this.old = createVector(pos.x,pos.y);
    this.pos.add(this.vel);

  }

  this.display = function(){
    if(this.visible){
      stroke(this.col);
      strokeWeight(this.radius*2);
      fill(this.col);
      line(this.old.x, this.old.y, this.pos.x, this.pos.y);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
  }

}
