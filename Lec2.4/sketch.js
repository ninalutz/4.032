function setup() {
  createCanvas(400, 400)
}

function draw() {
  noFill()
  background(0, 10, 255, 50)
  // var s = map(mouseX, 0, width, 0, 150);
  // ellipse(width/2, height/2, s, s)
  
  var s = map(second(), 0, 60, 0, 400)
  
  ellipse(width/2, height/2, s, s)
  
}