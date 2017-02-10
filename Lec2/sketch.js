var increment, grad, start, end;

function setup() {
  createCanvas(400, 400);
  increment = .2;
  start = 0;
  end = start + increment;
  grad = 15;
  frameRate(5)
}

function draw() {
  background(200)
  stroke(255)
  ellipseMode(CENTER)

  increment = .2;
  start = 0;
  end = start + increment;
  grad = 10;

 for(var i = 0; i< TWO_PI + 1.2; i++){
    fill(grad)
    arc(width/2, height/2, 100, 100, start, end)
    start+=increment
    end+=increment
    grad+=8
    i = end
}
}