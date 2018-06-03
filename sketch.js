var tileSize = 50;
var tileRange = 3
var rise = 0;
var run = 3;
class rocket {
  constructor(xpos, ypos) {
    this.xpos = xpos
    this.ypos = ypos
  }
  display(rise, run) {
    var angle = atan2(rise, -run);
    push()
    translate(this.xpos, this.ypos)
    rotate(angle)
    rect(-15, -5, 30, 10);
    pop();
  }
  move(rise, run) {
    this.ypos += -rise;
    this.xpos += run;
  }
}

var bob = new rocket(200, 200);

function isMouseOver(xPos, yPos, xWidth, yLength) {
  if (mouseX >= xPos && mouseY >= yPos && mouseX <= xPos + xWidth && mouseY <= yPos + yLength) {
    return (true);
  }
  return (false);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  bob.display(rise, run);
  bob.move(rise, run);
  for (var y = -tileRange; y <= tileRange; y++) {
    fill(255)
    if (y == rise) {
      fill(255, 0, 0)
    }

    rect(width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10) * 2, tileSize, tileSize)
    text(y, width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10) * 2)
  }

  for (var y = -tileRange; y <= tileRange; y++) {
    fill(255)
    if (y == run) {
      fill(255, 0, 0)
    }

    rect(width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10), tileSize, tileSize)
    text(y, width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10))
  }

}

function keyReleased() {
  console.log(key)
  if (key == "A" || key == "a") {
    if (rise != -tileRange) {
      rise = rise - 1
    }
  }
  if (key == "s" || key == "S") {
    if (rise != tileRange) {
      rise = rise + 1;
    }
  }

  if (key == "k" || key == "K") {
    if (run != -tileRange) {
      run = run - 1;
    }
  }
  if (key == "l" || key == "L") {
    if (run != tileRange) {
      run = run + 1;
    }
  }
}