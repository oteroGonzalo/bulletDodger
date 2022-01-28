class PowerUp {
  constructor(ctx, gameHeight, gameWidth) {
    this.ctx = ctx;
    this.posX = Math.random() * gameWidth;
    this.posY = Math.random() * gameHeight;
    this.width = 30;
    this.height = 30;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = "./image/element_yellow_polygon.png";

    // this.ctx.fillStyle = "yellow";
    // this.ctx.fillRect(this.posX, this.posY, 20, 20);
  }

  draw() {
    this.init();
    this.ctx.drawImage(
      this.imageInstance,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
