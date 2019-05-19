class Car extends Phaser.GameObjects.Image {
    constructor(scene, x,y, key) {
        super(scene, x,y, key);
        this.key = key;
        this.count = 0;
        this.x = x;
        this.y = y;

        this.setScale(0.2);
    }

    updateCount(){
        this.count++;
        if(this.count > 9){
            this.count = 0;
        }
    }

    getCount(){
        return this.count;
    }

    getKey(){
        return this.key;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}