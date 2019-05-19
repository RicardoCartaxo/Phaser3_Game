class MainGame extends Phaser.Scene{

    constructor(){
        super({key: Constants.MAINGAME.MAINGAME});
    }

    init(data){
        this.volume = data.music;
        this.music = data.music;
        this.bubblePopperLvl = localStorage.getItem("BubblePopperMiniGame") || 1;
        this.foodFightLvl = localStorage.getItem("FoodFightMiniGame") || 1;
        this.mechanicLvl = localStorage.getItem("MechanicMiniGame") || 1;
        this.shipChosen = parseInt(localStorage.getItem('ship'), 10)|| 1;
        this.scene.stop(Constants.MUSIC.GAMESMUSIC);
        this.numberOfShips = 6;
    }

    preload ()
    {

        this.load.image('ship1', './assets/PlayerAssets/ship1.png');
        this.load.image('ship2', './assets/PlayerAssets/ship2.png');
        this.load.image('ship3', './assets/PlayerAssets/ship3.png');
        this.load.image('ship4', './assets/PlayerAssets/ship4.png');
        this.load.image('ship5', './assets/PlayerAssets/ship5.png');
        this.load.image('ship6', './assets/PlayerAssets/ship6.png');

        // LOADING MAP FILES
        this.load.image('roguelikeCity_magenta', './assets/Maps/ASSETS/Spritesheet/roguelikeCity_magenta.png');
        this.load.image('Dungeon Tileset', './assets/Maps/ASSETS/DungeonTileSet/Dungeon Tileset.png');
        this.load.tilemapTiledJSON('polo2', './assets/Maps/MAP/Polo II.json');

    }



    create ()
    {
        // RESET PLAYER VELOCITY
        this.events.on("resume", ()=>{
            this.resetPlayerVelocity();
            this.activateEKey();
        });

        // STOP MINI GAME MUSIC IF RUNNING
        this.scene.stop(Constants.MUSIC.GAMESMUSIC);
        this.callMusic();

        // MAIN CAMERA
        this.cam = this.cameras.main;

        // PAUSING
        this.input.keyboard.on('keyup', function (e){
            if(e.key === "Escape"){
                this.pauseGame();
            }
        },this);


        // MAP JSON INFO
        this.map = this.add.tilemap('polo2');
        // MAP TILE IMAGE SETS
        let rogueCity = this.map.addTilesetImage('roguelikeCity_magenta');
        let dungeon = this.map.addTilesetImage('Dungeon Tileset');
        // MAP LAYERS
        this.backgroundLayer = this.map.createStaticLayer("Background", [rogueCity], 0,0);
        this.environmentLayer = this.map.createStaticLayer("Enviornment", [rogueCity], 0,0);
        this.natureLayer = this.map.createStaticLayer("Nature", [rogueCity], 0,0);
        this.roadsLayer = this.map.createStaticLayer("Roads", [rogueCity], 0,0);
        this.buildingSubLayer = this.map.createStaticLayer("Bulding Sub-Layer", [rogueCity], 0,0);
        this.assetSubLayer = this.map.createStaticLayer("Asset Sub-Layer", [rogueCity], 0,0);
        this.assetsLayer = this.map.createStaticLayer("Assets", [rogueCity], 0,0);
        this.buildingLayer = this.map.createStaticLayer("Building", [rogueCity], 0,0);
        this.doorsLayer = this.map.createStaticLayer("Doors", [dungeon], 0,0);
        this.map.setLayer(this.buildingLayer);


        // ADDING PLAYER (IMAGE)
        let path = 'ship'+this.shipChosen;
        this.player = this.physics.add.sprite(100, 450, path);
        this.player.setScale(1);
        this.playerSpeed = 5;
        this.player.body.allowGravity = false;
        this.cam.startFollow(this.player);
        this.cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels );

        // KEYBOARD KEYS
        this.enableKeyboard();
        this.activateEKey();

        // MINI GAMES TEXT
        this.addText();

        this.cam.flash(500);

    }

    // MAIN GAME LOOP
    update (delta)
    {
        // PLAYER MOVEMENT
        if(this.key_A.isDown || this.key_Left.isDown){
            this.player.flipX= true;
            this.player.angle = 0;
            this.moveLeft()
        }
        else if(this.key_D.isDown || this.key_Right.isDown){
            this.player.flipX= false;
            this.player.angle = 0;
            this.moveRight();

        }else if(this.key_W.isDown || this.key_Up.isDown){
            if(this.player.flipX === false) {
                this.player.angle = -45;
            }else{
                this.player.angle = 45;
            }
            this.moveUp();
        }
        else if(this.key_S.isDown || this.key_Down.isDown){
            if(this.player.flipX === false) {
                this.player.angle = 45;
            }else{
                this.player.angle = -45;
            }
            this.moveDown();
        }else{
            this.resetPlayerVelocity();
        }

        // Added custom class getVelocityX and getVelocityY to phaser.js, line 117752
        if(this.player.getVelocityX() < 0 && (!this.key_A.isDown && !this.key_Left.isDown)){
            this.resetPlayerVelocity();
        }
        else if(this.player.getVelocityX() > 0 && (!this.key_D.isDown && !this.key_Right.isDown)){
            this.resetPlayerVelocity();
        }
        if((this.player.getVelocityY() < 0 && (!this.key_W.isDown && !this.key_Up.isDown))){
            this.resetPlayerVelocity();
        }else if(this.player.getVelocityY() > 0 && (!this.key_S.isDown && !this.key_Down.isDown)){
            this.resetPlayerVelocity();
        }

        // this.cam.flash(800,20,20,100);
        // this.cam.zoomTo(500);
    }

    resetPlayerVelocity(){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }

    enableKeyboard(){
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    addText(){
        this.enterBPGameText = this.add.text(130, 700, "Press E to enter DEQ\nmini game",{
            fontFamily: 'arc',
            color: "#a61eff",
            fontSize: "16px",
            shadow: {
                offsetX: 1,
                color: '#000000',
                blur: 0,
                stroke: true,
                fill: true
            }
        });
        this.enterBPGameText.alpha = 0;

        this.enterFFGameText = this.add.text(1700, 400, "Press E to enter FoodFight\nmini game", {
            fontFamily: 'arc',
            color: "#6acbff",
            fontSize: "16px",
            shadow: {
                offsetX: 1,
                color: '#000000',
                blur: 0,
                stroke: true,
                fill: true
            }
        });
        this.enterFFGameText.alpha = 0;

        this.enterMECGameText = this.add.text(2375, 1000, "Press E to enter DEM\nmini game", {
            fontFamily: 'arc',
            color: "#ffb000",
            fontSize: "16px",
            shadow: {
                offsetX: 1,
                color: '#000000',
                blur: 0,
                stroke: true,
                fill: true
            }
        });
        this.enterMECGameText.alpha = 0;
    }

    resetText(){
        this.enterBPGameText.alpha = 0;
        this.enterFFGameText.alpha = 0;
        this.enterMECGameText.alpha = 0;
    }

    activateEKey(){
        this.input.keyboard.on('keyup', function (e){
            if(e.key === "e" || e.key === "E"){
                if(this.enterBPGameText.alpha === 1){
                    this.scene.pause();
                    this.scene.launch(Constants.POPUP.POPUP, {key: Constants.MAINGAME.MAINGAME, music: this.music, volume: this.volume, state: Constants.STATES.BPPOSITION, BPLvl: this.bubblePopperLvl})

                }
                else if(this.enterFFGameText.alpha === 1){
                    this.scene.pause();
                    this.scene.launch(Constants.POPUP.POPUP, {key: Constants.MAINGAME.MAINGAME, music: this.music, volume: this.volume, state: Constants.STATES.FFPOSITION, FFLvl: this.bubblePopperLvl})

                }
                else if(this.enterMECGameText.alpha === 1){
                    this.scene.pause();
                    this.scene.launch(Constants.POPUP.POPUP, {key: Constants.MAINGAME.MAINGAME, music: this.music, volume: this.volume, state: Constants.STATES.MECPOSITION, MECLvl: this.mechanicLvl})
                }
            }
        },this);
    }

    deactivateEKey(){
        this.input.keyboard.on('keyup', function (e){
            if(e.key === "e" || e.key === "E"){}},this);
    }

    getLevel(key){
        switch(key){
            case Constants.GAMES.BUBBLEPOPPER:
                return this.bubblePopperLvl;
            case Constants.GAMES.FOODFIGHT:
                return this.foodFightLvl;
            case Constants.GAMES.MECHANIC:
                return this.mechanicLvl;
        }
    }

    setLevel(key, level){
        switch (key){
            case Constants.GAMES.BUBBLEPOPPER:
                this.bubblePopperLvl = level;
            case Constants.GAMES.FOODFIGHT:
                this.foodFightLvl = level;
            case Constants.GAMES.MECHANIC:
                this.mechanicLvl = level;
        }
        this.saveGame();
    }

    pauseGame(){
        this.scene.pause();
        this.deactivateEKey();
        this.scene.launch(Constants.POPUP.POPUP, {BPLvl: this.bubblePopperLvl, FFLvl: this.foodFightLvl, MECLvl: this.mechanicLvl,
            key: Constants.MAINGAME.MAINGAME,volume: this.volume, music: this.music,
            score: this._score, state: Constants.STATES.PAUSE})

    }

    // SAVES GAME DATA TO LOCAL STORAGE
    saveGame(){
        localStorage.setItem("BubblePopperMiniGame", JSON.stringify(this.bubblePopperLvl));
        localStorage.setItem("FoodFightMiniGame", JSON.stringify(this.foodFightLvl));
        localStorage.setItem("MechanicMiniGame", JSON.stringify(this.mechanicLvl));
    }

    setShip(index){
        this.shipChosen=index;
        let path = 'ship'+this.shipChosen;
        this.player = this.physics.add.sprite(100, 450, path);
        this.player.setScale(1);
        localStorage.setItem('ship', JSON.stringify(this.shipChosen));
    }

    callMusic(){
        if(this.music){
            if(!this.scene.isActive(Constants.MUSIC.MAINGAMEMUSIC)){
                this.scene.launch(Constants.MUSIC.MAINGAMEMUSIC, {music: this.music, volume: this.volume});
            }
        }
    }

    moveRight(){
        if(this.player.x < this.map.widthInPixels)
            this.player.x = this.player.x +this.playerSpeed;
        this.controlPosition();
    }
    moveLeft(){
        if(this.player.x > 0) {
            this.player.x = this.player.x - this.playerSpeed;
        }
        this.controlPosition();
    }
    moveUp(){
        if(this.player.y > 0) {
            this.player.y = this.player.y - this.playerSpeed;
        }
        this.controlPosition();
    }
    moveDown(){
        if(this.player.y < this.map.heightInPixels);{
            this.player.y = this.player.y + this.playerSpeed;
        }
        this.controlPosition();
    }

    controlPosition(){
        let yPos = this.player.y;
        let xPos = this.player.x;
        if(xPos >= 70 && xPos <= 190){
            if(yPos >= 650 && yPos <= 750 ){
                this.enterBPGameText.alpha = 1;
            }else{
                this.resetText()
            }

        }else if(xPos >= 1700 && xPos <= 1850){
            if(yPos >= 380 && yPos <= 450){
                this.enterFFGameText.alpha = 1;
            }else{
                this.resetText();
            }
        }else if(xPos >= 2440 && xPos <= 2560){

            if(yPos >= 1020 && yPos <= 1100) {
                this.enterMECGameText.alpha = 1;
            }else{
                this.resetText()
            }
        }else{
            this.resetText();
        }
    }
}