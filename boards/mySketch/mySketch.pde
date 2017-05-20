/**
* boards in line
*
* @author aadebdeb
* @date 2017/01/26
*/

void setup(){
  size(640, 480);
  rectMode(CENTER);
  fill(20);
  stroke(255, 251, 249);
  strokeWeight(4);
}

void draw(){
  background(255, 251, 249);
  translate(width / 2, height / 2);
  int num = 10;
  float intervalX = map(mouseX, 0, width, 40, -40);
  float intervalY = map(abs(mouseX - width / 2), 0, width / 2, 0, -20);
  float rectX = 100;
  float rectY = 200;
  float tilt = map(mouseX, 0, width, -20, 20);
  for(int i = 2; i > 0; i--){
    pushMatrix();
    float rhytm = map(pow(abs(sin(frameCount * 0.03 - i * 0.3)), 50), 0, 1, 0, -50)
                * map(abs(mouseX - width / 2), 0, width / 2, 0, 1);
    translate(intervalX * (i - num / 2.0), intervalY * (i - num / 2.0) + rhytm);
    beginShape();
    vertex(-rectX / 2.0, -rectY / 2.0 + tilt);
    vertex(rectX / 2.0, -rectY / 2.0 - tilt);
    vertex(rectX / 2.0, rectY / 2.0 - tilt);
    vertex(-rectX / 2.0, rectY / 2.0 + tilt);
    endShape(CLOSE);
    popMatrix();
  }
}