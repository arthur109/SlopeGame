var tileSize = 50;
var tileRange = 3
var rise = 1;
var run = 1;
var bob
var coinAnimation
var shipNormal
var shipDamaged1
var shipDamaged2
var background
var coins = []
var coinNum = 10;
var score = 0;
var gameMode = 0;
var playNormal
var playHover
var playPressed
var HighScore = 0;
var myFont;

function isMouseOver(xPos, yPos, xWidth, yLength) {
  if (mouseX >= xPos && mouseY >= yPos && mouseX <= xPos + xWidth && mouseY <= yPos + yLength) {
    return (true);
  }
  return (false);
}

function isOver(x, y, xPos, yPos, xWidth, yLength) {
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
  return {
    xpos: x,
    ypos: y
  }
}

function preload() {
  playNormal = loadImage('Data/playButton/normal.png')
  playHover = loadImage('Data/playButton/hover.png')
  playPressed = loadImage('Data/playButton/pressed.png')
  var frame1 = loadImage('Data/coin/bob.png')
  var frame2 = loadImage("Data/coin/1.png")
  var frame3 = loadImage("Data/coin/2.png")
  coinAnimation = [frame1, frame2, frame3]
  background = loadImage("Data/space.png")
  shipNormal = [loadImage('Data/spaceShip/normal/1.png'), loadImage('Data/spaceShip/normal/2.png'), loadImage('Data/spaceShip/normal/3.png'), loadImage('Data/spaceShip/normal/4.png'), loadImage('Data/spaceShip/normal/5.png')]
  shipDamaged1 = [loadImage('Data/spaceShip/damaged1/1.png'), loadImage('Data/spaceShip/damaged1/2.png'), loadImage('Data/spaceShip/damaged1/3.png'), loadImage('Data/spaceShip/damaged1/4.png'), loadImage('Data/spaceShip/damaged1/5.png')]
  shipDamaged2 = [loadImage('Data/spaceShip/damaged2/1.png'), loadImage('Data/spaceShip/damaged2/2.png'), loadImage('Data/spaceShip/damaged2/3.png'), loadImage('Data/spaceShip/damaged2/4.png'), loadImage('Data/spaceShip/damaged2/5.png')]
  myFont = loadFont('Data/pixelated.ttf');
}

function setup() {
  createCanvas(800, 800);
  textFont(myFont)
  for (var i = 0; i < coinNum; i++) {
    var position = createNumOutside()
    var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
    coins.push(temp)
  }
  bob = new rocket(100, height - 100, shipNormal, shipDamaged1, shipDamaged2);
}

function draw() {
  if (gameMode == 0) {
    image(background, bob.xpos / 10 - 400, bob.ypos / 10 - 400, 2000, 1600)
    if (isMouseOver(width / 2 - 230 / 2, height / 2 - 120 / 2, 230, 120)) {
      if (mouseIsPressed) {
        image(playPressed, width / 2 - 230 / 2, height / 2 - 120 / 2, 230, 120)
      } else {
        image(playHover, width / 2 - 230 / 2, height / 2 - 120 / 2, 230, 120)
      }
    } else {
      image(playNormal, width / 2 - 230 / 2, height / 2 - 120 / 2, 230, 120)
    }
  } else if (gameMode == 1) {
    image(background, bob.xpos / 10 - 400, bob.ypos / 10 - 400, 2000, 1600)
    bob.display(rise, run);
    bob.move(rise, run);
    for (var i = 0; i < coinNum; i++) {
      coins[i].display();
      coins[i].move();
      if (coins[i].deathDetection(bob, width, height)) {
        score += 1;
        console.log(score)
        coins.splice(i, 1)
        var position = createNumOutside()
        var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
        coins.push(temp)
      }
      if (coins[i].outOfBounds(width, height)) {
        coins.splice(i, 1)
        var position = createNumOutside()
        var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
        coins.push(temp)
      }
    }


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
  }
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
  if (gameMode == 0) {
    gameMode = 1
  }
  clearReset();
}

function clearReset() {
  coins = []
  for (var i = 0; i < coinNum; i++) {
    var position = createNumOutside()
    var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
    coins.push(temp)
  }
  bob = new rocket(100, height - 100, shipNormal, shipDamaged1, shipDamaged2);
  score = 0;
}