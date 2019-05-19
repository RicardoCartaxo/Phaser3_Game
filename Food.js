class Food extends Phaser.GameObjects.Image {
    constructor(scene, x,y, key) {
        super(scene, x,y, key);
        //this.speed = speed;
        this.key = key;
    }
    /*
    setSpeed(speed){
        this.speed = speed;
    }*/

    update(time,delta) {
        this.y += this.speed;
    }
}