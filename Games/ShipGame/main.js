const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles=[];
let gameSpeed;
let keys = {};
let clicks = false;


//Event Listeners
document.addEventListener('keydown',function(evt){
  keys[evt.code] = true;
});
document.addEventListener('keyup',function(evt){
  keys[evt.code] = false;
});

document.addEventListener('mousedown',function(evt){
  clicks = true;
});
document.addEventListener('mouseup',function(evt){
  clicks = false;
});



let size = 100;
let size2 = 400;
//let size = viewportHeight*.20;
//let size2 = viewportHeight*.40;
let myTunnel = false;
//creates top and bottom obstacles
function SpawnWall(){
  //x,y,width,height
  let obstacleTop = new Obstacle(canvas.width,0,100,size,'#2484E4');
  let obstacleBottom = new Obstacle(canvas.width,canvas.height-size2,100,size2,'#2484E4');
//score = 501
//level 1
if(score<=250){
  if(myTunnel==false&&size>=100){
    size=size+5;
    size2=size2-5;
    if(size>=400){
      myTunnel=true;
    }
  }else if(myTunnel&&size<=400){
    size=size-5;
    size2=size2+5;
    if(size<=100){
      myTunnel=false;
    }
  }
  //level 2
}else if(score>250&&score<=380){
//colors break when on server?
    if(score%2){
      obstacleTop.setColor("#CCFF00");
      obstacleBottom.setColor("#CCFF00");
    }else{
    //  obstacleTop.setColor("#FF9900");
    //  obstacleBottom.setColor("#FF0099");
    }

    gameSpeed += 0.3;
    size += 1;
    size2 += 1;
}else if(score>380&&score<=500){
  if(score%2){
  //  obstacleTop.setColor("#CCFF00")
  //  obstacleBottom.setColor("#CCFF00")
  }else{
  //  obstacleTop.setColor("#FF9900")
  //  obstacleBottom.setColor("#FF0099")
  }


  size-=1;
  size2+=1;

  //level 3
}else if(score>500&&score<=510){
  size2-=20;
}else if (score>510&&score<=550){
    size+=10;
    size2-=10;
}



    obstacles.push(obstacleBottom);
    obstacles.push(obstacleTop);
}
//Spawn random blocks
function SpawnBaddie(){

  let type = RandomIntInRange(size,size2);
  let obstacle = new Obstacle(canvas.width,canvas.height-type-100,
    50,100,'#2484E4')
    //push obstacles
    obstacles.push(obstacle);
}
//random num generator for min and max range
function RandomIntInRange(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

//initialization
function Start(){
  //total size of the canvas

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  SpawnWall();
  //global font to 20pixels san serif
  ctx.font = "20px sans-serif";
  gameSpeed = 10;
  gravity = 1;
  score = 0;
  highscore = 0;
  if (localStorage.getItem('highscore')) {
    highscore = localStorage.getItem('highscore');
  }
  //creating player x,y,width,height,size,color
  //viewportHeight
  player = new Player(200,canvas.height-500,50,50,'#FF5858');
  scoreText = new Text("Score"+score,25,25,"left","#212121",20);
  highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");
  requestAnimationFrame(Update);
}

//https://gist.github.com/elundmark/38d3596a883521cb24f5
//variables to control the fps of the requestAnimationFrame
var fps = 30;
var now;
var then= Date.now();
var interval = 1000/fps;
var delta;
//for baddies
let initialSpawnTimer=200;
let spawnTimer2=initialSpawnTimer;
//for walls
let wallTimer = 0;

//this puts drawing on a loop
function Update(){
  requestAnimationFrame(Update);
  now = Date.now();
  delta = now - then;
  if(delta > interval){
      ctx.clearRect(0,0,canvas.width,canvas.height);//clear canvas each loop
      wallTimer++;
      //<- gamespeed - length then spawn block
      //want to make spawn the length of each block
      if((gameSpeed - 50)<= wallTimer){
        SpawnWall();
      }
      //baddie spawn
      spawnTimer2--;
      if(spawnTimer2 <= 0){
        //SpawnBaddie();
        spawnTimer2 = initialSpawnTimer - gameSpeed * 8;
        if(spawnTimer2 < 60){
          spawnTimer2 = 60;
        }
      }
    //obstacle detection
      for (let i = 0; i<obstacles.length;i++){
        let o = obstacles[i];
        if(o.x + o.width < 0){
        //when blocks go off screen we delete them
          obstacles.splice(i,1);
        }
        //collision detection
        if(
          player.x < o.x + o.w &&
          player.x + player.w >o.x &&
          player.y < o.y + o.h &&
          player.y + player.h > o.y
        ){
        //hit wall
          alert("try again");
          wallTimer = 0;
          initialSpawnTimer=200;
          size = 100;
          size2 = 400;
          obstacles = [];
          score = 0;
          //wallTimer = initialSpawnTimer;
          gameSpeed = 10;
          window.localStorage.setItem('highscore', highscore);
        }
        o.Update();
      }
      player.Animate();
      score++;
      scoreText.t = "Score: " + score;
      scoreText.Draw();
      //highscore = 0;
      if(score>highscore){
        highscore = score;
        highscoreText.t = "Highscore: " + highscore;
        window.localStorage.setItem('highscore',highscore);
      }
      highscoreText.Draw();
      //gameSpeed+=0.10; //increment speed as game goes on
    then = now - (delta % interval);
  }
}
document.addEventListener('DOMContentLoaded',function(){
  Start();
});
