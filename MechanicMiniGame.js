class MechanicMiniGame extends Phaser.Scene {


    constructor() {
        super({key: Constants.GAMES.MECHANIC});
    }

    init(data){
        this._level = this.mechanicLvl = parseInt(localStorage.getItem("MechanicMiniGame")) || 1;
        this.initLevel(this._level);


        // Initializing array to hold car object/img keys
        this.carKeyArr = [];
        // Initializing array to hold actual car objects
        this.carArr = [];
        // Initializing integer array to hold count values
        this.carrArrValues = [];
        this.carSpeeds = [];

        // Stopping Menu Music
        this.scene.get(Constants.MUSIC.MENUMUSIC).pauseMusic(false);

        // Getting volume and music parameters
        this.volume = this.scene.get(Constants.MAINMENU.MAINMENU).getVolume();
        this.music = this.scene.get(Constants.MAINMENU.MAINMENU).getMusic();

        this.canFinish = true;

    }

    initLevel(level){
        switch(level){
            case 1:
                this._AmountOfCars = 3;
                this._PlayerSpeed = 10;
                this._CarSpeed = 4;
                this._CarMaxSpeed = 8;
                break;
            case 2:
                this._AmountOfCars = 3;
                this._PlayerSpeed = 10;
                this._CarSpeed = 5;
                this._CarMaxSpeed = 10;
                break;
            case 3:
                this._AmountOfCars = 4;
                this._PlayerSpeed = 10;
                this._CarSpeed = 5;
                this._CarMaxSpeed = 12;
                break;
            case 4:
                this._AmountOfCars = 5;
                this._PlayerSpeed = 10;
                this._CarSpeed = 5;
                this._CarMaxSpeed = 14;
                break;
            case 5:
                this._AmountOfCars = 5;
                this._PlayerSpeed = 10;
                this._CarSpeed = 6;
                this._CarMaxSpeed = 16;
                break;
            default:
                this._AmountOfCars = 6;
                this._PlayerSpeed = 10;
                this._CarSpeed = 7;
                this._CarMaxSpeed = 16+this._level;
                break;
        }


    }

    preload(){
        // Loading Road Image
        this.load.image('road', './assets/MechanicAssets/road.png');

        this.load.audio('scream', './assets/MechanicAssets/sounds/scream.mp3');

        // Loading Finish Line Image
        this.load.image('obj','./assets/MechanicAssets/finish.jpg');

        // Loading Cars
        for(var k = 1; k < 5; k++) {
            this.load.image('car' + k, './assets/MechanicAssets/car' + k + '.png');
            this.carKeyArr.push('car' + k);
        }

        // Loading Player Spritesheet
        this.load.spritesheet('cat', './assets/PlayerAssets/cat_fighter_sprite2.png',{
            frameWidth : 50,
            frameHeight : 50,
            margin : 1,
            spacing: 1
        });


    }

    create() {

        for(var i = 0; i < 6; i++){
            this.carSpeeds[i] = this._CarSpeed;
        }

        this.timer = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this._CarSpeed = Math.random() * (this._CarMaxSpeed - this._CarSpeed) + this._CarSpeed;
                for(var i = 0; i < 6; i++){
                    this.carSpeeds[i] = Math.random() * (this._CarMaxSpeed - this._CarSpeed) + this._CarSpeed;
                }
        },});

        // MUSIC
        this.callMusic();
        // SOUND
        this.screamSound = this.sound.add('scream');
        // MAIN CAMERA
        this.cam = this.cameras.main;

        // CANVAS DIMENSIONS
        this.canvasWidth = this.game.canvas.width;
        this.canvasHeight = this.game.canvas.height;

        // BG IMAGE
        this.add.image(this.canvasWidth/2,this.canvasHeight/2,'road');
        //Adding finish line image
        this.obj = this.physics.add.image(100,20, 'obj');

        // PLAYER
        this.player = this.physics.add.sprite(this.canvasWidth/2, this.canvasHeight, 'cat');
        this.player.setSize(40,40,5,0);
        this.player.setCollideWorldBounds(true);
        this.player.onWorldBounds = true;
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
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('cat', { start: 22, end: 25 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('cat', { start: 22, end: 25 }),
            frameRate: 5,
            repeat: -1
        });

        // PLAYER MOVEMENT (STEP-WISE)
        this.input.keyboard.on('keydown', function (e){
            if(e.key === "0"){
                this.scene.resume(Constants.MAINGAME.MAINGAME, {level: this._level});
            }else if(e.key === "Escape"){
                this.scene.pause();
                this.scene.launch(Constants.POPUP.POPUP, {key: Constants.GAMES.MECHANIC, level: this._level, score: this.score, state: Constants.STATES.PAUSE})
            }
            else if(e.key === "w" || e.key === "W" || e.key === "UP" || e.key === "ArrowUp"){
                this.player.flipY = false;
                this.player.anims.play('up', true);
                this.player.y = this.player.y -this._PlayerSpeed;
            }
            else if(e.key === "d" || e.key === "D" || e.key === "ArrowRight"){
                this.player.anims.play('right', true);
                this.player.flipX= false;
                this.player.flipY = false;
                this.player.x = this.player.x +this._PlayerSpeed;

            }
            else if(e.key === "s" ||e.key === "S" || e.key === "ArrowDown"){
                this.player.y = this.player.y +this._PlayerSpeed;
                this.player.flipY = true;
                this.player.anims.play('down', true);
            }
            else if(e.key === "a" || e.key === "A" || e.key === "ArrowLeft"){
                this.player.anims.play('left', true);
                this.player.flipX= true;
                this.player.flipY = false;
                this.player.x = this.player.x - this._PlayerSpeed;
            }else if(e.key === 'l'){
                this.scene.pause();
            }
            else {
                this.player.flipY = false;
                this.player.anims.play('idle', true);
            }

        },this);


        // CARS
        let initialXr = 30;
        let initalXl = this.canvasWidth -21;
        let initialY = 20;
        for(var i = 0; i < this._AmountOfCars; i++){
            let initX;
            // Cars come from left and right
            if(i % 2 === 0){
                initX = initialXr;
                this.carrArrValues.push(0);
            }else{
                initX = initalXl;
                this.carrArrValues.push(1);
            }
            var carImg = new Car(this, initX,initialY,this.getRandomCarKey());
            var carBody = this.physics.add.image(carImg.getX(),carImg.getY(), carImg.getKey());
            carBody.setScale(0.2);
            carBody.setCircle(100,0,0);
            carBody.angle = 90;
            this.carArr.push(carBody);
            initialY += 100;
        }

        // CAR HIT DETECTION
        this.cars = this.physics.add.group();
        for(let k = 0; k < this.carArr.length; k++){
            this.cars.add(this.carArr[k]);
        }

        this.objective = this.physics.add.group();
        this.objective.add(this.obj);


        this.physics.add.overlap(this.player, this.cars, this.accident, null, this);
        this.physics.add.overlap(this.player, this.objective, this.win, null, this);

        this.cam.flash(500);


    }

    accident(){
        this.canFinish = false;
        this.screamSound.play({volume: 0.2});
        this.cam.flash(300,255,0,0);
        this.cam.shake(300,0.05,false, (camera) => {
            if(camera.shakeEffect.progress === 1)

                this.scene.pause();
                this.scene.launch(Constants.POPUP.POPUP, {key: Constants.GAMES.MECHANIC, level: this._level, state: Constants.STATES.GAMEOVER});
        });

    }

    win(){
        if(this.canFinish) {
            this._level++;
            this.scene.pause();
            localStorage.setItem("MechanicMiniGame", JSON.stringify(this._level));
            this.scene.launch(Constants.POPUP.POPUP, {
                key: Constants.GAMES.MECHANIC,
                level: this._level,
                state: Constants.STATES.NEXTLEVEL
            })
        }
    }

    getRandomCarKey() {
        var random = Math.floor(Math.random() * this.carKeyArr.length);
        return this.carKeyArr[random];
    }

    deplaceCar(car, numberArr, index){
        if(numberArr[index] % 2 === 0){
            this.deplaceCarRight(car);
            if(car.x > this.canvasWidth -20){
                car.angle *= -1;
                this.checkDirection(numberArr, index);
            }
        }else{
            this.deplaceCarLeft(car);
            if(car.x < 20){
                car.angle *= -1;
                this.checkDirection(numberArr, index);
            }
        }
    }

    checkDirection(numberArr, index){
        numberArr[index]++;
        if(numberArr[index] > 9){
            numberArr[index] = 0;
        }
        // numberArr[k] is used to decide whether car k goes left or right
    }

    randomSpeed() {
        var random = Math.floor(Math.random()*this.carSpeeds.length);
        return this.carSpeeds[random];
    }

    deplaceCarRight(car){
        car.x += this.randomSpeed();
    }
    deplaceCarLeft(car){
        car.x -= this.randomSpeed();

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
                this.scene.launch(Constants.MUSIC.GAMESMUSIC, {music: this.music, key: Constants.GAMES.MECHANIC});
            }
        }
    }


    update(delta)
    {
        // MOVE CARS
        for(let k = 0; k < this.carArr.length; k++) {
            this.deplaceCar(this.carArr[k], this.carrArrValues, k);
        }

    }

}