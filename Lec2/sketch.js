function setup() {
  createCanvas(400, 400)
  frameRate(40)
}

function draw() {
  
  background(163, 255, 224, 60)
  
  // stroke(0, 50)
  line(mouseX + random(40), mouseY + random(40), width/2, height)
  line(mouseX + random(40), mouseY - random(40), width/2, height)
  line(mouseX + random(40), mouseY - random(20), width/2, height)
  

 if(mouseIsPressed){
     noStroke()
  fill(255, 0, 0)
  ellipse(mouseX + random(40), mouseY + random(40), 20, 20)
  fill(0, 255, 0)
  ellipse(mouseX + random(60), mouseY - random(40), 20, 20)
  fill(0, 0, 255)
  ellipse(mouseX + random(60), mouseY - random(20), 20, 20)
    stroke(255, 250)
    noFill()
  ellipse(mouseX+20, mouseY, random(200), random(200))
  
  }
  
  else{
 noStroke()
  fill(200)
  ellipse(mouseX + random(40), mouseY + random(40), 20, 20)
  fill(180)
  ellipse(mouseX + random(60), mouseY - random(40), 20, 20)
  fill(255)
  ellipse(mouseX + random(60), mouseY - random(20), 20, 20)
  
  stroke(0, 0, 0, 50)
  noFill()
  ellipse(mouseX+20, mouseY, random(200), random(200))
  
  }
}