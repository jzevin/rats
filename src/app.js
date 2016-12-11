import Random from 'tiny-random'
import Vec from 'tiny-vector'
import 'pixi.js'
// webpack --progress --colors --watch
// http-server -o
const rnd = new Random();

class Force {
  constructor(max, chance, intermittent=true){
    this.max = max;
    this.chance = chance;
    this.on = true;
    this.vec = new Vec( rnd.real(-this.max,this.max), rnd.real(-this.max,this.max) );
    this.intermittent = intermittent;
  }
  update(){
    //console.log(this.vec.x, this.vec.y, this.on);
    if(rnd.chance(5)){
      this.on = !this.on;
    }
    if(!this.on){
      this.vec.zero();
      //return;
    } else {
      if(this.intermittent & rnd.chance(this.chance)){
        this.vec = new Vec( rnd.real(-this.max,this.max), rnd.real(-this.max,this.max) );
      } else {
        return;
      }
    }

  }
}

class Rat {
  constructor(app){
    this.app = app;
    this.layer = new PIXI.Graphics();
    this.app.stage.addChild(this.layer);
    this.layer.position.x = rnd.int(0,this.app.w);
    this.layer.position.y = rnd.int(0,this.app.h);
    this.pos = new Vec(this.layer.position.x,this.layer.position.y);
    this.acc = new Vec();
    this.vel = new Vec();
    this.size = rnd.int(2,10);
    this.mass = rnd.real();
    // draw a circle
    this.layer.lineStyle(0);
    this.layer.beginFill(0xaaaaaa, rnd.real());
    this.layer.drawCircle(0, 0,this.size);
    this.layer.endFill();
  }
  applyForce(f){
    const fc = f.clone();
    fc.mult( this.mass );
    this.acc.add( fc );
  }
  update(){
    //this.pos.x -= 20;
    if(this.pos.x > this.app.w+this.size){
      this.pos.x = -this.size;
    }
    if(this.pos.x < -this.size){
      this.pos.x = this.app.w+this.size;
    }
    if(this.pos.y > this.app.h+this.size){
      this.pos.y = -this.size;
    }
    if(this.pos.y < -this.size){
      this.pos.y = this.app.h+this.size;
    }
    //friction
    const friction = new Vec(this.vel.x,this.vel.y)
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.35);
    //end friction
    this.applyForce(this.app.WIND.vec);
    this.applyForce(friction);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // if(this.vel.x < 0.1){this.vel.x = 0}
    // if(this.vel.y < 0.1){this.vel.y = 0}
    // this.acc.limit(30)
    // this.vel.limit(30)
    this.acc.zero()
    this.layer.position.x = this.pos.x;
    this.layer.position.y = this.pos.y;
  }
  draw(){
    this.update();
  }
}

class App {
  constructor(){
    this.init();
  }
  init(){
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{
      transparent: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    });
    this.resize();
    console.log(this.renderer);
    document.body.appendChild(this.renderer.view);
    // create the root of the scene graph
    this.stage = new PIXI.Container();
    this.WIND = new Force(2.5,10);
    this.rats = [];
    for (var i = 0; i < 1000; i++) {
      this.rats.push( new Rat(this) );
    }
    this.draw();
  }
  resize(){
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.renderer.resize(this.w, this.h);
    this.renderer.view.style.width = `${this.w}px`;
    this.renderer.view.style.height = `${this.h}px`;
  }
  draw(){
    window.requestAnimationFrame( ()=>this.draw() );
    for (let rat of this.rats) {
      rat.draw();
    }
    this.WIND.update();
    // render the container
    this.renderer.render(this.stage);
  }
}

const app = new App();
window.onresize = (e)=>{app.resize()};
