var spawnCount = 1;
var leftBorder, leftBorder2;
var rightBorder, rightBorder2;
var particles = [];
var obstacles = [];
var comp;
var mil;

function setup() {
  createCanvas(960, 540);
  leftBorder = width/2 + 100;
  rightBorder = width - 20;
  leftBorder2 = 20;
  rightBorder2 = width/2-100;

  for(var i = 0; i<6; i++){
  //  var HelCol = color(255, 124, 72);
    var HelCol = color(	244, 43, 38);
    if (i == 0){
      //var HelCol = color(24, 132, 187);
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder + 200;
    }
    if(i == 1){
      //var HelCol = color(244, 207, 38);
      var size = 20;
      var y = height/2 + 200;
      var x = rightBorder - 60;
    }
    if(i == 2){
    //  var HelCol = color(	244, 43, 38);
      var size = 40;
      var y = height/2 + 100;
      var x = leftBorder + 50;
    }
    if (i == 3){
    //  var HelCol = color(	124, 212, 51);
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder2 + 200;
    }
    if(i == 4){
      // var HelCol = color(255, 124, 72);
      var size = 20;
      var y = height/2 + 200;
      var x = rightBorder2 - 60;
    }
    if(i == 5){
      //var HelCol = color(159, 67, 270);
      var size = 40;
      var y = height/2 + 100;
      var x = leftBorder2 + 50;
    }
      obstacles[obstacles.length] = new Obstacle(x, y, size, HelCol);
  }
}

function draw() {
  mil = millis();
  if(comp){
  CountryComp();
  }
  else{
    MasterList();
  }
  if(mil < 5000){
    Intro();
  }
  print(mil);

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
    var has_Obstacle = particles[i].resolveobstacles();
    particles[i].display();

    if (particles[i].pos.y > height) {
        particles.splice(i, 1);
      }

    if (has_Obstacle && particles[i].vel.mag() < 0.1) {
        particles.splice(i, 1);
      }
  }


  for (var i = 0; i < obstacles.length; i++) {
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
  text("Countries with death delta > 5", width/2, 30);
}

function Intro(){
  print("INTROOOOOOO");
  background(0);
  noStroke();
  fill(225);
  textSize(20);
  textAlign(CENTER);
  text("Think of life...", width/2, 30);

  for (var num = 0; num < spawnCount; num++) {
    var x = random(leftBorder, rightBorder);
    var size = 4;
    var newParticle = new Particle(x, 50, size, color(255));
    particles[particles.length] = newParticle;
  }

  for (var i = particles.length-1; i > -1; i--) {
    particles[i].move();
    //var has_Obstacle = particles[i].resolveobstacles();
    particles[i].display();

    if (particles[i].pos.y > height) {
        particles.splice(i, 1);
      }

    // if (has_Obstacle && particles[i].vel.mag() < 0.1) {
    //     particles.splice(i, 1);
    //   }
  }

}

function keyPressed(){
  if (key == ' '){
    comp = !comp;
  }
}
