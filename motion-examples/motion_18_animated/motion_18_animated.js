// 18
// + x and y have been changed to SoftFloat variables
// + entry.update() is called from draw()
// + setTarget() is used instead of x= and y= inside the DataPoint class

var data = [];
var dataCount = 20;
var dataMin = 0;
var dataMax = 100;

var bounds = { };


function setup() { 
  createCanvas(960, 540);
  
  bounds.left = 90;
  bounds.right = width - 90;
  bounds.top = 60;
  bounds.bottom = height - 60;

  for (var i = 0; i < dataCount; i++) {
    data.push(new DataPoint(i, random(dataMin, dataMax)));
  }
}


function draw() { 
  background(240);
  
  // put a white rectangle behind the plot
  fill(255);
  rectMode(CORNERS);
  rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
  
  // use gray for the dots, turn off stroke
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}


// set new data when the mouse is pressed
function mousePressed() {
  // sets each entry in the array to a random number
  data.forEach(function(entry) {
    entry.setAmount(random(dataMin, dataMax));
  });
}


function DataPoint(idx, amt) {
  var index = idx;
  var amount = amt;
  
  // x & y will be continually updating
  var x = new SoftFloat();
  var y = new SoftFloat();

  // this handles updating any animated variables
  this.update = function() {
    x.update();
    y.update();
  }

  this.display = function() {
    // color the dots in gray, with no outline
    fill(96);
    noStroke();
    ellipse(x.value, y.value, 8, 8);
  }
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setIndex = function(idx) {
    index = idx;
    // use setTarget() instead of x= so that it will animate
    x.setTarget(map(index, 0, dataCount-1, bounds.left, bounds.right));
  }

  // this sets the actual value for this data point
  this.setAmount = function(amt) {
    amount = amt;
    // use setTarget() instead of y= so that it will animate
    y.setTarget(map(amt, dataMin, dataMax, bounds.bottom, bounds.top));
  }
  
  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setIndex(idx);
  this.setAmount(amt);
}
