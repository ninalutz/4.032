var cubit;

function setup() {
  createCanvas(displayWidth - 50, displayHeight -100, WEBGL);
}

function draw() {
  background(20);
  pointLight(255, 255, 255, mouseX, mouseY, 50);
  
  if(frameCount % 50 == 0){
  ambientMaterial(250, 0, 0);
  }
  
    if(frameCount % 50 != 0){
  ambientMaterial(0, 0, 250);
  }

  rotateX(frameCount * 0.005);
  cylinder(200, 20, 50);
}