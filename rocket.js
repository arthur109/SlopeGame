class rocket {
    constructor(xpos, ypos, normal, damaged1, damaged2) {
        this.xpos = xpos
        this.ypos = ypos
        this.normal = normal
        this.damaged1 = damaged1
        this.damaged2 = damaged2
        this.counter = 0;
        this.currentAnimation = this.normal
        this.life = 3
    }
    display(rise, run) {
        var angle = atan2(rise, -run);
        push()
        translate(this.xpos, this.ypos)
        rotate(angle - (PI / 2))

        image(this.currentAnimation[int(random(0, this.currentAnimation.length))], -50, -50, 100, 100);
        pop();
    }
    move(rise, run) {
        this.ypos += -rise;
        this.xpos += run;
    }
    lowerlife(damage) {
        this.life = this.life - damage;
        if (this.life == 2) {
            this.currentAnimation = this.damaged1
        } else if (this.life == 1) {
            this.currentAnimation = this.damaged2
        }
    }
    outOfBounds(width, height) {
        if (isOver(this.xpos, this.ypos, -300, -300, width + 600, heigh + 600)) {
            return false
        }
        return true
    }

}