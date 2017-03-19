/*
  1. Add 'var grid' to the stop of your sketch

  2. Inside setup(), add one of these:
  
  // create a new grid with the same margins on all sides 
  grid = new Grid({
    "margin": 36,
    "columns": 4,
    "gutter": 12,
    "rows": 10
  });

  //  create a grid with uneven margins 
  grid = new Grid({
    "top": 36,
    "bottom": 48,
    "left": 12, 
    "right": 12,
    "columns": 4,
    "gutter": 12,
    "rows": 10
  });

  3. Add 'grid.display()' to your draw() function 
  
  4. Add 'grid.keyPressed()' to your keyPressed() function, 
     or if you don't have one already, add this:
     
     function keyPressed() {
       // when a key is pressed, let the grid know
       grid.keyPressed();
     }
*/
function Grid(dimensions) {
  this.color = color(238, 130, 238);

  if (dimensions.margin) {
    this.margin = {
      top: dimensions.margin,
      bottom: dimensions.margin,
      left: dimensions.margin,
      right: dimensions.margin
    }
  } else {
    this.margin = {
      top: dimensions.top, // px
      bottom: dimensions.bottom, // px
      left: dimensions.left, // px
      right: dimensions.right // px
    }
  }

  this.gutter = dimensions.gutter, // px
  this.columns = dimensions.columns,
  this.rows = dimensions.rows,

  this.columnWidth = function() {
    return (width - this.margin.left - this.margin.right -
            (this.columns - 1) * this.gutter) / this.columns;
  },

  this.columnHeight = function() {
    return (height - this.margin.top - this.margin.bottom);
  },

  this.rowHeight = function() {
    return (this.columnHeight()) / this.rows;
  },
    
  this.visible = true,
  this.marginVisible = true,
  this.rowVisible = true,
  this.columnsVisible = true,
  this.crossVisible = true;
    
  this.toggleVisibility = function() {
    if (this.marginVisible && this.rowVisible &&
        this.columnsVisible && this.crossVisible) {
      this.visible = true;
    } else if (!this.marginVisible && !this.rowVisible &&
             !this.columnsVisible && !this.crossVisible) {
      this.visible = false;
    }
    this.visible = !this.visible;
    this.marginVisible = this.visible;
    this.rowVisible = this.visible,
    this.columnsVisible = this.visible,
    this.crossVisible = this.visible;
  }

  this.display = function() {
    push();

    // columns
    if (this.columnsVisible) {
      fill(this.color);
      noStroke();
      rectMode(CORNER);
      for (var i = 1; i < this.columns; i++) {
        rect(this.margin.left + i * this.columnWidth() + (i - 1) * this.gutter,
          this.margin.top,
          this.gutter,
          this.columnHeight());
      }
    }

    // rows
    if (this.rowVisible) {
      noFill();
      stroke(this.color);
      strokeWeight(1);
      for (var i = 1; i < this.rows; i++) {
        var lineheight = this.margin.top + i * this.rowHeight();
        line(this.margin.left, lineheight,
          width - this.margin.right, lineheight);
      }
    }

    // margin
    if (this.marginVisible) {
      noFill();
      stroke(this.color);
      strokeWeight(1);
      rectMode(CORNERS);
      rect(this.margin.top,
        this.margin.left,
        width - this.margin.right,
        height - this.margin.bottom);
    }

    // crosshairs
    if (this.crossVisible) {
      noFill();
      stroke(this.color);
      strokeWeight(1);
      line(0, mouseY, width, mouseY);
      line(mouseX, 0, mouseX, height);

      // tooltip
      noStroke();
      //fill(this.color);
      fill('black');
      //text(mouseX + " x, " + mouseY + " y", mouseX + 10, mouseY - 10);
      text("x=" + mouseX + ", y=" + mouseY, mouseX + 10, mouseY - 10);
    }
    pop();
    
    this.help.display();
  }


  this.help = {
    text: "H help\n" +
          "G grid\n" +
          "T crosshairs\n" +
          "C columns\n" + 
          "R rows\n",
          
    visible: true,

    display: function() {
      if (this.visible) {
        push();
        noStroke();
        fill(0);
        textAlign(LEFT, TOP);
        textSize(12);
        textLeading(18.75);
        text(this.text, grid.margin.left, grid.margin.top);
        pop();
      }
    }
  }
  
  
  this.keyPressed = function() {
    if (key == 'g' || key == 'G') {
      grid.toggleVisibility();
    } else if (key == 'c' || key == 'C') {
      grid.columnsVisible = !grid.columnsVisible;
    } else if (key == 'r' || key == 'R') {
      grid.rowVisible = !grid.rowVisible;
    } else if (key == 'm' || key == 'M') {
      grid.marginVisible = !grid.marginVisible;
    } else if (key == 't' || key == 'T') {
      grid.crossVisible = !grid.crossVisible;
    } else if (key == 'h' || key == 'H') {
      grid.help.visible = !grid.help.visible;
    }
  };
};
