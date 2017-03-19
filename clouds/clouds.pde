void setup(){
size(375, 667);
  loadPixels();
}
float t1 = 0.1;
float t2 = 10000;
float dark = 100;
float light = 255;

void draw(){



float xx=t1;
  for(int i = 0; i<width; i++){
    float yy=t2;
    for(int j = 0; j<height; j++){
      float bright = map(noise(xx,yy,t2),0,1,dark,light);
      pixels[i + j *width] = color(bright, bright, bright); 
      yy += 0.005;

    }
    xx += 0.003;

  }
  t1 +=0.002;
  t2 +=0.001;
  updatePixels();
}
