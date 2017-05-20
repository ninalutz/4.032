var network;
function setup() {
  createCanvas(640, 360);
  network = new Network(width/2, height/2);

  var a = new Neuron(50, 100);
  var b = new Neuron(50, 200);
  var c = new Neuron(200, 150);

  network.connect(a, c, 1);
  network.connect(b, c, 0);

  network.addNeuron(a);
  network.addNeuron(b);
  network.addNeuron(c);
}

function draw() {
  background(27, 28,30);
  network.update();
  network.display();
  console.log(network.connections[0].sending);
  if(frameCount % 30 == 0){
    network.feedforward(1);
  }
}

function Connection(from, to, w){
  this.a = from;
  this.b = to;
  this.weight = w;
  this.sending;
  this.output = 0;

  this.feedforward = function(val){
    // console.log("fjasf");
    this.output = this.val*this.weight;
    this.sender = this.a.location.copy();
    this.sending = true;
  }

  this.update = function(){
    if(this.sending){
      console.log("Connection update");
      this.sender.x = lerp(this.sender.x, this.b.location.x, 0.05);
      this.sender.y = lerp(this.sender.y, this.b.location.y, 0.05);
      //var d = dist(this.sender, this.b.location);
      var d = sqrt((this.sender.x - this.b.location.x)*(this.sender.x - this.b.location.x) + (this.sender.y - this.b.location.y)*(this.sender.y - this.b.location.y));
      if (d < 0) {
        //this.b.feedforward(this.output);
        this.sending = false;
      }
    }
  }

  this.display = function(){
    var bit = color(255);
    if(this.weight == 0){
      bit = color(55, 123, 232, 150);
    }
    if(this.weight == 1){
      bit = color(255, 0, 0, 150);
    }
    strokeWeight(2);
    stroke(bit);
    line(this.a.location.x, this.a.location.y, this.b.location.x-20, this.b.location.y);

    if (this.sending) {
      fill(bit);
      stroke(255);
      strokeWeight(1);
      ellipse(this.sender.x, this.sender.y, 16, 16);
    }

  }
}


function Network(x, y){
    this.location = createVector(x, y);
    this.neurons = [];
    this.connections = [];

    this.addNeuron = function(n){
      this.neurons.push(n);
    }
    this.connect = function(a, b, weight){
        var c = new Connection(a, b, weight);
        a.addConnection(c);
        this.connections.push(c);
    }
    this.feedforward = function(input){
      for(var i = 0; i < this.neurons.length - 1; i++){
        this.neurons[i].feedforward(input);
      }
    }
    this.update = function(){
      for(var i = 0; i< this.connections.length; i++){
        this.connections[i].update();
      }
    }
    this.display = function(){
      push();
      //translate(location.x, location.y);
      this.neurons[this.neurons.length-1].display();

      for(var i = 0; i<this.connections.length; i++){
        this.connections[i].display();
      }
      for(var i = 0; i<this.neurons.length-1; i++){
        this.neurons[i].display();
      }
      pop();
    }
  }

  function Neuron(x, y){
    this.location = createVector(x, y);
    this.sum = 0;
    this.connections = [];
    this.r = 32;

    this.addConnection = function(c){
      this.connections.push(c);
    }

    this.feedforward = function(input){
      this.sum+= input;
      if(this.sum > 1){
        this.fire();
        this.sum = 0;
      }
    }
    this.fire = function(){
      this.r = 64;
      for(var i = 0; i<this.connections.length; i++){
        this.connections[i].feedforward(this.sum);
      }
    }
    this.display = function(){
      stroke(255);
      strokeWeight(1);
      noStroke();
      fill(255);
      ellipse(this.location.x, this.location.y, this.r, this.r);
      this.r = lerp(this.r,32,0.1);
    }
  }
