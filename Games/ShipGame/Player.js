
var base_image = new Image();
base_image.src = 'test.png';

class Player{
  constructor(x,y,w,h,c){
    this.x=x; //x axis location
    this.y=y; //y axis location
    this.w=w; //width
    this.h=h; //height
    this.c=c; //color

    this.dy = 0; //jump velocity
    this.jumpForce = 5; //acceleration of jump
    this.originalHeight = h; //refernce
    this.grounded = false;
    this.jumpTimer = 0;
  }


  Animate () {
    //inputs
    if(keys['Space']||keys['KeyW']||clicks){
      this.Jump();
    }else{
      //starting jump force
      this.jumpTimer = 0;
    }
    //Duck
    if(keys['ShiftLeft']||keys['KeyS']){
      this.h = this.originalHeight/2;
    }else{
      this.h=this.originalHeight;
    }
    //incrementing the gravity
    this.y+=this.dy;
    //gravity
    if(this.y + this.h < canvas.height){
      //acceleration for gravity
      this.dy += gravity;
      this.grounded = false;
    } else {
      //sets position at bottom of the canvas
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }





    this.Draw();
  }

  Jump(){
      this.dy = -this.jumpForce;
  }

  Draw(){
    ctx.drawImage(base_image, this.x, this.y,this.w,this.h);
    ctx.beginPath(); //start drawing
    ctx.fillStyle = this.c; //tell us to fill it with the color
    //ctx.fillRect(this.x,this.y,this.w,this.h); //size of the rectangle
    ctx.closePath(); //stop drawing
  }
}
