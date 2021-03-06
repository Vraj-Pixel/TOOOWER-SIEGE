var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, food;
var foodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var backgroundImage;
var bground;
var gameOver,gameOverImage;
var gameState=0;
var PLAY,END;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("jungle.jpg");
  gameOverImage=loadImage("gameOver.png")
}



function setup() {
  createCanvas(600, 500);
  
  bground=createSprite(300,300,600,500);
  bground.addImage(backgroundImage);
  bground.x = bground.width/2;
  bground.scale=1.2
  bground.velocityX = -2
  
  

  monkey = createSprite(180, 445, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
 

  ground = createSprite(300, 500, 800, 10);
  ground.shapeColor = "Brown";
  ground.x = ground.width/2;
  ground.visible=false;

 

  foodGroup = createGroup();
  obstacleGroup = createGroup(); 
 
}


function draw() {
  background(255);

  if(gameState===PLAY){

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
    console.log(bground.x);
    if(bground.x<200){
     bground.x = bground.width/2;
  }
  monkey.velocityY = monkey.velocityY + 1.5;

  monkey.collide(ground);

  
  
   spawnFood();
  spawnObstacles();
  
  
  if(foodGroup.isTouching(monkey)){
    score=score+2;
    foodGroup.destroyEach();
  }
  
  
  
  switch(score){ 
    case 10: monkey.scale=0.12;
                          break;
   case 20: monkey.scale=0.14; 
                          break; 
   case 30: monkey.scale=0.16; 
                          break;
   case 40: monkey.scale=0.18;
                         break; 
   default: break; }

   if(obstacleGroup.isTouching(monkey)){
    gameState=END
  }

}
 if(gameState===END){
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  bground.velocityX=0;
  background('White');
  monkey.display=false;
}


 

  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,20);
}


function spawnFood() {
  if (frameCount % 80 === 0) {
    
    var food = createSprite(600, 450, 20, 40);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -5;
    food.lifetime = 600;
    foodGroup.add(food);
  }
 }
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 460, 20, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 600;
    obstacleGroup.add(obstacle);
  }
}

