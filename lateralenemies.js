class LateralEnemy {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.posY = Math.random() * gameHeight;
    this.posX = gameWidth;
  }

  draw() {
    this.ctx.fillStyle = "#FFF57E";
    this.ctx.fillRect(this.posX, this.posY, 150, 3);
    this.move();
  }
  move() {
    this.posX -= 5;
    //Como se ejecuta todo el tiempo, es como un bucle
  }
}
