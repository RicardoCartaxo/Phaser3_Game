class Food_S extends Phaser.Physics.Arcade.Image {
    constructor(scene, x,y, key) {
        super(scene, x,y, key);
        this.key = key;

        scene.add.existing(this);


        this.shown = true;
    }

    update(time,delta) {
        this.y += this.speed;
    }

    showToFalse(){
        this.shown = false;
    }
    showToTrue(){
        this.shown = false;
    }
    getShown(){
        return this.shown;
    }
}