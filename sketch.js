var tileSize = 50;
var tileRange = 3
var rise = 0;
var run = 3;
var bob = new rocket(200, 200);
var coinAnimation
var john
var background

function isMouseOver(xPos, yPos, xWidth, yLength) {
  if (mouseX >= xPos && mouseY >= yPos && mouseX <= xPos + xWidth && mouseY <= yPos + yLength) {
    return (true);
  }
  return (false);
}

function preload() {
  var frame1 = loadImage('Data/coin/bob.png')
  var frame2 = loadImage("Data/coin/1.png")
  var frame3 = loadImage("Data/coin/2.png")
  coinAnimation = [frame1, frame2, frame3]
  background = loadImage("Data/space.png")
}

function setup() {
  createCanvas(800, 800);
  john = new coin(-50, -50, 200, 200, coinAnimation)
}

function draw() {
  image(background, bob.xpos / 10 - 400, bob.ypos / 10 - 400, 2000, 1600)
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
  john.display()
  john.move()
}

function keyReleased() {
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