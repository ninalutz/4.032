// 20
// + this version sorts the data when a key is pressed
// + and the getAmount() function has been added to DataPoint

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


function keyPressed() {
  // sort each element in the array by comparing their difference
  data.sort(function(a, b) {
    return a.getAmount() - b.getAmount();
  });
  for (var i = 0; i < data.length; i++) {
    data[i].setIndex(i);
  }
}


function DataPoint(idx, amt) {
  var index = idx;
  var amount = amt;
  
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;

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
    var newX = map(index, 0, dataCount-1, bounds.left, bounds.right);
    // if this is the first time it's being set, create the SoftFloat
    if (x == null) {
      x = new SoftFloat(newX);
    } else {
      x.setTarget(newX);
    }
  }

  // this sets the actual value for this data point
  this.setAmount = function(amt) {
    amount = amt;
    // use setTarget() instead of y= so that it will animate
    var newY = map(amt, dataMin, dataMax, bounds.bottom, bounds.top);
    if (y == null) {
      y = new SoftFloat(newY);
    } else {
      y.setTarget(newY);
    }
  }
  
  // function to get the data point's value so it can be sorted
  this.getAmount = function() {
    return amount;
  }
  
  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setIndex(idx);
  this.setAmount(amt);
}
