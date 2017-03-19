// declare the name 'grid' for later use
var grid;


function setup() {
  createCanvas(375, 667);

  // create a grid with these dimensions
  grid = new Grid({
    "margin": 36,
    "columns": 3,
    "gutter": 12,
    "rows": 7
  });
}


function draw() {
  background(255);
  // nicer cursor for use when positioning
  cursor(CROSS);
  
  // show the grid
  grid.display();
  
  // your code goes here
}


function mousePressed() {
  // whenever the mouse is clicked, print the location to the console
  print(mouseX + ", " + mouseY);
}


function keyPressed() {
  // when a key is pressed, let the grid know
  grid.keyPressed();
}
