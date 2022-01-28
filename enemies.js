class Enemy {
  constructor(ctx, posX, posY, radius) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;

    this.vel = 1;
    this.randomNum = Math.random() * 10 - 5;
    this.randomNum1 = Math.random() * 10 - 5;
  }

  draw() {
    this.ctx.fillStyle = "#B600D3";
    this.ctx.fillRect(this.posX, this.posY, 10, 10);
    this.move();
  }
  move() {
    this.posX += this.randomNum;
    this.posY += this.randomNum1;
  }
}
