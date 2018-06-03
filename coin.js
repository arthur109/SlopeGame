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
}