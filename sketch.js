var database;
var dog,happyDog,foodS, foodStock;
var dogAsk;
var dose;
var feedDogButton, addFoodButton;
var fedTime, lastFed, foodObj;
var milkBottle;
var readState, changeState;
var gardenImg, bedroomImg, washroomImg;
var gameState,currentTime;

function preload(){

  dogAsk = loadImage("images/dogImg.png");
  happyDog = loadAnimation("images/dogImg1.png");
  //happyDog = loadImage("images/dogImg1.png");
  milkBottle = loadImage("images/Milk.png");
  //gardenImg = loadAnimation("images/running.png","images/running.png","images/running.png","images/running.png","images/Garden.png");
  gardenImg = loadImage("images/Garden.png");
  bedroomImg = loadImage("images/Bed Room.png");
  washroomImg = loadImage("images/Wash Room.png");
  
}

function setup() {
	createCanvas(1200, 600);

  database = firebase.database();

  dog = createSprite(1050,450,10,10);
  dog.addImage("DogAsking",dogAsk);
  dog.addAnimation("DogHappy", happyDog);
  dog.scale = 0.4;

  foodObj = new Food();

  feedDogButton = createButton('Feed');
  feedDogButton.position(620,70);
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton('Click to add Food');
  addFoodButton.position( 800, 70);
  addFoodButton.mousePressed(addFood);

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  readState = database.ref("gameState");
  readState.on("value", (data)=>{
    gameState = data.val(); 
  });


}


function draw() {  

  background(46,139,87);
 // console.log(foodS);
  currentTime = hour();
  if(currentTime === (lastFed + 1)){
    updateState("playing");
    foodObj.garden();
  }else if(currentTime === (lastFed + 2)){
    updateState("bathing");
    foodObj.washroom();
  }else if(currentTime === (lastFed + 3)){
    updateState("sleeping");
    foodObj.bedroom();
  } else{
    updateState("hungry");
    foodObj.display();
  }
  

  if( gameState !== "hungry"){
    feedDogButton.hide();
    addFoodButton.hide();
    dog.remove();
  } else{
    feedDogButton.show();
    addFoodButton.show();
    dog.addImage(dogAsk);
  }

  fedTimeRef  = database.ref('fedTime');
  fedTimeRef.on("value",(data)=>{

    lastFed = data.val();
    
  });

  
  drawSprites();
  
  textSize(24);
  fill("white");
  text(" Note : Press the button to feed Cherub", 50,50);

  textSize(25);
  if(lastFed >= 12){
      if (lastFed % 12 == 0){
          text(" Last Fed    "+ ":   "+ "At Mid-Day Noon",100,height-100);
      }
      else{ 
          text( " Last Fed   "+ ":   " + lastFed% 12 + "PM",100,height - 100);
      }
  }else if( lastFed == 0){
    text(" Last Fed    "+ ":   "+ "At Midnight",100,height - 100)
  }
  else{
    text( " Last Fed "+ ":" + lastFed + "AM",100,height - 100)   
  }

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

  
  dog.changeAnimation("DogHappy", happyDog);
  image(milkBottle,750,450,80,80);
  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foodObj.deductFood(foodObj.getFoodStock());
  database.ref("/").update({
    food : foodObj.getFoodStock(),
    fedTime :  hour(),
    gameState: "hungry"
  });
 
}

function addFood(){

  database.ref('/').update({

    food : foodS + 1
  });

  
}

function updateState(state){

  database.ref("/").update({

    gameState : state
  })
}

