var SpaceShip, ast1, ast2, ast3, ast_group, blast, laser,space;
var SpaceShip_img, ast1_img,ast3_img, ast2_img, blast_img,laser_img, space_img, blast;
var laserGroup, GameState = 1, END = 0, PLAY = 1, score = 0;
var asteroid;

function preload(){
    SpaceShip_img = loadImage("spaceship.png");
    ast1_img = loadImage("as1.png");
    ast2_img = loadImage("as2.png");
    ast3_img = loadImage("as3.png");
    laser_img= loadImage("laser.png");
    blast_img = loadImage("blast.png");
    space_img= loadImage("space.png");


}

function setup(){
    createCanvas(1400,700);
    space = createSprite(700,350)
    space.addImage(space_img);

    SpaceShip = createSprite(300,600,100,100);
    SpaceShip.addImage(SpaceShip_img);
    SpaceShip.scale = 0.5;

    laserGroup = new Group;
    ast_group = new Group;

    


}

function draw(){

    text( "SCORE"+score,190,70)
    
    console.log(mouseX,mouseY);


   if(keyDown("r") && GameState === 0){
       reset();
       

   }

    if(GameState === 1){
        if(keyDown("RIGHT_ARROW") && SpaceShip.x<1400){
            SpaceShip.x = SpaceShip.x+6;
    
        }
        if(keyDown("LEFT_ARROW") && SpaceShip.x>10){
            SpaceShip.x = SpaceShip.x-6;
    
        }
    
        if(ast_group.isTouching(laserGroup)){
            ast_group.destroyEach();
            score+1;
            
        }
    
        if(SpaceShip.isTouching(ast_group)){
            blast = createSprite(SpaceShip.x,SpaceShip.y);
            blast.addImage(blast_img);
            blast.lifetime = 100;
    
            GameState = 0;
        }
    
        // console.log(SpaceShip.x);
        laser_shooter();
        asteroid();

    }

    if(GameState === 0){
        // SpaceShip.x = 0;
        ast_group.destroyEach();
        laserGroup.destroyEach();
        SpaceShip.visible = false;

    }
    
    

  
    drawSprites();

}

function laser_shooter(){
    if(keyDown("space")){
        laser = createSprite(SpaceShip.x,SpaceShip.y,70,150);
        laser.addImage(laser_img);
        laser.velocityY = -8;
        laserGroup.add(laser);
        shoot = laser.y;



    }
}

function asteroid(){   
    if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(20,1380)),-20);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityY = 6;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(ast1_img);
             break;
      case 2: obstacle.addImage(ast2_img); 
             break;
      case 3: obstacle.addImage(ast3_img);
             break      

      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
  //   obstacle.depth = trex.depth;
  //   trex.depth +=1;
    //add each obstacle to the group
    ast_group.add(obstacle);
  }}

  function reset(){
      GameState = 1;
      SpaceShip.x = 50;
      SpaceShip.visible = true;

  }





