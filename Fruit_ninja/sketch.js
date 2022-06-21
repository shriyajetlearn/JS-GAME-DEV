//Game States
var play=1;
var end=0;
var gameState=1;
var sword, fruit, bomb, fruitGroup, enemyGroup, score, r, x;
var swordImage, fruit1, fruit2 ,fruit3, fruit4, bombImage1, bombImage2, gameOverImage, bgImage;

function preload(){
  bgImage = loadImage("images/fruit_ninja_bg.jpg");
  swordImage = loadImage("images/sword.png");
  bombImage1 = loadImage("images/bomb1.png");
  bombImage2 = loadImage("images/bomb2.png");
  fruit1 = loadImage("images/fruit1.png");
  fruit2 = loadImage("images/fruit2.png");
  fruit3 = loadImage("images/fruit3.png");
  fruit4 = loadImage("images/fruit4.png");
  gameOverImage = loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(600, 600);

  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7

  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();

}

function draw() {
  background(bgImage);

  if(gameState===play){

    //Call fruits and Enemy function
    fruits();
    Enemy();

    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;

    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=end;

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }

  drawSprites();

  //Display score
  text("Score : "+ score,300,30);
}

function Enemy(){
  if(World.frameCount%200===0){
    bomb = createSprite(400,200,20,20);
    x = Math.round(random(1,2));
    if (r==1) {
      bomb.addImage(bombImage1);
    } else if (r==2) {
      bomb.addImage(bombImage2);
    }
    bomb.y = Math.round(random(100,300));
    bomb.velocityX = -8;
    bomb.setLifetime = 50;

    enemyGroup.add(bomb);
  }
}

function fruits(){
  if(World.frameCount%80===0){

    fruit = createSprite(0,0,20,20);
    fruit.x = Math.round(random(50,340));
    fruit.y = Math.round(random(50,340));
    fruit.scale = 0.2;
     //fruit.debug=true;
    r = Math.round(random(1,4));
    if (r==1) {
      fruit.addImage(fruit1);
    } else if (r==2) {
      fruit.addImage(fruit2);
    } else if (r==3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.velocityX=-7;
    fruit.setLifetime=100;

    fruitGroup.add(fruit);
  }
}
