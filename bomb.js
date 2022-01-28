class Bomb {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.posX = Math.random() * gameWidth;
    this.posY = Math.random() * gameHeight;
    this.explosives = [];
  }

  drawRedBomb() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.posX, this.posY, 15, 15);
  }

  drawYellowBomb() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.posX, this.posY, 15, 15);
  }
  returnArr() {
    return this.explosives
  }

  explosives(num) {
    for (let i = 0; i < num; i++) {
      let explosive = {
        radius: 5,
        posX: this.posX,
        posY: this.posY,
        xDirection: radius + Math.cos(((2 * Math.PI) / num) * i),
        yDirection: radius + Math.sin(((2 * Math.PI) / num) * i),

        draw() {
          this.ctx.fillStyle = "red";
          this.ctx.beginPath();
          this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
          this.ctx.fill();
          this.move();
        },
        move() {
          this.posX += this.xDirection;
          this.posY += this.yDirection;
        },
      };
    }
    this.explosives.push(explosive);
  }

  updateFrameCounter(currentFrameCounter) {
    this.framesCounter = currentFrameCounter;
  }
}
