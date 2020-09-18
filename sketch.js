var car, car_running, car_collided,bimg;
var ground, invisibleGround, groundImage,tekshtImg,teksht;
var cloud,obstacle,cactusGroup,cloudsGroup,cloudImg,c1,c2,c3,c4,c5,c6,score;
gameState="intro";

function preload(){
  car_running = loadImage("car.png");
  car_collided = loadImage("carOof.png");
  cloudImg = loadImage("cloud.png");
  c1 = loadImage("obstacle.png");
  c2 = loadImage("obstacle.png");
  c3 = loadImage("obstacle.png");
  c4 = loadImage("obstacle.png");
  c5 = loadImage("obstacle.png");
  c6 = loadImage("obstacle.png");
  bimg = loadImage("back.jpeg");
  
  groundImage = loadImage("ground.png")
}

function setup() {
  createCanvas(800, 400);
  
  car = createSprite(50,365,20,50);
  car.addImage("running", car_running);
  car.scale = 0.27;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  geround = createSprite(200,380,400,20);
  geround.addImage("ground",groundImage);
  geround.x = geround.width;
  
  invisibleGround = createSprite(200,385,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  cactusGroup = new Group();

  button = createButton('Play');
  button.position(380,240);
  button.mousePressed(play);
  
  score = 0;
}

function draw() {
if(gameState==="play") {
  background(bimg);

  camera.position.x = camera.position.x+6;
  
  if(keyDown("space") && car.y>=345) {
    car.velocityY = -10;
  }

  if(camera.position.x%1000===0) {
    ground.x = camera.position.x+ground.width/2-200;
  }

  if(camera.position.x%2000===0) {
    geround.x = camera.position.x+geround.width-200;
  }
  
  car.x = camera.position.x;

  invisibleGround.x = camera.position.x;

  car.velocityY = car.velocityY + 0.8
  
  car.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles();

  drawSprites();
  
  fill("black");
  textAlign(CENTER);
  textSize(15);
  text("score: "+score,camera.position.x,80);
} else if(gameState==="intro") {
  background(0);

  fill("blue");
  textAlign(CENTER);
  textSize(15);
  text("You were driving when suddenly a portal opened,",400,80);
  text("you got sucked in.",400,100);
  text("It was a portal to the video game dimension,",400,120);
  text("you need to get out. Use space to jump.",400,140);
  text("Collect coins and on the way avoid little browsers.",400,160);

  

}
}

function spawnClouds() {
  if (frameCount % 50 === 0) {
    cloud = createSprite(800,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudImg);
    cloud.scale = 0.2;
    
    cloud.lifetime = 268;
    
    cloud.depth = car.depth;
    cloud.x = camera.position.x+400;
    car.depth = car.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(800,365,40,40);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      
      case 1: obstacle.addImage(c1);
      break;
      case 2: obstacle.addImage(c2);
      break;
      case 3: obstacle.addImage(c3);
      break;
      case 4: obstacle.addImage(c4);
      break;
      case 5: obstacle.addImage(c5);
      break;
      case 6: obstacle.addImage(c6);
      break;
      default: break;
    }
    obstacle.x = camera.position.x+400;
    obstacle.scale = 0.3;
    obstacle.lifetime = 140;
    cactusGroup.add(cloud);
  }
}

function play() {
  gameState="play";
  button.position(0,0);
}