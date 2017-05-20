// 16
// + put a white rectangle behind the plot to tidy it up
// + set the color of the points in the display() function

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
    entry.display();
  });
}


function DataPoint(idx, amt) {
  var index = idx;
  var amount = amt;
  
  var x = map(index, 0, dataCount-1, bounds.left, bounds.right);
  var y = map(amt, dataMin, dataMax, bounds.bottom, bounds.top);

  this.display = function() {
    // color the dots in gray, with no outline
    fill(96);
    noStroke();
    ellipse(x, y, 8, 8);
  }
}
