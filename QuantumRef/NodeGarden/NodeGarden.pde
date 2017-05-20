// Ball class
class Ball
{
  PVector position;
  PVector velocity;
  float radius;
  color colour;

  float mass = 1.0; //1.0;
  float gravity = 0.8;
  float bounce = 1.0; // default = -0.6

  Ball(PVector position, PVector velocity, float radius, color colour)
  {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.colour = colour;
  }

  void move()
  {
    velocity.y += gravity;
    velocity.y += 0.1;
    position.y += velocity.y;
    position.x += velocity.x;
  }

  void display()
  {
    fill(colour);
    ellipse(position.x, position.y, radius * 2, radius * 2);
  }
}


void checkWalls(Ball ball)
{
  if(ball.position.x + ball.radius > width)
  {
    ball.position.x = width - ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.x < ball.radius)
  {
    ball.position.x = ball.radius;
    ball.velocity.x *= ball.bounce;
  }
  else if(ball.position.y > height - ball.radius)
  {
    ball.position.y = height - ball.radius;
    ball.velocity.y *= ball.bounce;
  }
  else if(ball.position.y < ball.radius)
  {
    ball.position.y = ball.radius;
    ball.velocity.y *= ball.bounce;
  }
}
// nodeGarden using vectors
int numBalls = 40;
Ball[]balls = new Ball[numBalls];
color[]colours = new color[numBalls];
int minRadius = 2;
int maxRadius = 20;

void setup()
{
  size(900, 460);
  background(0);
  smooth();
  noStroke();
  for(int i = 0; i < numBalls; i++)
  {
    float radius = random(minRadius, maxRadius);
    colours[i] = color(230, radius + 50);
    PVector startPosition = new PVector(random(width), random(height));
    PVector startVelocity = new PVector(random(-4, 4), random(-4, 4));
    balls[i] = new Ball(startPosition, startVelocity, radius, colours[i]);
    balls[i].bounce = -1;
    balls[i].mass = radius / 5;
  }
}
void draw()
{
  noStroke();
  fill(0, 5);
  rect(0,0,width,height);
  for(int i = 0; i < numBalls; i++)
  {
    balls[i].move();
    balls[i].display();
    checkWalls(balls[i]);
    balls[i].velocity.limit(maxRadius - balls[i].radius);
  }
  for(int i = 0; i < numBalls - 1; i++)
  {
    for(int j = i + 1; j < numBalls; j++)
    {
      spring(balls[i], balls[j]);
    }
  }
}
float minDist = 200;
float springAmount = 0.00001;

void spring(Ball ballA, Ball ballB)
{
  float dx = ballA.position.x - ballB.position.x;
  float dy = ballA.position.y - ballB.position.y;
  float dist = sqrt(dx*dx + dy*dy);

  if(dist < minDist)
  {
    PVector a = new PVector(dx * springAmount, dy * springAmount);
    //float ax = dx * springAmount;
    //float ay = dy * springAmount;
    ballA.velocity.x += a.x / ballA.mass;
    ballA.velocity.y += a.y / ballA.mass;
    ballB.velocity.x -= a.x / ballB.mass;
    ballB.velocity.y -= a.y / ballB.mass;

    strokeWeight(1);
    stroke(255,50);
    line(ballA.position.x, ballA.position.y, ballB.position.x, ballB.position.y);

  }
}
