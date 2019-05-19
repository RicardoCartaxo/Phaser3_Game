class Bubble extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, key) {
        super(scene, x,y, key);

        this.scene = scene;
        //Add bubble to scene
        scene.add.existing(this);
        //Set bubble to be interactive
        this.setInteractive();
        //On click we call function onPop
        this.on('pointerdown', e => this.onPop(e));
        //Generating angles, to left or right, between -15 to 15 degrees
        this.angle = -15 + Math.random()*30;				// -15 to 15
        this.angleDir = -1 + Math.round(Math.random())*2;	// 1 or -1
        //Setting initial speed
        this.speed = 0.25;
        //Setting scale
        super.setSize(50,50);
    }

    onPop(event) {
        this.scene.addBubble(0, this.scene.getInitSpeed());
        this.scene.killBubble(this, true);
    }

    update(time,delta) {
        //Bubble too high, game over
        if(this.y<-64) return this.scene.gameOver();

        this.x += this.angle/20;
        if(this.x<64) this.x = 64;
        if(this.x>(this.scene.sys.game.config.width-64)) this.x = this.scene.sys.game.config.width-64;

        this.angle += this.angleDir/5;
        if(this.angle>25 || this.angle<-25) this.angleDir *= -1;

        this.y -= this.speed;
    }
}