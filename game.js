const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  enemies: [],
  lateralEnemies: [],
  belowEnemies: [],
  powerUps: [],
  enemiesCounter: [],
  lateralEnemiesCounter: [],
  bombsArr: [],
  counter: 0,
  counterSound: 0,
  explosives: [],
  isTrue: false,
  explosionSound: undefined,
  laserSound: undefined,
  backgroundSound: undefined,
  powerUpSound: undefined,
  bombsSound: undefined,
  isRepeat: false,

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.explosionSound = new Audio("./Sounds/explosionCrunch_002.ogg");
    this.laserSound = new Audio("./Sounds/laserRetro_004.ogg");
    this.backgroundSound = new Audio("./Sounds/spaceEngineLow_001.ogg");
    this.powerUpSound = new Audio("./Sounds/powerUp1.ogg");
    this.bombsSound = new Audio("./Sounds/explosionBombs.ogg");
    this.start();

    this.drawBackground();
    this.drawAll();
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    //Que el canvas se ajuste a toda la ventana
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  drawBackground() {
    this.background = new Background(
      this.ctx,
      this.width,
      this.height,
      "./image/beautiful-shining-stars-night-sky.jpg"
    );
  },

  reset() {
    this.player = new Player(
      //Aquí hay que darle valor a los 3 parámetros que declaramos en el constructor
      this.ctx,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.framesCounter,
      this.canvas.width,
      this.canvas.height,
      this.explosionSound
    );
    this.backgroundSound;
    this.enemies = [];

    this.bombs(5);
    this.bombsArr.forEach((x) => x.explosives(20));
    this.createPowerUp();
  },

  drawAll() {
    //Cada vez que pasa el intervalo, borra todo y píntalo de nuevo
    this.clear();
    this.background.draw();
    this.backgroundSound.play();
    this.player.draw();
    this.player.setEventHandlers();
    this.createEnemies();
    this.enemies.forEach((enemies) => enemies.draw());
    this.createPowerUp();
    this.lateralEnemies.forEach((ln) => ln.draw());
    this.belowEnemies.forEach((elm) => elm.draw());
    console.log(this.framesCounter);
    if (this.framesCounter > 500) {
      this.powerUps.forEach((elm) => elm.draw());
    }

    this.clearEnemies();
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  createPowerUp() {
    if (this.powerUps.length === 0 && this.framesCounter % 2000 === 0) {
      this.powerUps.push(
        new PowerUp(this.ctx, this.canvas.height, this.canvas.width)
      );
    }
  },

  createEnemies() {
    // Hace un bucle de cada elemento que queremos que aparezca más de una vez

    if (this.enemiesCounter < 250) {
      if (this.framesCounter % 5 === 0) {
        let randomNum = Math.floor(Math.random() * this.canvas.width) + 1;
        this.enemies.push(
          new Enemy(this.ctx, randomNum, 0, 5, this.framesCounter)
        );
        this.enemiesCounter++;
      }
    } else if (this.lateralEnemiesCounter < 125) {
      if (this.framesCounter % 20 === 0) {
        this.lateralEnemies.push(
          new LateralEnemy(this.ctx, this.canvas.width, this.canvas.height)
        );
        this.laserSound.play();

        this.lateralEnemiesCounter++;
        this.belowEnemies.push(
          new BelowEnemies(this.ctx, this.canvas.width, this.canvas.height)
        );

        this.lateralEnemiesCounter++;
      }
    } else {
      if (this.framesCounter % 50 === 0) {
        this.counter++;
      }

      if (this.counter < 6) {
        if (this.counter % 2 === 0) {
          this.bombsArr.forEach((x) => x.drawBombRed());
        } else {
          this.bombsArr.forEach((x) => x.drawBombYellow());
        }
      } else {
        this.isTrue = true;
        this.explosives.forEach((explosive) => {
          explosive.draw();
        });
        this.bombsSound.play();
      }
    }
  },

  clearEnemies() {
    this.enemies = this.enemies.filter(
      (elm) =>
        elm.posX >= 0 &&
        elm.posY < this.canvas.height &&
        elm.posX < this.canvas.width
    );
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      // Solo tiene que haber un intervalo por juego
      this.framesCounter > 5000
        ? (this.framesCounter = 0)
        : this.framesCounter++;

      this.drawAll();
      if (!this.player.isPowerUp) {
        if (
          this.isCollision() ||
          this.isCollisionLE() ||
          this.isCollisionBE()
        ) {
          this.explosionSound.play();
        }
        this.isCollision() ? this.gameOver() : null;
        this.isCollisionLE() ? this.gameOver() : null;
        this.isCollisionBE() ? this.gameOver() : null;
        if (this.isTrue) {
          if (this.isCollisionBomb()) {
            this.gameOver();
            this.explosionSound.play();
          }
        }
      }
      if (this.isCollisionPowerUp()) {
        this.powerUps = [];
        this.player.powerUp();
        this.powerUpSound.play();
      }
    }, 1000 / this.FPS);
  },

  isCollision() {
    return this.enemies.some((obs) => {
      return (
        this.player.posX < obs.posX + 10 &&
        this.player.posX + 65 > obs.posX &&
        this.player.posY < obs.posY + 10 &&
        this.player.posY + 48 > obs.posY
      );
    });
  },

  isCollisionLE() {
    return this.lateralEnemies.some((obs) => {
      return (
        this.player.posX < obs.posX + 150 &&
        this.player.posX + 65 > obs.posX &&
        this.player.posY < obs.posY + 3 &&
        this.player.posY + 48 > obs.posY
      );
    });
  },

  isCollisionBE() {
    return this.belowEnemies.some((obs) => {
      return (
        this.player.posX < obs.posX + 5 &&
        this.player.posX + 65 > obs.posX &&
        this.player.posY < obs.posY + 60 &&
        this.player.posY + 48 > obs.posY
      );
    });
  },

  isCollisionPowerUp() {
    return this.powerUps.some((obs) => {
      return (
        this.player.posX < obs.posX + 10 &&
        this.player.posX + 65 > obs.posX &&
        this.player.posY < obs.posY + 10 &&
        this.player.posY + 48 > obs.posY
      );
    });
  },

  isCollisionBomb() {
    return this.explosives.some((obs) => {
      return (
        this.player.posX < obs.posX + 10 &&
        this.player.posX + 65 > obs.posX &&
        this.player.posY < obs.posY + 10 &&
        this.player.posY + 48 > obs.posY
      );
    });
  },

  gameOver() {
    clearInterval(this.interval);
    this.ctx.font = "40px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("GAME OVER", this.width / 2 - 30, this.height / 2);

    this.ctx.font = "15px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Created by:", this.width / 2 - 30, this.height / 2 + 40);

    this.ctx.font = "15px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Estefanía Lamas",
      this.width / 2 - 30,
      this.height / 2 + 60
    );

    this.ctx.font = "15px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Gonzalo Otero",
      this.width / 2 - 30,
      this.height / 2 + 80
    );
    
    this.ctx.font = "25px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#C73DFF";
    this.ctx.fillText(
      "Click to restart again",
      this.width / 2 - 30,
      this.height / 2 + 140
    );

    this.ctx.font = "15px MonoSpace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("©2022", this.width / 2 - 30, this.height / 2 + 100);
    //mencionado en Start
    const el = document.getElementById("canvas");
    el.addEventListener("click", () => window.location.reload(false));
  },

  bombs(number) {
    for (let i = 0; i < number; i++) {
      let bombs = {
        posX: Math.random() * this.canvas.width,
        posY: Math.random() * this.canvas.height,
        drawBombRed() {
          Game.ctx.fillStyle = "#FF5C37";
          Game.ctx.fillRect(this.posX, this.posY, 15, 15);
        },
        drawBombYellow() {
          Game.ctx.fillStyle = "#FCF550";
          Game.ctx.fillRect(this.posX, this.posY, 15, 15);
        },
        explosives(num) {
          for (let i = 0; i < num; i++) {
            let explosive = {
              radius: 10,
              posX: this.posX,
              posY: this.posY,
              xDirection: Math.cos(((2 * Math.PI) / num) * i) * 2,
              yDirection: Math.sin(((2 * Math.PI) / num) * i) * 2,
              red: undefined,
              green: undefined,
              blue: undefined,

              getRandomColour() {
                this.red = Math.floor(Math.random() * 255);
                this.green = Math.floor(Math.random() * 255);
                this.blue = Math.floor(Math.random() * 255);
                return (
                  "rgb(" + this.red + "," + this.green + "," + this.blue + " )"
                );
              },
              draw() {
                Game.ctx.fillStyle = this.getRandomColour();
                Game.ctx.fillRect(this.posX, this.posY, 10, 10);
                this.move();
              },
              move() {
                this.posX += this.xDirection;
                this.posY += this.yDirection;
              },
            };
            Game.explosives.push(explosive);
          }
        },
      };
      this.bombsArr.push(bombs);
    }
  },
};
