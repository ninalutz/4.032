'use strict';


function SoftFloat() {
  var ATTRACTION = 0.2;
  var DAMPING = 0.5;
  
  this.value = 0;
  this.velocity = 0;
  this.acceleration = 0;
  
  this.damping = 0;
  this.attraction = 0;
  
  this.targeting = false;
  this.target = 0;
  
  if (arguments.length === 0) {
    this.value = 0;
    this.damping = DAMPING;
    this.attraction = ATTRACTION;
    
  } else if (arguments.length === 1) {
    this.value = arguments[0];
    this.damping = DAMPING;
    this.attraction = ATTRACTION;
    
  } else if (arguments.length === 3) {
    this.value = arguments[0];
    this.damping = arguments[1];
    this.attraction = arguments[2];
  }


  this.set = function(v) {
    this.value = v;
    this.target = v;
    this.targeting = false;
  }
  
  
  this.pin = function() {
    if (arguments.length == 1) {
      this.target = arguments[0];
    }
    this.value = this.target;
    this.targeting = false;
  }
  
  
  this.get = function() {
    return this.value;
  }
  
  
  this.getInt = function() {
    return Math.floor(this.value);
  }


  this.update = function() {
    if (this.targeting) {
      this.acceleration += this.attraction * (this.target - this.value);
      this.velocity = (this.velocity + this.acceleration) * this.damping;
      this.value += this.velocity;
      this.acceleration = 0;
      if (Math.abs(this.velocity) > 0.00001) {
	return true;
      }
      this.value = this.target;
      this.targeting = false;
    }
    return false;
  }
  
  
  this.setTarget = function(t) {
    this.targeting = true;
    this.target = t;
  }


  this.getTarget = function() {
    return this.target;
  }
}