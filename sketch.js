var tileSize = 50;
var tileRange = 3
var rise = 1;
var run = 1;
var bob
var coinAnimation
var shipNormal
var shipDamaged1
var shipDamaged2
var john
var background

function isMouseOver(xPos, yPos, xWidth, yLength) {
  if (mouseX >= xPos && mouseY >= yPos && mouseX <= xPos + xWidth && mouseY <= yPos + yLength) {
    return (true);
  }
  return (false);
}

function isOver(x, y xPos, yPos, xWidth, yLength) {
  if (x >= xPos && y >= yPos && x <= xPos + xWidth && y <= yPos + yLength) {
    return (true);
  }
  return (false);
}

function createNumOutside() {
  var x = random(-500, width + 500);
  var y = random(-500, height + 500);
  while (isOver(x, y, -100, -100, width + 200, height + 200)) {
    x = random(-500, width + 500);
    y = random(-500, height + 500);
  }
}

function preload() {
  var frame1 = loadImage('Data/coin/bob.png')
  var frame2 = loadImage("Data/coin/1.png")
  var frame3 = loadImage("Data/coin/2.png")
  coinAnimation = [frame1, frame2, frame3]
  background = loadImage("Data/space.png")
  shipNormal = [loadImage('Data/spaceShip/normal/1.png'), loadImage('Data/spaceShip/normal/2.png'), loadImage('Data/spaceShip/normal/3.png'), loadImage('Data/spaceShip/normal/4.png'), loadImage('Data/spaceShip/normal/5.png')]
  shipDamaged1 = [loadImage('Data/spaceShip/damaged1/1.png'), loadImage('Data/spaceShip/damaged1/2.png'), loadImage('Data/spaceShip/damaged1/3.png'), loadImage('Data/spaceShip/damaged1/4.png'), loadImage('Data/spaceShip/damaged1/5.png')]
  shipDamaged2 = [loadImage('Data/spaceShip/damaged2/1.png'), loadImage('Data/spaceShip/damaged2/2.png'), loadImage('Data/spaceShip/damaged2/3.png'), loadImage('Data/spaceShip/damaged2/4.png'), loadImage('Data/spaceShip/damaged2/5.png')]
}

function setup() {
  createCanvas(800, 800);
  john = new coin(-50, -50, 200, 200, coinAnimation)
  bob = new rocket(100, height - 100, shipNormal, shipDamaged1, shipDamaged2);
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
    if (y == -1) {
      y += 1
    }
  }

  for (var y = -tileRange; y <= tileRange; y++) {
    fill(255)
    if (y == run) {
      fill(255, 0, 0)
    }

    rect(width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10), tileSize, tileSize)
    text(y, width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10))

    if (y == -1) {
      y += 1
    }
  }
  john.display()
  john.move()
}

function keyReleased() {
  if (key == "A" || key == "a") {
    if (rise != -tileRange) {
      rise = rise - 1
      if (rise == 0) {
        rise = rise - 1;
      }
    }
  }
  if (key == "s" || key == "S") {
    if (rise != tileRange) {
      rise = rise + 1;
      if (rise == 0) {
        rise = rise + 1;
      }
    }
  }

  if (key == "k" || key == "K") {
    if (run != -tileRange) {
      run = run - 1;
      if (run == 0) {
        run = run - 1;
      }
    }
  }
  if (key == "l" || key == "L") {
    if (run != tileRange) {
      run = run + 1;
      if (run == 0) {
        run = run + 1;
      }
    }
  }
}

function mouseReleased() {
  bob.lowerlife()
  console.log("lowered")
}