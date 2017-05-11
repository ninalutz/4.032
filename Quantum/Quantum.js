var cubit, mil;
var switchtimes = [];
var duration = 4000;
var cube, cubeclosed, slide8, slide9, slide10, ORGate;

function preload(){
  cube = loadImage("CubeOpen.png");
  cubeclosed = loadImage("CubeClosed.png");
  slide8 = loadImage("Slide8.jpg");
  slide9 = loadImage("Slide9.jpg");
  slide10 = loadImage("Slide10.jpg");
  ORGate = loadImage("gate.png")
}

function setup() {
  createCanvas(displayWidth - 200, displayHeight -200);
  initSwitches();
  initWaves();
  var color1 = color(255, 0, 0);
  var color2 = color(0, 0, 255);
  // initBalls(width/2 - 20, height, 50, 10, balls1, .9, color1, 80);
  // initBalls(width - 100, height, 50, width/2 + 20, balls2, .05, color2, 40);
  switchtimes[0] = true;
}
var switchthing = 0;
function initSwitches(){
  for(var i = 0; i<11; i++){
    switchtimes[i] = false
  }
}

function draw() {

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
    Slide5();
  }
  if(switchtimes[6]){
    background(27, 28, 30);
    Slide6();
  }
  if(switchtimes[7]){
    // background(27, 28, 30);
    Slide7();
  }
  if(switchtimes[8]){
    background(27, 28, 30);
    Slide8();
  }
  if(switchtimes[9]){
    background(27, 28, 30);
    Slide9();
  }
  if(switchtimes[10]){
    background(27, 28, 30);
    Slide10();
  }

}
