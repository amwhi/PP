//flappy bird-like
//mouse click or x to flap

let GRAVITY = 0.3;
let FLAP = -7;
let GROUND_Y = 600;
let MIN_OPENING = 200;
let bird, ground;
let pipes;
let gameOver;
let birdImg, pipeImg; //groundImg, bgImg;



function setup() {
  createCanvas(900, 650);


  birdImg = loadImage('../BIRD/assets/images/birdie.png');
  pipeImg = loadImage('../BIRD/assets/images/SKYLINE.png');
//  groundImg = loadImage('ground.png');
//  bgImg = loadImage('assets/flappy_bg.png');

  bird = createSprite(width/2, height/2, 40, 40);
  bird.rotateToDirection = false;
  bird.velocity.x = 4;
  bird.setCollider('circle', 0, 0, 20);
  bird.addImage(birdImg);

//  ground.addImage(groundImg);



  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;
}

function draw() {

  if(gameOver && keyWentDown('x'))
    newGame();

  if(!gameOver) {

    if(keyWentDown('x'))
      bird.velocity.y = FLAP;

    bird.velocity.y += GRAVITY;

    if(bird.position.y<0)
      bird.position.y = 0;

    if(bird.position.y+bird.height/2 > GROUND_Y)
      die();

    if(bird.overlap(pipes))
      die();

    //spawn pipes
    if(frameCount%60 == 0) {
      let pipeH = random(50, 150);
      let pipe = createSprite(bird.position.x + width, GROUND_Y-pipeH/2+1+50,80, pipeH);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
        pipe = createSprite(bird.position.x + width, pipeH/2-100, 80, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < bird.position.x-width/2)
        pipes[i].remove();

  }

  camera.position.x = bird.position.x + width/4;

  //wrap ground
//  if(camera.position.x > ground.position.x-ground.width+width/2)
//    ground.position.x+=ground.width;


  background(164, 228, 255);

  textSize(30);
  text('click me', 300, 100);
  fill(0);

  camera.off();
//  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(bird);

}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width/2;
  bird.position.y = height/2;
  bird.velocity.y = 0;

}

function mousePressed() {
  if(gameOver)
    newGame();
  bird.velocity.y = FLAP;
}
