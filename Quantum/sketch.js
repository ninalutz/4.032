var cubit, mil;
var switchtimes = [];
var duration = 4000;

function setup() {
  //createCanvas(displayWidth - 50, displayHeight -200, WEBGL);
  createCanvas(displayWidth - 200, displayHeight -200);
  for(var i = 0; i<20; i++){
    switchtimes[i] = duration + duration*i;
  }
  initWaves();
}

function draw() {
  mil = millis();
  // quibit();
  textAlign(CENTER);
  textSize(20);
  translate(width/2);
  Slide2();

  //
  // if(mil < switchtimes[0]){
  //   Intro();
  // }
  // else if (mil < switchtimes[1]){
  //   Slide1();
  // }
  // else if (mil < switchtimes[2]){
  //   Slide2();
  // }
  // else if (mil < switchtimes[3]){
  //   Slide3();
  // }
  // else if (mil < switchtimes[4]){
  //   Slide4();
  // }
  // else if (mil < switchtimes[5]){
  //   Slide5();
  // }
  // else if (mil < switchtimes[6]){
  //   Slide6();
  // }
  // else if (mil < switchtimes[7]){
  //   Slide7();
  // }
  // else if (mil < switchtimes[8]){
  //   Slide8();
  // }
  // else if (mil < switchtimes[9]){
  //   Slide9();
  // }
  // else if (mil < switchtimes[10]){
  //   Slide10();
  // }
  // else if (mil < switchtimes[11]){
  //   Slide11();
  // }
  // else if (mil < switchtimes[12]){
  //   Slide12();
  // }
  // else if (mil < switchtimes[13]){
  //   Slide13();
  // }
  // else if (mil < switchtimes[14]){
  //   Slide14();
  // }
  // else if (mil < switchtimes[15]){
  //   Slide15();
  // }
  // else if (mil < switchtimes[16]){
  //   Slide16();
  // }
  // else if (mil < switchtimes[17]){
  //   Slide17();
  // }
  // else if (mil < switchtimes[18]){
  //   Slide18();
  // }
  // else if (mil < switchtimes[19]){
  //   Slide19();
  // }
}
