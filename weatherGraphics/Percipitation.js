// var Snow = function(size, min, max, direction, x, y){
//   this.size = size;
//   this.x = x;
//   this.y = y;
//   this.min = min;
//   this.max = max;
//   this.direction = direction;
//   }

// Snow.prototype.disp(){
//   fill(255);
//   ellipse(this.x, this.y, this.size, this.size);
// }

// Snow.prototype.fall(){
//   if(this.direction === 0){
//     this.x += map(this.size, this.min, this.max, .1, .5);
//   }
    
//   else{
//     this.x -= map(this.size, this.min, this.max, .1, .5);
//   }
  
//   this.y += this.size + this.direction;
  
//   if(this.x > width + this.size || this.x < -this.size || this.y > height + this.size){
//     this.x = random(0, width);
//     this.y = -this.size;
//   }
// }

// var Drop = function(x, y, z, d){
//   this.x = x;
//   this.y = y;
//   this.z = z;
//   this.d = d;
//   this.acel = rainspeed;
//   this.d1 = d;
//   this.prev_y = y;
//   this.ripple = 0;
// }

// Drop.prototype.fall = function(){
//   if(this.y > 0){
//     this.acel+=0.25;
//   }
  
//   stroke(dropcolor, dropcolor, dropcolor,  map(this.z, 0, height, 0, 255));
//   strokeWeight(2);
//   if(this.y < this.z){
//     this.y +=(this.acel+rainspeed);
//     line(this.x, this.prev_y, this.x, this.y);
//     this.prev_y = this.y;
//   }
  
//   else{
//     noFill();
//     stroke(ripplecolor, ripplecolor, ripplecolor, ripplecolor-map(this.ripple, 0, this.d, 0, 255));
//     strokeWeight(map(this.ripple, 0, this.d, 0, rainspeed));
//     this.d = this.d1 + (this.y - height)*rainspeed;
//     ellipse(this.x, this.y, this.ripple/5, this.ripple/20);
//     this.ripple+=ripplegrowth;
//         if(this.ripple > this.d){
//           this.ripple = 0;
//           this.acel = 0;
//           this.x = random(width);
//           this.y = random(height*2);
//           this.prev_y = this.y;
//           this.d = this.d1;
//         }
//   }
  
// }