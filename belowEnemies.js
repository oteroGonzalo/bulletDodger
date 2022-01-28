class BelowEnemies {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.posX = Math.random() * gameWidth;
    this.posY = gameHeight;
  }

  draw() {
    this.ctx.fillStyle = "#FFF57E";
    this.ctx.fillRect(this.posX, this.posY, 5, 60);
    this.move();
  }

  move() {
    this.posY -= 5;
  }
}
