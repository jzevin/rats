import Random from 'tiny-random'

// webpack --progress --colors --watch
// http-server -o

const rnd = new Random();

class App {
  constructor() {
    this.ctx = document.getElementById('cnv').getContext('2d');
    this.sizeCanvas();
    window.requestAnimationFrame(t=>this.draw(t));
  }
  sizeCanvas(){
    this.w = this.ctx.canvas.width = window.innerWidth;
    this.h = this.ctx.canvas.height = window.innerHeight;
  }

  draw(t){
    //this.ctx.clearRect(0,0,this.w,this.h);
    window.requestAnimationFrame(t=>this.draw(t));
    for (var i = 1; i <= 10; i++) {
      this.ctx.fillRect(rnd.int(0,this.w),rnd.int(0,this.h),rnd.int(1,30),rnd.int(1,30))
    }
    //console.log(t);
  }
}

const app = new App();
window.onresize = e=>app.sizeCanvas();
