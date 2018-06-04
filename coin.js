class coin {
    constructor(xpos, ypos, goToX, goToY, animation) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = 30
        this.frameRate = 0.2
        this.speed = 2
        this.xspeed = (goToX - xpos) / 400
        this.yspeed = (goToY - ypos) / 400
        this.counter = 0
        this.animation = animation
        this.insideCounter = false
    }
    display() {
        if (this.counter > this.animation.length) {
            this.counter = 0
        }
        image(this.animation[int(this.counter)], this.xpos - this.radius / 2, this.ypos - this.radius / 2, this.radius, this.radius)
        this.counter = this.counter + this.frameRate;
    }
    move() {
        this.ypos += this.yspeed;
        this.xpos += this.xspeed;
    }

    isOver(x, y, xPos, yPos, xWidth, yLength) {
        if (x >= xPos && y >= yPos && x <= xPos + xWidth && y <= yPos + yLength) {
            return (true);
        }
        return (false);
    }
    deathDetection(hitter, width, height) {

        if (dist(hitter.xpos, hitter.ypos, this.xpos, this.ypos) <= 30 * 1.2) {
            return true
        }
        return false
    }

    outOfBounds(width, height) {
        if (isOver(this.xpos, this.ypos, 0, 0, width, height)) {
            this.insideCounter = true;
        }
        if (this.insideCounter && isOver(this.xpos, this.ypos, -50, -50, width + 100, height + 100) == false) {
            return true
        }
        return false
    }


}