var m = 0;
var windspeed = .06;
var quantity = 300;
var stars;

//cloud variables
var t1 = .1;
var t2 = 10000;
var dark = 90;
var light = 255;
var clouds;
var snow;

//rain variables
var numDrops = 500;
var maxDrops = 600;
var minDrops = 600;
var horizon;
var ripplecolor = 130;
var dropcolor = 200;
var rainspeed = 2;
var ripplegrowth = 7;
var drops;
var darkrain;
var lightrain;

function setup() {
  createCanvas(375, 667);
  snow = [];
  darkrain = color(20);
 lightrain = color(183, 191, 204);

  for(var i = 0; i<quantity; i++){
    snow[i] = new Snow(round(random(1, 7)), 1, 7, round(random(0, .7)), random(0, width), random(0, height));
  }
     horizon = height/3;
    drops = [];
  for(i = 0; i< maxDrops; i++){
    d = new Drop(int(random(width)),-int(random(height*2)), int(map((horizon+int(random(horizon*2))),height*.35,height,0,height)),1280);
    drops.push(d);
  }
  
  stars = createGraphics(width, height);
  clouds = createGraphics(width, height);
  for(i = 0; i<500; i++){
    stars.fill(255);
    stars.noStroke();
    stars.ellipse(random(width), random(height), 1, 1);
  }
    clouds.loadPixels();
 //   darkandcloudy();
  // sunnyandcloudy();
   //cloudynight();

}

function draw() {
//  clearday();
  // clearnight();
 // raining();
    m+=windspeed;
    background(100);
    // fill(0);
snowing();
  fill(0);
  stroke(0);
   //image(clouds, 0, 0);
    turbines();
    base();
    
}

function clearday(){
   background(76, 198, 255);
}

function raining(){
    background(255);
  for (var i = 0; i <= height; i++) {
      var inter = map(i, 0, height, 0, 1);
      var c = lerpColor(lightrain, darkrain, inter);
      stroke(c);
      line(0, i, width, i);
    }
     for(var i = 0; i<drops.length; i++){
   drops[i].fall();
  } 
  
}

function snowing(){
  noStroke();
  //background(100);
  fill(255);
  
  for(var i = 0; i<quantity; i++){
    snow[i].update();
    snow[i].fall();
  }
    fill(255);
}

function clearnight(){
  background(0, 15, 70);
  image(stars, 0, 0);
}

function cloudynight(){
  background(0);
  image(stars, 0, 0);
    var xx=t1;
  var d = pixelDensity();
  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(0,0,map(noise(xx,yy,t2),0,1,dark,light), 140);
        clouds.pixels[4*(i + width*d*j)] = red(bright);
        clouds.pixels[4*(i + width*d*j) +1 ] = green(bright);
        clouds.pixels[4*(i + width*d*j) + 2] = blue(bright);
        clouds.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }
  t1 +=0.002;
  t2 +=0.001;

  clouds.updatePixels();
  
  
}

function darkandcloudy(){
var xx=t1;
  var d = pixelDensity();

  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(map(noise(xx,yy,t2),0,1,dark,light));
        clouds.pixels[4*(i + width*d*j)] = red(bright);
        clouds.pixels[4*(i + width*d*j) +1 ] = green(bright);
        clouds.pixels[4*(i + width*d*j) + 2] = blue(bright);
        clouds.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }
  t1 +=0.002;
  t2 +=0.001;

  clouds.updatePixels();
  
}

function sunnyandcloudy(){
var xx=t1;
  var d = pixelDensity();
  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(0,0,map(noise(xx,yy,t2),0,1,dark,light), 90);
        clouds.pixels[4*(i + width*d*j)] = blue(bright);
        clouds.pixels[4*(i + width*d*j) +1 ] = blue(bright);
        clouds.pixels[4*(i + width*d*j) + 2] = blue(bright);
        clouds.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }
  t1 +=0.002;
  t2 +=0.001;

  clouds.updatePixels();
  
}


var Snow = function(size, minim, maxim, direction, x, y){
  this.size = size;
  this.x = x;
  this.y = y;
  this.min = minim;
  this.max = maxim;
  this.direction = direction;
  }

Snow.prototype.update = function(){
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
}

Snow.prototype.fall = function() {
  if(this.direction === 0){
    this.x += map(this.size, this.min, this.max, .1, .5);
  }
    
  else{
    this.x -= map(this.size, this.min, this.max, .1, .5);
  }
  
  this.y += this.size + this.direction;
  
  if(this.x > width + this.size || this.x < -this.size || this.y > height + this.size){
    this.x = random(0, width);
    this.y = -this.size;
  }
}

var Drop = function(x, y, z, d){
  this.x = x;
  this.y = y;
  this.z = z;
  this.d = d;
  this.acel = rainspeed;
  this.d1 = d;
  this.prev_y = y;
  this.ripple = 0;
}

Drop.prototype.fall = function(){
  if(this.y > 0){
    this.acel+=0.25;
  }
  
  stroke(dropcolor, dropcolor, dropcolor,  map(this.z, 0, height, 0, 255));
  strokeWeight(2);
  if(this.y < this.z){
    this.y +=(this.acel+rainspeed);
    line(this.x, this.prev_y, this.x, this.y);
    this.prev_y = this.y;
  }
  
  else{
    noFill();
    stroke(ripplecolor, ripplecolor, ripplecolor, ripplecolor-map(this.ripple, 0, this.d, 0, 255));
    strokeWeight(map(this.ripple, 0, this.d, 0, rainspeed));
    this.d = this.d1 + (this.y - height)*rainspeed;
    ellipse(this.x, this.y, this.ripple/5, this.ripple/20);
    this.ripple+=ripplegrowth;
        if(this.ripple > this.d){
          this.ripple = 0;
          this.acel = 0;
          this.x = random(width);
          this.y = random(height*2);
          this.prev_y = this.y;
          this.d = this.d1;
        }
  }
  
}




function turbines(){
  ellipseMode(CENTER);
  push();
  translate(width/2, height-200);
  rotate(m);
  rotate(PI/.9);
  ellipse(0, -48, 15, 100);
  rotate(PI/5.0);
  ellipse(45, -1.5, 100, 15);
  rotate(PI/-2.7);
  ellipse(-45, -.5, 100, 15);
  pop();

}

function base(){
  rectMode(CENTER);
  rect(width/2, height, 10, 410);
  ellipse(width/2, height-200, 15, 15);

}
