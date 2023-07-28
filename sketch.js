
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var background, invisibleGround, backgroundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4,obstaclesGroup

var score=0;

var gameOver,player,playerimg



function preload(){

    playerimg =   loadImage("player.png");
    player_collided = loadImage("player.png");
    
    backgroundImage = loadImage("backgeound.jpg");
    
    
    obstacle1 = loadImage("hurdle1 .jpg");
    obstacle2 = loadImage("hurdle2.jpg");
    obstacle3 = loadImage("hurdle3.png");
    obstacle4 = loadImage("hurdle4.png");
    
    
    gameOverImg = loadImage("gamover.jpg");

}

function setup() {
 createCanvas (windowWidth,windowHeight)


  ground=createSprite(width/2,height/2,width,height)
  ground.addImage(backgroundImage)
  ground.scale=0.3

  invisibleGround=createSprite(width/2,height-20,width,10)
  invisibleGround.visible=false

  gameOver=createSprite(width/2,height/2)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false

    player=createSprite(50,height-100)
  player.addImage(playerimg)
  player.scale=0.5
  player.debug=true
  player.setCollider("circle",0,0,85)


  obstaclesGroup= new Group()

}

function draw() {
    background(180);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    background.velocityX = -(6 + 3*score/100);
   
    if( keyDown("space") && player.y >= height-120) {
      player.velocityY = -12;
         }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    
    
    background.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
   
    // player.changeAnimation("collided",player_collided);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    ;
    
    
  }
  
  
  drawSprites();
}




function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-60,10,40);
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
              
      default: break;
    }
    
               
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}




