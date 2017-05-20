// 23
// + added 'countryName' variable
// + countryName is shown in the draw() function
// + mousePressed() now randomly selects a country to display

var data = [];
var dataCount;
var dataMin = 0;
var dataMax = 100;

var dataTable;
var countryCode = "USA";
var countryName;

var bounds = { };


function preload() {
  dataTable = loadTable("data/LFSFFE15.csv", "header");
}


function setup() { 
  createCanvas(960, 540);
  
  bounds.left = 90;
  bounds.right = width - 90;
  bounds.top = 60;
  bounds.bottom = height - 60;

  // one data point for each year, so calculate how many years are available
  dataCount = (2012-1995) + 1;
  
  // use Country Name instead of Country Code if you like,
  // but it's easier to avoid typos w/ the 3-digit country codes
  var row = dataTable.findRow('USA', 'Country Code');
  countryName = row.get('Country Name');
  
  // set the data points based on what's in the file
  for (var i = 0; i < dataCount; i++) {
    // use "String()" to specify that the column name is text, not a number
    var columnName = String(1995 + i);
    data.push(new DataPoint(i, row.getNum(columnName)));
  }
}


function draw() {
  background(240);
  
  // put a white rectangle behind the plot
  fill(255);
  rectMode(CORNERS);
  rect(bounds.left, bounds.top, bounds.right, bounds.bottom);

  fill(0);
  textAlign(LEFT);
  text(countryName, bounds.left, bounds.top - 15);
  
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}


// jump to a random country on mouse press
function mousePressed() {
  var randomRow = floor(random(177));  // there are 177 lines of country data
  var code = dataTable.get(randomRow, 'Country Code');
  setCountryCode(code);
}


// same as what's in setup, just condensed a little
var setCountryCode = function(code) {
  var row = dataTable.findRow(code, 'Country Code');
  countryName = row.get('Country Name');
  
  // set the data points based on what's in the file
  for (var i = 0; i < dataCount; i++) {
    var columnName = String(1995 + i);
    data[i].setAmount(row.getNum(columnName));
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

    cursor(HAND);
    // if the distance from the mouse to the data point is within 10 pixels
    if (dist(mouseX, mouseY, x.value, y.value) < 10) {
      textAlign(CENTER);
      // draw the value of this data point (using 1 decimal point)
      text(nf(amount, 0, 1), x.value, y.value - 10);
    }
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
