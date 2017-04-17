var spawnCount;
var leftBorder, leftBorder2;
var rightBorder, rightBorder2;
var particles = [];
var obstacles = [];
var obstacles2 = [];
var comp;
var mil;
var introtime = 21000;

function setup() {
  createCanvas(960, 540);
  leftBorder = width/2 + 100;
  rightBorder = width - 20;
  leftBorder2 = 20;
  rightBorder2 = width/2-100;

  for(var i = 0; i<6; i++){
    var HelCol = color(	244, 43, 38);
    if (i == 0){
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder + 200;
    }
    if(i == 1){
      var size = 20;
      var y = height/2 + 200;
      var x = rightBorder - 60;
    }
    if(i == 2){
      var size = 40;
      var y = height/2 + 100;
      var x = leftBorder + 50;
    }
    if (i == 3){
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder2 + 200;
    }
    if(i == 4){
      var size = 20;
      var y = height/2 + 200;
      var x = rightBorder2 - 60;
    }
    if(i == 5){
      var size = 40;
      var y = height/2 + 100;
      var x = leftBorder2 + 50;
    }
      obstacles[obstacles.length] = new Obstacle(x, y, size, HelCol);
  }
  for(var i = 0; i<14; i++){
    var HelCol = color(255 - i*20, i*20, i*40);
    var per = random(40, 100);
    var x = random(100, width-100);
    var y = random(150, height-50);
      obstacles2[obstacles2.length] = new Obstacle(x, y, per, HelCol);
  }
}

function draw() {
  if(comp){
    spawnCount = 1;
  }
  else{
    spawnCount = 3;
  }
  mil = millis();
  if(comp){
  CountryComp();
  }
  else{
    MasterList();
  }
  if(mil < introtime){
    Intro();
  }


  }

function CountryComp(){
  background(0, 150);
  for (var num = 0; num < spawnCount; num++) {
    var x = random(leftBorder, rightBorder);
    var size = 4;
    var newParticle = new Particle(x, 50, size, color(255));
    particles[particles.length] = newParticle;
  }

  for (var num = 0; num < spawnCount; num++) {
    var x = random(leftBorder2, rightBorder2);
    var size = 4;
    var newParticle = new Particle(x, 50, size, color(255));
    particles[particles.length] = newParticle;
  }


  textSize(15);

  for (var i = particles.length-1; i > -1; i--) {
    particles[i].move();
    var has_Obstacle = particles[i].resolveobstacles(obstacles);
    particles[i].display();

    if (particles[i].pos.y > height) {
        particles.splice(i, 1);
      }

    if (has_Obstacle && particles[i].vel.mag() < 0.1) {
        particles.splice(i, 1);
      }
  }


  for (var i = 0; i < obstacles.length; i++) {
      noStroke();
      obstacles[i].display();
  }

  noStroke();
  fill(225);
  textSize(20);
  textAlign(CENTER);
  text("COUNTRY", leftBorder + (rightBorder-leftBorder)/2, 30);
  text("COUNTRY", leftBorder2 + (rightBorder2-leftBorder2)/2, 30);
}

function MasterList(){
  background(0);
  noStroke();
  fill(225);
  textSize(20);
  textAlign(CENTER);
  text("Now let's compare them in different countries. Select two to compare.", width/2, 30);
}

var thing1 = 100;
function Intro(){
  background(0);
  noStroke();
  fill(225);
  textSize(20);
  textAlign(CENTER);
  thing1+=3;

  if(thing1 < width){
    text("Life is a journey,", width/2, 30);
    text("Birth", 100, 70);
    text("Death", width-100, 70);
    if(thing1 < width-100){
    ellipse(thing1, 100, 20, 20);
  }
}

else if(thing1 > width-70 && thing1 < width+700){
  text("We all have these journeys, but some end early because of obstacles", width/2, 50);
}

else{
  text("These are the greatest causes of premature death in the world", width/2, 50);
  for (var num = 0; num < spawnCount; num++) {
    var x = random(50, width-50);
    var size = 4;
    var newParticle = new Particle(x, 100, size, color(255));
    particles[particles.length] = newParticle;
  }

    for (var i = 0; i < obstacles2.length; i++) {
        noStroke();
        obstacles2[i].display();
    }

  for (var i = particles.length-1; i > -1; i--) {
    particles[i].move();
    var has_Obstacle = particles[i].resolveobstacles(obstacles2);
    particles[i].display();

    if (particles[i].pos.y > height) {
        particles.splice(i, 1);
      }

    if (has_Obstacle && particles[i].vel.mag() < 0.1) {
        particles.splice(i, 1);
      }
  }
}


}

function keyPressed(){
  if (key == ' ' && mil > introtime){
    particles = [];
    comp = !comp;
  }
}
