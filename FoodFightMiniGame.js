class FoodFightMiniGame extends Phaser.Scene {

    //Bug to fix: if holding down A or D and pause, when we resume the player keeps moving on -.-
    //ADD popup when we passed level, with continue which will start next level
    //Add limit time and goal score, if it's reached then next level

    //this.events.addEventListener("");

    constructor() {
        super({key: Constants.GAMES.FOODFIGHT});
    }

    //Retrieving Data
    init(data) {
        this.volume = this.scene.get(Constants.MAINMENU.MAINMENU).getVolume();
        this.music = this.scene.get(Constants.MAINMENU.MAINMENU).getMusic();
        this._level =  parseInt(localStorage.getItem("FoodFightMiniGame")) || 1;
        this._scoreAmount = 0;
        this.initLevel(this._level);
    }

    preload(){
        //Food Images
        this.load.image('food1', './assets/FoodFightAssets/food1.png');
        this.load.image('food2', './assets/FoodFightAssets/food2.png');
        this.load.image('food3', './assets/FoodFightAssets/food3.png');


        //Background Image
        this.load.image('bg', './assets/FoodFightAssets/bg.jpg' );

        //Heart Image
        this.load.image('heart', './assets/FoodFightAssets/heart.png' );

        //Player Spritesheet
        this.load.spritesheet('cat', './assets/PlayerAssets/cat_fighter_sprite2.png',{
            frameWidth : 50,
            frameHeight : 50,
            margin : 1,
            spacing: 1
        });

        this.load.image('pause','./assets/MenuAssets/pause.png');
    }

    create(){

        // TIMER
        this.timer = this.time.addEvent({
            delay: this._maxTime,
            loop: true,
            callback: () => {
                if(this._scoreAmount >= this._scoreObjective){
                this.nextLevel();
            }
                if(this._scoreAmount !== 0 && (this._scoreAmount < this._scoreObjective)){
                    this.gameOver();
                }},
        });

        // MUSIC
        this.callMusic();

        // MAIN CAMERA
        this.cam = this.cameras.main;

        // PAUSE
        this.input.keyboard.on("keydown", (e)=>{
            if(e.key === "Escape"){
                this.pauseGame();
            }
        });

        // CANVAS HEIGHT + WIDTH
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;

        // BG
        this.bg = this.add.image(400,300, 'bg');

        // PLAYER
        this.player = this.physics.add.sprite(100, 450, 'cat');
        this.player.setCircle(20,10,10);
        this.player.y = this.sys.game.canvas.height - 20;
        this.player.setCollideWorldBounds = true;
        this.player.body.allowGravity = false;
        this.player.setScale(2);
        //Creating Player Animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('cat', { start: 3, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('cat', { start: 3, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // SCORE
        this.scoreText = 0;
        // FOOD
        this.foodArr = [];

        //Creating food Items based on level player is in
        for(let o = 0; o < this._amountOfFood; o++) {
            let food1b = new Food(this, this.canvasWidth, -1*this.getRandomInt(60), this.getRandomFoodKey());
            let food1a = new Food_S(this,this.getRandomInt(this.canvasWidth), food1b.y, food1b.key);
            this.foodArr.push(food1a);
        }

        //Adding food items to physics group
        this.foods = this.physics.add.group();
        for(let k = 0; k < this.foodArr.length; k++){
            this.foods.add(this.foodArr[k]);
        }

        this.scoreText = this.add.text(5,0, "Score: ", {font: "40px impact"});
        this.levelText = this.add.text(200,0, "Level: " + this._level, {font: "40px impact"});
        this.scoreObjectiveText = this.add.text(400,0, "Objective: " + this._scoreObjective, {font: "40px impact"});

        //If player touches a food item then we call the function hitFood()
        this.physics.add.overlap(this.player, this.foods, this.hitFood, null, this);

        // CAM EFFECT
        this.cam.flash(500);

        // TIME TEXT
        this.timeText = this.add.text(5,50,'Elapsed Time: ' + 0, {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "16px"
        });

        this.max_timeText = this.add.text(5,70, 'Max Time: ' + this._maxTimeText, {
            fontFamily: 'arc',
                color: "#ffffff",
                fontSize: "16px"
        });

    }


    update (time, delta)
    {
        this.scene.stop(Constants.MUSIC.MAINGAMEMUSIC);


        let elapsed = this.timer.getElapsedSeconds();
        this.timeText.setText('Elapsed Time: ' + elapsed);
        this.paused = false;
        this.input.keyboard.enabled = true;
        this.scoreText.setVisible(true);


        //Moves each food item in food array
        for(let k = 0; k < this.foodArr.length; k++) {
            this.moveFood(this.foodArr[k], k);
        }

        //PlayerHorizontalMovement
        if(this.key_A.isDown || this.key_Left.isDown){
            if(this.player.x > 5) {
                this.player.anims.play('left', true);
                this.player.flipX = true;
                this.player.flipY = false;
                this.player.x = this.player.x - this.playerSpeed;
            }
        }
        else if(this.key_D.isDown || this.key_Right.isDown){
            if(this.player.x < this.sys.game.canvas.width) {
                this.player.anims.play('right', true);
                this.player.flipX = false;
                this.player.flipY = false;
                this.player.x = this.player.x + this.playerSpeed;
            }
        }
        else{
            this.player.flipY = false;
            this.player.anims.play('idle', true);
        }

        //Updates score text
        this.scoreText.setText("Score " + this._scoreAmount);

    }

    initLevel(level){
        switch (level) {
            case 1:
                this.playerSpeed = 5;
                this.foodSpeed = 2;
                this._amountOfFood = 5;
                this._scoreObjective = 50;
                this._maxTime = 100000;
                this._maxTimeText = 100;
                break;
            case 2:
                this.playerSpeed = 6;
                this.foodSpeed = 3;
                this._amountOfFood = 6;
                this._scoreObjective = 90;
                this._maxTime = 100000;
                this._maxTimeText = 100;
                break;
            case 3:
                this.playerSpeed = 6;
                this.foodSpeed = 4;
                this._amountOfFood = 6;
                this._scoreObjective = 125;
                this._maxTime = 120000;
                this._maxTimeText = 120;
                break;
            case 4:
                this.playerSpeed = 6;
                this.foodSpeed = 4;
                this._amountOfFood = 7;
                this._scoreObjective = 155;
                this._maxTime = 130000;
                this._maxTimeText = 130;
                break;
            case 5:
                this.playerSpeed = 7;
                this.foodSpeed = 6;
                this._amountOfFood = 6;
                this._scoreObjective = 190;
                this._maxTime = 140000;
                this._maxTimeText = 140;
                break;
            default:
                this.playerSpeed = 8;
                this.foodSpeed = 6;
                this._amountOfFood = 8;
                this._scoreObjective = 250+this._level;
                this._maxTime = 140000;
                this._maxTimeText = 140;
                break;
        }
    }



    //When player hits a food item, we disable the foodItem body and increment score
    hitFood (player, foody)
    {
        this._scoreAmount++;
        this.cam.flash(100, 148, 0, 211);
        foody.disableBody(true, true);

    }

    //Generates random keys for food items
    getRandomFoodKey() {
        var foodsArray = ['food1','food2','food3'];
        var random = Math.floor(Math.random()*foodsArray.length);
        return foodsArray[random];
    }

    //Generates random integer between 0 and canvas width
    getRandomInt() {
        return Math.floor(Math.random() * Math.floor(this.canvasWidth));
    }

    //Moves food item by changing it's y coordinate and resets if (y > canvas height)
    moveFood(food){
        food.y += this.foodSpeed;
        if (food.y > this.canvasHeight) {
            //if(food.getShown()){this._hearts--;}
            this.resetFoodPosition(food);
        }
    }
    //Resets food item to the top of the screen and enables it's body again
    resetFoodPosition(food){
        // put the ship on the top
        var randomY = -1*this.getRandomInt(80);
        // put the ship on a random position on the x axis
        var randomX = Phaser.Math.Between(0, this.canvasWidth);
        food.enableBody(true,randomX,randomY,true,true);
    }

    gameOver(){
        this.scene.pause();
        this.scene.launch(Constants.POPUP.POPUP, {key: Constants.GAMES.FOODFIGHT, score: this._scoreAmount, level: this._level, music: this.music, volume: this.volume, state: Constants.STATES.GAMEOVER})
    }

    nextLevel(){
        this._level++;
        localStorage.setItem("FoodFightMiniGame", JSON.stringify(this._level));
        this.scene.pause();
        this.scene.launch(Constants.POPUP.POPUP, {key: Constants.GAMES.FOODFIGHT, volume: this.volume, music: this.music, state: Constants.STATES.NEXTLEVEL, level: this._level})
    }

    pauseGame(){
        this.scene.pause();
        this.scene.launch(Constants.POPUP.POPUP, {key: Constants.GAMES.FOODFIGHT, score: this._scoreAmount, volume: this.volume, music: this.music, state: Constants.STATES.PAUSE, level: this._level})
    }


    getMusic(){
        return this.music;
    }

    getVolume(){
        return this.volume;
    }

    callMusic(){
        if(this.music){
            if(!this.scene.isActive(Constants.MUSIC.GAMESMUSIC)){
                this.scene.launch(Constants.MUSIC.GAMESMUSIC, {music: this.music, key: Constants.GAMES.FOODFIGHT});
            }
        }
    }
}