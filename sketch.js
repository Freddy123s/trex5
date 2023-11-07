
var trex ,trex_running;
var piso,pisoImage
var pisoinvisible
var cactusimg,cactus
var cloudpng,cloud
var cactusgroup
var score
var cloudgroup
var PLAY=1
var END=0
var gamestate=PLAY
var cactusimg,cactusimage1,cactusimage2,cactusimage3,cactusimage4,cactusimage5
var trexcollided
var Gameover,gameoverpng
var Restart,restartpng
var chekpointsound,diesound,jumpsound
function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png") 
 trexcollided=loadAnimation("trex_collided.png")
pisoImage=loadImage("ground1.png")
cactusimg=loadImage("obstacle1.png")
cloudpng=loadImage("cloud.png")
cactusimage1=loadImage("obstacle2.png")
cactusimage2=loadImage("obstacle3.png")
cactusimage3=loadImage("obstacle4.png")
cactusimage4=loadImage("obstacle5.png")
cactusimage5=loadImage("obstacle6.png")
gameoverpng=loadImage("gameOver.png")
restartpng=loadImage("restart.png")
chekpointsound=loadSound("checkpoint.mp3")
diesound=loadSound("die.mp3")
jumpsound=loadSound("jump.mp3")

}

function setup(){
  createCanvas(windowWidth,windowHeight)
 score=0 
  //crear sprite del t-rex.
 trex=createSprite(100,height-85,50,50)
 trex.addAnimation("trex_running",trex_running)
 trex.addAnimation("trexcollided",trexcollided)
 trex.scale=0.8
 piso=createSprite(width/2,height,width,2);
 pisoinvisible=createSprite(width/2,height-10,width,20)
 pisoinvisible.visible=false
 piso.addImage(pisoImage)
 piso.velocityX=-4
 piso.x=piso.width/2 
 cactusgroup=createGroup()
cloudgroup=createGroup()
trex.setCollider("Circle",0,0,40)
trex.debug=false
Gameover=createSprite(width/2,height/2-50,50)
Restart=createSprite(width/2,height/2,50,50)
Gameover.addImage(gameoverpng)
Restart.addImage(restartpng)
Restart.scale=0.5
}

function draw(){
  background("black")
  if (gamestate===PLAY){
  Gameover.visible=false
  Restart.visible=false
    fill("white")
    text("score"+score,500,20)
    score=score+Math.round(frameCount/60)
    if(score>0&&score%100===0){
    chekpointsound.play()  
    } 
   if (piso.x<0){
   piso.x=piso.width/2
  }  
  if (touches.length > 0 ||keyDown("space")&& trex.y>=100){
  trex.velocityY=-10
  jumpsound.play() 
  touches=[ ]
  } 
  trex.velocityY=trex.velocityY+0.8
nubes()
cactus1()
if(cactusgroup.isTouching(trex)){
  gamestate=END
  //trex.velocityY=-10/IA
  diesound.play()
  cactus.velocityX=0 

  
  } 
  }   
  else if (gamestate===END){
piso.velocityX=0
trex.changeAnimation("trexcollided",trexcollided)
trex.velocityY=0
cactusgroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)
cactusgroup.setLifetimeEach(-1)
cloudgroup.setLifetimeEach(-1)
Gameover.visible=true
Restart.visible=true
if(touches.length > 0 || keyDown("SPACE")) {
 reset()
 touches=[] 
  } 
} 
drawSprites()
trex.collide(pisoinvisible)
}
function nubes(){
if(frameCount%70==0){
  cloud=createSprite(width+20,height-300,50,30)
  cloud.addImage(cloudpng)
cloud.y=Math.round(random(90,120))  
cloud.velocityX=-5
cloud.depth=trex.depth;
trex.depth=trex.depth+1
cloud.lifetime=300
cloudgroup.add(cloud)
}   
}  
function cactus1(){
  if(frameCount%70==0){
    cactus=createSprite(500,height-50,50,50)
    var rand=Math.round(random(1,6))  
    switch(rand){ 
    case 1:cactus.addImage(cactusimg)
    break;
    case 2:cactus.addImage(cactusimage1)  
    break;
    case 3:cactus.addImage(cactusimage2)  
    break;
    case 4:cactus.addImage(cactusimage3)  
    break;
    case 5:cactus.addImage(cactusimage4)  
    break;
    case 6:cactus.addImage(cactusimage5)  
    break;
    default:break

  }
  cactus.velocityX=-7
  cactus.depth=trex.depth;
  trex.depth=trex.depth+1
  cactus.lifetime=300
  cactusgroup.add(cactus)
  
  }   
  }  
  function reset(){
    Gameover.visible=false
    Restart.visible=false
    gamestate=PLAY  
    cactusgroup.destroyEach() 
    cloudgroup.destroyEach()
    score=0
    trex.changeAnimation("trex_running",trex_running)
  }   
