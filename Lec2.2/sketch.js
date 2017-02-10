function setup() {
  createCanvas(400, 400)
}

function draw() {
  //line(width/2, height/2, mouseX+random(20), mouseY + random(20))
  line(mouseY, height-mouseY, width/2 + mouseX, height/2)
  background(0, 244, 200, 70)
  fill(100)
  textSize(20)
  text("over here", mouseX, mouseY);
}