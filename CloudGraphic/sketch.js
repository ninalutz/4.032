var clouds;
var pink;
var t1 = 0.1;
var t2 = 10000;
var dark = 100;
var light = 255;

function setup() {
  createCanvas(500, 500);
  clouds = createGraphics(500, 500);
  clouds.loadPixels();
  drawClouds();
  print("DONE");
}

function draw() {
  background(255);
  image(clouds,0, 0);
}

function drawClouds(){
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