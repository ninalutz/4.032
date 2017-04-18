var spawnCount;
var leftBorder, leftBorder2;
var rightBorder, rightBorder2;
var particles = [];
var obstacles = [];
var obstacles2 = [];
var comp;
var mil;
var introtime = 10000;

var nameTable;
var causesTable;
var countriesTable;
var colorsCauses = {};
var mouseCountries = {};
var selected = [];

var img;

function setup() {
  createCanvas(960, 540);
  img = loadImage("data/arrows.png");

  nameTable = loadTable("data/countries.csv", "csv", "header");
  causesTable = loadTable("data/causes.csv", "csv", "header");
  leftBorder = width/2 + 100;
  rightBorder = width - 20;
  leftBorder2 = 20;
  rightBorder2 = width/2-100;

  for(var i = 0; i<6; i++){
    var HelCol = color(	244, 43, 38);
    if (i == 0){
      var size = 60;
      var y = height/2 + 150;
      var x = leftBorder + 200;
    }
    if(i == 1){
      var size = 20;
      var y = height/2 + 150;
      var x = rightBorder - 60;
    }
    if(i == 2){
      var size = 40;
      var y = height/2 + 150;
      var x = leftBorder + 50;
    }
    if (i == 3){
      var size = 60;
      var y = height/2 + 50;
      var x = leftBorder2 + 200;
    }
    if(i == 4){
      var size = 20;
      var y = height/2 + 50;
      var x = rightBorder2 - 60;
    }
    if(i == 5){
      var size = 40;
      var y = height/2 + 50;
      var x = leftBorder2 + 50;
    }
      obstacles[obstacles.length] = new Obstacle(x, y, size, HelCol);
  }
  for(var i = 0; i<13; i++){
    var HelCol = color(255 - i*20, i*20, i*40);
    // colorsCauses[causes.getColumn("cause")[i]] = HelCol;
    var per = random(40, 100);
    var x = random(100, width-100);
    var y = random(150, height-50);
    obstacles2[obstacles2.length] = new Obstacle(x, y, per, HelCol);
  }
}

function draw() {
  if (selected.length == 2){
    comp = true;
  }
  if(comp){
    spawnCount = 1;
  }
  else{
    spawnCount = 5;
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
  image(img, 5, 5, 30, 30);
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

    if (particles[i].pos.y > height - 30) {
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
  textSize(15);
  text("Life expectancy: ", leftBorder + (rightBorder-leftBorder)/2, height-10);
  text("Life expectancy: ", leftBorder2 + (rightBorder2-leftBorder2)/2, height-10);
}

var vecs = [];

function MasterList(){
  background(0);
  noStroke();
  fill(225);
  textSize(18);
  textAlign(CENTER);
  text("Now let's compare them in different countries. Select two to compare.", width/2, 35);
  textAlign(LEFT);
  var k = 0;

  textSize(12.5);

  for(var i = 0; i<nameTable.getRowCount(); i++){
    text(nameTable.getColumn("name")[i], 105*(int(i/20)) + 30, 22*(k+1) + 50);
    vecs[i] = createVector(105*(int(i/20)) + 30 , 22*(k+1) + 50);
    mouseCountries[nameTable.getColumn("name")[i]] = vecs[i];
    k++;
    if(k >= 20){
      k = 0;
    }
  }

  for(var i = 0; i<selected.length; i++){
    fill(255, 0, 0);
    text(selected[i], mouseCountries[selected[i]].x, mouseCountries[selected[i]].y);
  }

}

var thing1 = 100;
function Intro(){
  background(0);
  noStroke();
  fill(225);
  textSize(20);
  textAlign(CENTER);
  thing1+=5;


  if(thing1 < width){
    for(var i = 0; i<13; i++){
      var HelCol = color(255 - i*20, i*20, i*40);
      colorsCauses[causesTable.getColumn("cause")[i]] = HelCol;
    }
    text("Life is a journey,", width/2, height/2 - 50);
    text("Birth", 100, height/2);
    text("Death", width-100, height/2 );
    if(thing1 < width-100){
    ellipse(thing1, height/2 + 30, 20, 20);
    }
  else{
    ellipse(width-100, height/2 + 30, 20, 20);
  }
}

else{
  text("We all have these journeys, but some end early because of obstacles.", width/2, 40);
  for (var num = 0; num < spawnCount; num++) {
    var x = random(50, width-50);
    var size = 4;
    var newParticle = new Particle(x, 100, size, color(255));
    particles[particles.length] = newParticle;
  }
  var k = 0;
  push();
  translate(60, 45);
  for(var i = 0; i<13; i++){
    textSize(14);
    textAlign(CENTER);
    fill(colorsCauses[causesTable.getColumn("cause")[i]]);
    text(causesTable.getColumn("cause")[i], (i+1)*60, 20*(k+1));
    k++;
    if(k >= 2){
      k = 0;
    }
  }
  pop();

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


function mousePressed(){


  if(!comp && mil > introtime){
    for(var i = 0; i<vecs.length; i++){
      if(abs(mouseX - vecs[i].x) < 30 && abs(mouseY - vecs[i].y) < 10){
        append(selected, nameTable.getColumn("name")[i]);
      }
    }
  }
  else if (mil > introtime && comp && mouseX > 0 && mouseX < 30 && mouseY > 0 && mouseY < 30 ){
    comp = !comp;
    selected = [];
    print("THING");
  }

}
