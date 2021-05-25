class Food{

    constructor(){

        this.image = loadImage("images/Milk.png");
        this.foodStock= 0;
        this.lastFed;

    }

    getFoodStock(){
       return this.foodStock
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getLastFedTime(lastFed){

        this.lastFed = lastFed;
    }

    deductFood(){
        this.foodStock = this.foodStock -1 ;
    }

    bedroom(){
        background(bedroomImg,500,500);
    }
    washroom(){
        background(washroomImg,500,500);
    }
    garden(){
        background(gardenImg,500,500);
    }

    display(){

        
        var x= 80 , y= 100;
        
        if(this.foodStock !== 0){
            for(var i =0 ; i < this.foodStock ; i++){
                if(i % 10 === 0){
                    x = 80;
                    y = y+ 30
                }
                image(this.image,x,y,70,70);
                x = x + 30
            }
        }
        

    }
}