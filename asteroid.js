class asteroid {
    constructor(xpos, ypos, goToX, goToY, animation, damage) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = 200
        this.frameRate = 0.3
        this.speed = 2
        this.xspeed = (goToX - xpos) / 300
        this.yspeed = (goToY - ypos) / 300
        this.animation = animation
        this.insideCounter = false
        this.damage = damage
    }
    display() {
        var angle = atan2(this.xspeed, this.yspeed);
        push()
        translate(this.xpos, this.ypos)
        rotate(angle - PI / 1.3)

        image(this.animation[int(random(0, this.animation.length))], -this.radius / 2, -this.radius / 2, this.radius, this.radius)
        pop();

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
