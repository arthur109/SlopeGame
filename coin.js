class coin {
    constructor(xpos, ypos, goToX, goToY, animation) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = 30
        this.frameRate = 0.2
        this.speed = 2
        this.xspeed = this.speed
        this.yspeed = (goToX - xpos) / (goToY - ypos) * this.speed
        this.counter = 0
        this.animation = animation

    }
    display() {
        if (this.counter > this.animation.length) {
            this.counter = 0
        }
        image(this.animation[int(this.counter)], this.xpos, this.ypos, this.radius, this.radius)
        this.counter = this.counter + this.frameRate;
    }
    move() {
        this.ypos += this.yspeed;
        this.xpos += this.xspeed;
    }

    createNumOutside() {
        var x = random(-500, width + 500);
        var y = random(-500, height + 500);
        while (isOver(x, y, -100, -100, width + 200, height + 200)) {
            x = random(-500, width + 500);
            y = random(-500, height + 500);
        }
    }

    isOver(x, y xPos, yPos, xWidth, yLength) {
        if (x >= xPos && y >= yPos && x <= xPos + xWidth && y <= yPos + yLength) {
            return (true);
        }
        return (false);
    }

}