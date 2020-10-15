class Player {
  constructor(key, y, color) {
    this.x = 400;
    this.y = y;
    this.key = key;
    this.alpha = 0;
    this.r = 5;
    this.dx = null;
    this.dy = null;
    this.crashed = false;
    this.time = null;
    this.color = color;
    this.img = 'gfx/' + this.color + '.png';
    this.image = new Image();
    this.image.src = this.img;
    this.rotateAngle = 0;
    this.array = new Array();
    this.lap = 1;
    this.checkPointed = [false, false, false]
    this.finished;
  }

  getTime() {
    // return {
    //   player: this.color,
    //   time: this.time
    // };
    return this.lap;
  }

  checkColision() {
    this.crashed = true;
    if (this.x > 200 && this.x < 600 && this.y > 140 && this.y < 260) {
      // console.log('plaska kolizja')
    } else if (this.x > 200 && this.x < 600 && (this.y > 395 || this.y < 5)) {
      // console.log('poza plansze')
    } else if (Math.sqrt(Math.pow(this.x - 200, 2) + Math.pow(this.y - 200, 2)) < 60) {
      // console.log('lewe polkole')
    } else if (Math.sqrt(Math.pow(this.x - 600, 2) + Math.pow(this.y - 200, 2)) < 60) {
      // console.log('prawe polkole')
    } else if ((Math.sqrt(Math.pow(this.x - 200, 2) + Math.pow(this.y - 200, 2)) > 195) && this.x < 200) {
      // console.log('lewe zewnatrz')
    } else if ((Math.sqrt(Math.pow(this.x - 600, 2) + Math.pow(this.y - 200, 2)) > 195) && this.x > 600) {
      // console.log('prawe zewnatrz')
    } else {
      this.crashed = false;
    }
  }

  getPosition() {
    return this.lap;
  }

  checkFinished() {
    return this.finished;
  }

  update() {
    if (!this.crashed) {
      if (keyState[this.key] || keyState[this.key]) {
        this.alpha -= 0.15;
        // this.rotateAngle -= 8.571428571428571;
        this.rotateAngle -= 8.59;
        this.alpha = this.alpha.toFixed(2)
      }
      // console.log(!this.checkPointed[0])
      if (this.y - 200 < 5 && this.y - 200 > 0 && this.x > 660 && this.x < 800) this.checkPointed[0] = true;
      if (this.y < 140 && this.y > 5 && this.x - 400 > 0 && this.x - 400 < 5) this.checkPointed[1] = true;
      if (this.y - 200 < 5 && this.y - 200 > 0 && this.x > 5 && this.x < 130) this.checkPointed[2] = true;
      if (this.checkPointed.every(n => n) && this.x - 400 < 5 && this.x - 400 > 0 && this.y > 260 && this.y < 400) {
        if (this.lap < 3) this.lap += 1;
        else this.finished = true;
        this.checkPointed[0] = false;
        this.checkPointed[1] = false;
        this.checkPointed[2] = false;
      }
      // console.log(this.checkPointed)
    }
  }

  render() {
    if (!this.crashed) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y)
      this.dx = this.r * Math.cos(this.alpha)
      this.dy = this.r * Math.sin(this.alpha)
      ctx.lineTo(this.x + this.dx, this.y + this.dy)
      this.array.unshift({
        x1: this.x,
        x2: this.dx + this.x,
        y1: this.y,
        y2: this.dy + this.y
      })
      if (this.array.length == 51) this.array.pop();
      ctx.stroke();
      ctx.closePath();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(180 * Math.PI / 180 + this.rotateAngle * Math.PI / 180)
      ctx.drawImage(this.image, -40, -40, 80, 80)
      ctx.restore();
      for (let line of this.array) {
        ctx.globalAlpha -= 0.02
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke();
        ctx.closePath();
      }
      ctx.globalAlpha = 1;
      this.x += this.dx
      this.y += this.dy
    }
  }
}