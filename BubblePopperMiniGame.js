class BubblePopperMiniGame extends Phaser.Scene {

    constructor() {
        super({key: Constants.GAMES.BUBBLEPOPPER});
    }
    init(data){
        this.volume = this.scene.get(Constants.MAINMENU.MAINMENU).getVolume();
        this.music = this.scene.get(Constants.MAINMENU.MAINMENU).getMusic();

        this._level = parseInt(localStorage.getItem("BubblePopperMiniGame")) || 1;
        this.initLevel(this._level);

        this._score = 0;

    }

    getLevel(){
        return this._level;
    }

    getMusic(){
        return this.music;
    }

    getVolume(){
        return this.volume;
    }

    initLevel(level){
        switch(level){
            case 1:
                this._initSpeed = 0.25;
                this._initialBubbles = 2;
                this._maxScore = 40;
                break;
            case 2:
                this._initSpeed = 0.25;
                this._initialBubbles = 3;
                this._maxScore = 50;
                break;
            case 3:
                this._initSpeed = 0.50;
                this._initialBubbles = 2;
                this._maxScore = 40;
                break;
            case 4:
                this._initSpeed = 0.50;
                this._initialBubbles = 3;
                this._maxScore = 45;
                break;
            case 4:
                this._initSpeed = 0.60;
                this._initialBubbles = 2;
                this._maxScore = 40;
            default:
                this._initSpeed = 0.65;
                this._initialBubbles = this._level+1;
                this._maxScore = 35;
        }
    }

    getInitSpeed(){
        return this._initSpeed;
    }


    preload(){
        //Background Image
        this.load.image('bg', './assets/FoodFightAssets/bg.jpg' );

        //Loading Audio
        this.load.audio('pop', './assets/BubblePopperAssets/pop.mp3');

        // Loading Bubbles
        this.load.image('a1', './assets/BubblePopperAssets/beryllium.png');
        this.load.image('a2', './assets/BubblePopperAssets/boron.png');
        this.load.image('a3', './assets/BubblePopperAssets/helium.png');
        this.load.image('a4', './assets/BubblePopperAssets/hydrogen.png');
        this.load.image('a5', './assets/BubblePopperAssets/iron.png');
        this.load.image('a6', './assets/BubblePopperAssets/lithium.png');
        this.load.image('a7', './assets/BubblePopperAssets/oxygen.png');




    }

    create(){

        // MUSIC
        this.callMusic();
        // MAIN CAMERA
        this.cam = this.cameras.main;

        // PAUSE
        this.input.keyboard.on('keyup', function (e){
            if(e.key === "Escape"){
                this.pauseGame();
            }
        },this);

        // POP SOUND
        this.popSound = this.sound.add('pop');


        // BG IMAGE
        this.sky = this.add.image(0, 0, 'bg');
        this.sky.setOrigin(0,0);

        //INIT BUBBLE ARRAY
        this.bubbles = [];

        // TEXT
        this.scoreText = this.add.text(this.game.canvas.width/2-125,25, '', {fontFamily:'Arial Black', fontSize:64, color:'#660066'});
        this.scoreText.setStroke('#9900cc', 5);
        this.scoreText.setShadow(2, 2, '#333333', 2, true, false);

        this.maxScoreText = this.add.text(this.game.canvas.width-175,10, '', {fontFamily:'Arial Black', fontSize:32, color:'#660066'});
        this.maxScoreText.setStroke('#9900cc', 5);
        this.scoreText.setShadow(2, 2, '#333333', 2, true, false);

        this.startGame();
        this.cam.flash(500);
    }

    startGame() {
        var sx = (this.sys.game.canvas.width)/3;
        for(var i=0;i<this._initialBubbles;i++) {
            this.addBubble(sx*i + sx*0.5, this._initSpeed);
        }
    }

    gameOver() {
        this.cameras.main.shake(500);
        this.bubbles.forEach(b => this.killBubble(b , false));
        this.scene.pause();
        this.scene.launch('PopUp', {key: Constants.GAMES.BUBBLEPOPPER,score: this._score, level: this._level, music: this.music, volume: this.volume, state: Constants.STATES.GAMEOVER});
    }

    nextLevel(){
        this._level++;
        localStorage.setItem("BubblePopperMiniGame" , JSON.stringify(this._level));
        this.scene.pause();
        this.scene.launch(Constants.POPUP.POPUP, {level: this._level,key: Constants.GAMES.BUBBLEPOPPER, score: this._score, music: this.music, volume: this.volume, state: Constants.STATES.NEXTLEVEL});

    }

    pauseGame(){
        this.scene.pause();
        this.scene.launch(Constants.POPUP.POPUP, {level: this._level,key: Constants.GAMES.BUBBLEPOPPER,volume: this.volume, music: this.music, score: this._score, state: Constants.STATES.PAUSE})
    }

    addBubble(x, initSpeed) {
        if(!x){
            x = Math.floor(Math.random()*(this.sys.game.canvas.width)) + 64;
        }
        let bubble = new Bubble(this, x, this.sys.game.canvas.height+128, this.randomColor());
        bubble.setScale(0.2);
        //Increment speed according to score
        bubble.speed = initSpeed + Math.random() + (this._score/10);
        this.bubbles.push(bubble);
    }

    killBubble(bubbleP, toScore) {
        if(toScore === true) {
            this._score++;
        }
        if(this.volume) {
            this.popSound.play();
        }

        this.bubbles = this.bubbles.filter(b => b!==bubbleP);
        var tween1 = this.tweens.add({
            targets: bubbleP,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 50
        });
        var tween2 = this.tweens.add({
            targets: bubbleP,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            delay: 50,
            onComplete: () => bubbleP.destroy()
        });
    }



    randomColor() {
        var elements = ['a1','a2','a3','a4','a5','a6','a7'];
        var random = Math.floor(Math.random()*elements.length);
        return elements[random];
    }

    update (time, delta)
    {
        this.bubbles.forEach(b => b.update(time,delta));
        this.scoreText.setText('Score: '+ this._score );
        this.maxScoreText.setText('Goal: ' + this._maxScore);

        if(this._score >= this._maxScore){
            this.nextLevel();
        }

    }

    playSong(){
        this.song.play();
    }
    stopSong(){
        this.song.pause();
    }

    getVolume(){
        return this.volume;
    }
    getMusic(){
        return this.music;
    }

    callMusic(){
        if(this.music){
            if(!this.scene.isActive(Constants.MUSIC.GAMESMUSIC)){
                this.scene.launch(Constants.MUSIC.GAMESMUSIC, {volume: this.volume, music: this.music, key: Constants.GAMES.BUBBLEPOPPER})
            }
        }
    }


}