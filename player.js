class Player {
  // Tiene 3 valores obligatorios, dentro se le pueden poner más
  // Al ser llamado en la sección Game, hay que darle valor a estos 3
  constructor(
    ctx,
    posX,
    posY,
    framesCounter,
    gameWidth,
    gameHeight,
    fxLaser,
    width = 65,
    height = 48
  ) {
    this.ctx = ctx;

    this.posX = gameWidth / 2 - 60;
    this.posY = gameHeight / 2;
    this.width = width;
    this.height = height;
    this.color = "white";
    this.keyPressed = [];
    this.setEventHandlers();
    this.draw();
    this.isPowerUp = false;
    this.framesCounter = framesCounter;
    this.counter = 0;
    this.bombsSound = fxLaser;

    this.canvasWidth = gameWidth;
    this.canvasHeight = gameHeight;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = "./image/ship_0014.png";

    this.imageInstanceYellow = new Image();
    this.imageInstanceYellow.src = "./image/yellow.png";
  }

  draw() {
    if (this.posX > this.canvasWidth) {
      this.posX = 0;
    }
    if (this.posX + 65 < 0) {
      this.posX = this.canvasWidth;
    }
    if (this.posY > this.canvasHeight) {
      this.posY = 0;
    }
    if (this.posY + 48 < 0) {
      this.posY = this.canvasHeight;
    }

    this.init();
    this.ctx.drawImage(
      this.imageInstance,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    if (this.isPowerUp) {
      this.ctx.drawImage(
        this.imageInstanceYellow,
        this.posX,
        this.posY,
        this.width,
        this.height
      );

      if (this.framesCounter % 2400 === 0) {
        this.counter++;
      }
      if (this.counter > 500) {
        this.isPowerUp = false;
        this.counter = 0;
      }
    } else {
      this.ctx.fillStyle = "white";
    }
  }

  powerUp() {
    this.isPowerUp = true;
  }

  setEventHandlers() {
    document.addEventListener("keydown", (event) => {
      const { key } = event;
      if (key === "ArrowRight") this.keyPressed[0] = true;
      if (key === "ArrowLeft") this.keyPressed[1] = true;
      if (key === "ArrowUp") this.keyPressed[2] = true;
      if (key === "ArrowDown") this.keyPressed[3] = true;
    });
    document.addEventListener("keyup", (event) => {
      const { key } = event;
      if (key === "ArrowRight") this.keyPressed[0] = false;
      if (key === "ArrowLeft") this.keyPressed[1] = false;
      if (key === "ArrowUp") this.keyPressed[2] = false;
      if (key === "ArrowDown") this.keyPressed[3] = false;
    });

    if (this.keyPressed[0] === true) {
      this.posX += 8;
    }
    if (this.keyPressed[1] === true) {
      this.posX -= 8;
    }
    if (this.keyPressed[2] === true) {
      this.posY -= 8;
    }
    if (this.keyPressed[3] === true) {
      this.posY += 8;
    }
  }
}
