var spawnCount = 1;
var leftBorder, leftBorder2;
var rightBorder, rightBorder2;
var particles = [];
var obstacles = [];
var world;
var worldsplit;
var country;
var countrycomp;
var dropdown;

function setup() {
  dropdown = createSelect();
  dropdown.position(20, 65);
  dropdown.option('name 1','value1');
  dropdown.option('name 2','value2');
  dropdown.option('name 3','value3');
  dropdown.option('pear','pear');

  dropdown.changed(mySelectEvent);

  createCanvas(960, 540);
  leftBorder = width/2;
  rightBorder = width- width/8;
  leftBorder2 = 10;
  rightBorder2 = width/2 - 20;

  for (var i = 0; i < 3; i++) {
    if (i == 0){
      var HelCol = color(231, 44, 21);
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder + 200;
    }
    if(i == 1){
      var HelCol = color(168, 222, 88);
      var size = 20;
      var y = height/2 + 200;
      var x = rightBorder - 60;
    }
    if(i == 2){
      var HelCol = color(45, 119, 239);
      var size = 40;
      var y = height/2 + 100;
      var x = leftBorder + 50;
    }
      obstacles[obstacles.length] = new Obstacle(x, y, size, HelCol);
  }
}


function draw() {
  background(0, 150);

  for (var num = 0; num < spawnCount; num++) {
    var x = random(leftBorder, rightBorder);
    var size = 4;
    var newParticle = new Particle(x, 50, size, color(255));
    particles[particles.length] = newParticle;
  }

  textSize(15);

  for (var i = 0; i < obstacles.length; i++) {
    var thing = obstacles[i].disasterColor;
    fill(100, 50);
    rect(leftBorder, obstacles[i].pos.y, rightBorder-leftBorder, 20);
    stroke(255);
    noStroke();
    fill(220);
    var ageRange = "";
      if(i == 0){
        ageRange = "20-27";
        fill(obstacles[0].disasterColor);
        text("HIV: 20%", rightBorder+20, obstacles[i].pos.y + 20);
      }

      if (i== 2){
        ageRange = "45-60";
        fill(obstacles[2].disasterColor);
        text("Cancer:15%", rightBorder+20, obstacles[i].pos.y + 20);
      }

    if (i == 1){
        ageRange = "75-80";
        fill(obstacles[1].disasterColor);
        text("Dimentia: 5%", rightBorder+20, obstacles[i].pos.y + 20);
      }
      fill(255);
    text("ages: " + ageRange, rightBorder+20, obstacles[i].pos.y);
  }


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

 translate(0, 55);
  fill(225);
  textSize(20);
  textAlign(CENTER);
  text("COUNTRY", leftBorder + (rightBorder-leftBorder)/2, -20);
  textSize(15);
    textAlign(LEFT);

translate(-width/2, -55);
  for (var num = 0; num < spawnCount; num++) {
    var x = random(leftBorder, rightBorder);
    var size = 4;
    var newParticle = new Particle(x, 50, size, color(255));
    particles[particles.length] = newParticle;
  }

  textSize(15);

  for (var i = 0; i < obstacles.length; i++) {
    var thing = obstacles[i].disasterColor;
    fill(100, 50);
    rect(leftBorder, obstacles[i].pos.y, rightBorder-leftBorder, 20);
    stroke(255);
    noStroke();
    fill(220);
    var ageRange = "";
      if(i == 0){
        ageRange = "20-27";
        fill(obstacles[0].disasterColor);
        text("HIV: 20%", rightBorder+20, obstacles[i].pos.y + 20);
      }

      if (i== 2){
        ageRange = "45-60";
        fill(obstacles[2].disasterColor);
        text("Cancer:15%", rightBorder+20, obstacles[i].pos.y + 20);
      }

    if (i == 1){
        ageRange = "75-80";
        fill(obstacles[1].disasterColor);
        text("Dimentia: 5%", rightBorder+20, obstacles[i].pos.y + 20);
      }
      fill(255);
    text("ages: " + ageRange, rightBorder+20, obstacles[i].pos.y);
  }


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

 translate(0, 55);
  fill(225);
  textSize(20);
  textAlign(CENTER);
  text("COUNTRY", leftBorder + (rightBorder-leftBorder)/2, -20);
  textAlign(LEFT);
  textSize(15);
  if (dropdown.selected() === 'pear') {
    ellipse(0, 0, 100, 100);
  }
}


function mySelectEvent() {
  var selected = this.selected();
  if (selected === 'pear') {
    thing = selected;
    console.log("it's a pear!");
  }
}
