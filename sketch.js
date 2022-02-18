var submarine, starfish, trash, starfishImg, trashImg, seabg1, seabg2;
var gameover, gameoverImg, resetImg, reset, submarineImg, ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var starfishGroup,trashGroup;

function preload(){
  submarineImg=loadImage('./assets/submarine.png');
  trashImg=loadImage('./assets/bottle.png');
  starfishImg=loadImage('./assets/starfish.png');
  seabg1=loadImage('./assets/sea2.jpeg');
  seabg2=loadImage('./assets/sea1.jpeg');
  gameoverImg=loadImage('./assets/gameover.png');
  resetImg=loadImage('./assets/reset.png');
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  ground=createSprite(width/3.5,height/3,displayWidth,displayHeight);
  ground.addImage(seabg1);
  ground.scale=1.7;

  submarine=createSprite(width/8,height/2);
  submarine.addImage(submarineImg);
  submarine.scale=0.2;

  gameover=createSprite(width/2,height/2);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  gameover.visible=false;

  reset=createSprite(width-50,50);
  reset.addImage(resetImg);
  reset.scale=0.5;
  reset.visible=false;

  starfishGroup=new Group();
  trashGroup=new Group();
}

function draw(){
  background('#014574');

  if(gameState==PLAY){
    if(ground.x<width/3){
      ground.x=width/2;
    }
  
    spawnTrash();
    spawnStarfish();
  
    submarine.y=mouseY;
    ground.velocityX=-10;

    if(trashGroup.isTouching(submarine)){
      score=score+50;
      trashGroup.destroyEach();
    }
    
    if(starfishGroup.isTouching(submarine)){
      gameState=END;
    }
  }

  if(gameState===END){
    ground.velocityX=0;
    gameover.visible=true;
    reset.visible=true;

    if(mousePressedOver(reset)){
      resetFunc();
    }

    trashGroup.setVelocityXEach(0);
    starfishGroup.setVelocityXEach(0);
    trashGroup.setLifetimeEach(-1);
    starfishGroup.setLifetimeEach(-1);
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

function spawnTrash(){
  if(frameCount%175===0){
    trash=createSprite(width+10,Math.round(random(height/4,height-100)));
    trash.addImage(trashImg);
    trash.velocityX=-6.5;
    trash.lifetime=width/2;
    trash.scale=0.2;
    trashGroup.add(trash);
  }
}

function spawnStarfish(){
  if(frameCount%150===0){
    starfish=createSprite(width+10,Math.round(random(height/3,height-100)));
    starfish.addImage(starfishImg);
    starfish.velocityX=-5.6;
    starfish.lifetime=width/2;
    starfish.scale=0.1;
    starfishGroup.add(starfish);
  }
}

function resetFunc(){
  gameover.visible=false;
  gameState=PLAY;
  trashGroup.destroyEach();
  starfishGroup.destroyEach();
  score=0;
}