color c = color(19,19,56);//the secret colour
String word = "hello";
String allwords ="mass and velocity.";
PVector start  =new PVector(10, 60);
int tSize =92; //Textsize
ArrayList<particle> Points = new ArrayList<particle>();
int index=0;
float restZ=0;
int F = 0;
float CTime=50;//number of frames between words
int PNum =1200;//number of particles

void setup() {
  size(720, 480);
  frameRate(30);
  background(25);
  textSize(tSize);
  fill(c);
  text(word, start.x, start.y+tSize); //writing invisible text
  loadPixels(); //saving all pixels of the sketch
  for (int i = 0; i < PNum; i++) {//creating the particles
    Points.add(new particle(random(width),random(height)));
  }
}

void draw(){
  background(25);
  //println(restZ);
  strokeWeight(4);
  int Len = word.length();
  PVector RealPix;
      
  if (restZ<-50){
    restZ=CTime;
    for (particle P : Points) {//resetting particles and slowing them down
      P.target=false;
      P.velocity.mult(0.5);
    }
    String[] Arr = allwords.split(" ");
    word=Arr[F];//getting the next word
    start.x = int(random(10,width-word.length()*tSize/1.45));
    start.y = int(random(10,height-tSize*1.3));//positioning text inside the window
    fill(c);
    text(word, start.x, start.y+tSize);
    loadPixels();
    F++;
    if (F>=Arr.length){F=0;};
  }
  
  if(restZ == 1){
    delay(250);
  }

  
  restZ-=1;
  
  
  for (int i = 0; i < 13*PNum/(CTime-30); i++) {//checking random points in the area of the text
    RealPix=  new PVector(int(random(start.x, start.x+Len*tSize/1.45)),int(random(start.y, start.y+tSize*1.3)));
    int pixNr =int(RealPix.y*width + RealPix.x);
    color b= pixels[pixNr];
    if ((c == b)&&(restZ<CTime-20)&&(restZ>=10)){//if the point is on text
      particle point = Points.get(index);
      if (point.target==false){
        point.target=true;
        PVector desired = PVector.sub(RealPix, point.location);
        desired.div(restZ);
        point.velocity= desired;//kicking the particle in the direction of the point
      }
      index++;
      index=index%PNum;
    }
  }
  runP();//simulating and drawing the particles
}

void runP(){
  for (particle P : Points) {
    stroke(255,255,255 ,128/sqrt(P.velocity.mag()+1));
    P.location.add(P.velocity);
  
    point(P.location.x, P.location.y);
}
}

class particle{
  PVector location;
  PVector velocity;
  boolean target=false;
  particle(float x, float y) {
    location = new PVector(x, y);
    velocity = new PVector(0.0, 0.0);
  }
}

void keyPressed(){
  if(key == ' '){
    println(restZ);
  }
}