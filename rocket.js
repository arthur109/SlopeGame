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