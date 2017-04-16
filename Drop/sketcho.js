var dropdown;

function setup() {
  dropdown = createSelect();
  dropdown.position(20, 65);
  dropdown.option('name 1','value1');
  dropdown.option('name 2','value2');
  dropdown.option('name 3','value3');
  dropdown.option('pear','pear');

  dropdown.changed(mySelectEvent);
  createCanvas(500, 500);


}

var thing;

function draw() {
  background(0);
  if (dropdown.selected() === 'pear') {
    ellipse(0, 0, 100, 100);
  }
}

function mySelectEvent() {
  var selected = this.selected();
  if (selected === 'pear') {
    thing = selected;
    console.log("it's a pear!");
  }
}
