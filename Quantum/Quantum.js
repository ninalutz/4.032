var cubit, mil;
var switchtimes = [];
var duration = 4000;
var cube, arrow, arrow2;4

function preload(){
  cube = loadImage("CubeOpen.png");
  arrow = loadImage("arrow.png");
  arrow2 = loadImage("arrow2.png");
}

function setup() {
  textFont("Roboto");
   createCanvas(1888, 1021);
  //createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, windowHeight);
  initSwitches();
  initWaves();
  var color1 = color(255, 0, 0);
  var color2 = color(0, 0, 255);
  switchtimes[0] = true;
}
var switchthing = 0;
function initSwitches(){
  for(var i = 0; i<10; i++){
    switchtimes[i] = false
  }
}

function draw() {
  // scale(.8);
  mil = millis();
  textAlign(LEFT);
  textSize(20);
  translate(width/2);
  // background(27, 28, 30);

  if(switchtimes[0]){
    background(27, 28, 30);
    Intro();
  }
  if(switchtimes[1]){
    background(27, 28, 30);
    switchtimes[0] = false;
    switchtimes[10] = false;
    Slide1();
  }
  if(switchtimes[2]){
    background(27, 28, 30);
    Slide2();
  }
  if(switchtimes[3]){
    background(27, 28, 30);
    Slide3();
  }
  if(switchtimes[4]){
    background(27, 28, 30);
    Slide4();
  }
  if(switchtimes[5]){
    background(27, 28, 30);
    Slide6();
  }
  if(switchtimes[6]){
    // background(27, 28, 30);
    Slide7();
  }
  if(switchtimes[7]){
    background(27, 28, 30);
    Slide8();
  }
  if(switchtimes[8]){
    background(27, 28, 30);
    Slide9();
  }
  if(switchtimes[9]){
    background(27, 28, 30);
    Slide10();
  }

  image(arrow, width-100, 50, 50, 50);
  if(switchthing > 0){
  image(arrow2, 50, 50, 50, 50);
}
}
