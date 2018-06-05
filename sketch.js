var tileSize = 55;
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
var asteroids = []
var coinNum = 10;
var asteroidNum = 3;
var score = 0;
var gameMode = 0;
var playNormal
var playHover
var playPressed
var asteroid1
var HighScore = 0;
var myFont;
var tiles
var john;

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
  tiles = {
    "-3": loadImage('Data/numberTiles/-3.png'),
    "-2": loadImage('Data/numberTiles/-2.png'),
    "-1": loadImage('Data/numberTiles/-1.png'),
    "1": loadImage('Data/numberTiles/1.png'),
    "2": loadImage('Data/numberTiles/2.png'),
    "3": loadImage('Data/numberTiles/3.png'),
    "selected": loadImage('Data/numberTiles/selection.png')
  }
  asteroid1 = [loadImage('Data/asteroid/1/1.png'), loadImage('Data/asteroid/1/2.png'), loadImage('Data/asteroid/1/3.png'), loadImage('Data/asteroid/1/4.png')]
}

function setup() {
  createCanvas(600, 600);
  textFont(myFont)
  for (var i = 0; i < coinNum; i++) {
    var position = createNumOutside()
    var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
    coins.push(temp)
  }
  for (var i = 0; i < asteroidNum; i++) {
    var position = createNumOutside()
    var temp = new asteroid(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), asteroid1, 1)
    asteroids.push(temp)
  }
  bob = new rocket(100, height - 100, shipNormal, shipDamaged1, shipDamaged2);
  //john = new asteroid(-300, -300, 200, 200, asteroid1, 1);
  //noSmooth()
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
    image(background, bob.xpos / 5 - 300, bob.ypos / 5 - 300, 2000, 1600)
    bob.display(rise / 1.3, run / 1.3);
    bob.move(rise / 1.3, run / 1.3);
    for (var i = 0; i < coinNum; i++) {
      coins[i].display();
      coins[i].move();
      if (coins[i].deathDetection(bob, width, height)) {
        score += 1;
        console.log("score: " + str(score))
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

    for (var i = 0; i < asteroidNum; i++) {
      asteroids[i].display();
      asteroids[i].move();
      if (asteroids[i].deathDetection(bob, width, height)) {
        bob.lowerlife(asteroids[i].damage);
        console.log("life: " + str(bob.life))
        asteroids.splice(i, 1)
        var position = createNumOutside()
        var temp = new asteroid(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), asteroid1, 1)
        asteroids.push(temp)
      }
      if (asteroids[i].outOfBounds(width, height)) {
        asteroids.splice(i, 1)
        var position = createNumOutside()
        var temp = new asteroid(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), asteroid1, 1)
        asteroids.push(temp)
      }
    }
    if (bob.life <= 0) {
      gameMode = 0
      clearReset();
    }
    // john.display()
    // john.move();
    fill(255)
    textSize(30)
    text("SCORE: " + score, 20, 40)
    text("LIFES: " + bob.life, 20, 40)
    for (var y = -tileRange; y <= tileRange; y++) {


      image(tiles[str(y)], width / 2 + (y - 0.5) * (tileSize + 10), height - (tileSize + 10) * 2, tileSize, tileSize)

      if (y == rise) {
        image(tiles["selected"], width / 2 + (y - 0.5) * (tileSize + 10), height - (tileSize + 10) * 2, tileSize, tileSize)
      }
      //text(y, width / 2 + (y - 0.5) * (tileSize + 5), height - (tileSize + 10) * 2)
      if (y == -1) {
        y += 1
      }
    }
    text("RISE", width / 2 - 32, height - (tileSize + 10) * 1.4)
    text("RUN", width / 2 - 28, height - (tileSize + 10) * 0.4)
    for (var y = -tileRange; y <= tileRange; y++) {

      image(tiles[str(y)], width / 2 + (y - 0.5) * (tileSize + 10), height - (tileSize + 10), tileSize, tileSize)

      if (y == run) {
        image(tiles["selected"], width / 2 + (y - 0.5) * (tileSize + 10), height - (tileSize + 10), tileSize, tileSize)
      }

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
  asteroids = []
  for (var i = 0; i < coinNum; i++) {
    var position = createNumOutside()
    var temp = new coin(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), coinAnimation)
    coins.push(temp)
  }
  for (var i = 0; i < asteroidNum; i++) {
    var position = createNumOutside()
    var temp = new asteroid(position.xpos, position.ypos, random(50, width - 50), random(50, height - 50), asteroid1, 1)
    asteroids.push(temp)
  }
  bob = new rocket(100, height - 100, shipNormal, shipDamaged1, shipDamaged2);
  score = 0;
  rise = 1
  run = 1;
}
