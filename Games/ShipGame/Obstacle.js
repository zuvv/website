class Obstacle{
  constructor(x,y,w,h,c){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.c=c;

    this.dx = -gameSpeed;
  }
  setColor(input){
    this.c = input;
  }
  Update(){
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }
  Draw(){
    ctx.beginPath(); //start drawing
    ctx.fillStyle = this.c; //tell us to fill it with the color
    ctx.fillRect(this.x,this.y,this.w,this.h); //size of the rectangle
    ctx.closePath(); //stop drawing
  }
}
