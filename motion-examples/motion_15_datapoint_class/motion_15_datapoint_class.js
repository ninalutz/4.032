// 15
// + this code picks up where we left off in the last class

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
    ellipse(x, y, 5, 5);
  }
}
