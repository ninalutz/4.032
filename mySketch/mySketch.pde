class photon {
  float c = 8;
  float radius = 1;
  PVector old, pos;
  PVector vel;
  color col;
  boolean orbit;
  PVector focus;
  boolean visible = true;
  int countr = 0, countl = 0;
  int countmin = 5;
  boolean oneHit = false;

  photon(PVector pos, PVector dir) {
    this.pos = pos;
    this.old = pos;
    dir.normalize();
    dir.mult(c);
    this.vel = dir;
  }

  void update(PApplet a) {
    ++countr; ++countl;

    // left
    if (pos.x < radius) {
      pos.x = radius;
      vel.x *= -1;
      visible = !(visible | oneHit);
    } else
      // right
      if (pos.x > a.width-radius) {
        pos.x = a.width-radius;
        vel.x *= -1;
        visible = !(visible | oneHit);
      }
    // top
    if (pos.y < radius) {
      pos.y = radius;
      vel.y *= -1;
      visible = !(visible | oneHit);
    } else
      // bottom
      if (pos.y > a.height-radius) {
        pos.y = a.height-radius;
        vel.y *= -1;
        visible = !(visible | oneHit);
    }

    float rnd = a.random(1);
    //if (rnd > 0.996) visible = !visible;


  if (rnd < 0.04 && countl > countmin) {
    vel.rotate((float)Math.PI/4);
    countl = 0;
  } else if (rnd < 0.08 && countr > countmin) {
    vel.rotate(-(float)Math.PI/4);
    countr = 0;
  }
    old = new PVector(pos.x,pos.y,pos.z);
    pos.add(vel);
  }

  void draw(PApplet a) {
    if (!visible) return;

    a.stroke(col);
    a.strokeWeight(radius*2);
    a.fill(col);
    a.line(old.x, old.y, pos.x, pos.y);

    a.noStroke();
    a.ellipse(pos.x, pos.y, radius*2, radius*2);
  }
}

int n = 30;
ArrayList<photon> p;
photon guide;

void setup() {
  size(1066,600, P2D);
//  createCanvas(windowWidth, windowHeight);
  //fullScreen();
  //noLoop();
  //surface.setResizable(true);
  //surface.setFrameRate(1);

  guide = new photon(new PVector(random(width), random(height)),
                     new PVector(1,1));
  guide.col = color(255);

  guide.vel.mult(1.5);
  guide.radius = 10;

  p = new ArrayList<photon>();

  for (int i = 0; i < n; ++i) {
    //PVector dir = new PVector(random(1) < 0.5? 1 : -1, random(1) < 0.5? 1 : -1);
    PVector dir = new PVector(1, 0);
    dir.rotate(i * (float)Math.PI/4);
    //photon t = new photon(new PVector(random(width), random(height)), dir);
    photon t = new photon(new PVector(width/2, height/2), dir);
    t.col = #00ffff;
    t.focus = new PVector(width,height);
    t.radius = 1 + random(1);
    t.orbit = false;
  //  t.visible = 1 == (i & 1);
    t.focus = guide.pos;
    //t.vel.mult(0.5+random(1));
    p.add(t);
  }

  //background(255);
}

void draw() {
  fill(0, 10);
  rect(0, 0, width, height);
  //PVector cent = new PVector(mouseX,mouseY);
  for (int i = 0; i < n; ++i) {
    photon t = p.get(i);
    t.draw(this);
    t.update(this);
  }
  //guide.update(this);
  guide.pos.x = mouseX;
  guide.pos.y = mouseY;

}

void pulse(int x, int y) {
  for (int i = 0; i < n; ++i) {
    PVector dir = new PVector(1, 0);
    dir.rotate(i * (float)Math.PI/4);

    photon t = p.get(i);
    t.visible = true;
    t.pos.x = x; t.pos.y = y;
    t.old.x = t.pos.x; t.old.y = t.pos.y;
    dir.mult(t.c);
    t.vel = dir;
    t.countr = t.countl = 0;
  }
}

void mouseClicked() {
 pulse(mouseX, mouseY);
}