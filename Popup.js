class Popup extends Phaser.Scene{

    constructor(){
        super({key: Constants.POPUP.POPUP})
    }

    init(data){
        this.music = data.music;
        this.volume = data.volume;
        this.caller = data.key;
        this.scoreAmount = data.score;
        this.input.keyboard.enabled = false;
        this.state = data.state;
        this.level = data.level;
        this.page = data.page;
        this.ship = 0;
        this.BPLvl = localStorage.getItem('BubblePopperMiniGame') || data.BPLvl || 1;
        this.FFLvl = localStorage.getItem('FoodFightMiniGame') || data.FFLvl || 1;
        this.MECLvl = localStorage.getItem('MechanicMiniGame') || data.MECLvl || 1
    }

    preload(){
        this.load.image('popup', './assets/FoodFightAssets/popup.png');
        this.load.image('back', './assets/MenuAssets/Back Button.png');
        this.load.image('retry', './assets/MenuAssets/Retry Button.png');
        this.load.image('next' , './assets/MenuAssets/Next Button.png');
        this.load.image('play', './assets/MenuAssets/Play Button.png');
        this.load.image('nextPage', './assets/MenuAssets/arrow.png');
        this.load.image('miniGameButton', './assets/MenuAssets/miniButton.png');

        if(this.caller === Constants.MENUS.HELPMENU && this.page > 1){
            this.load.image('controls', './assets/MenuAssets/help2.png');
        }
        else if(this.caller === Constants.MAINGAME.MAINGAME && this.state === Constants.STATES.WELCOME){
            let numberOfShips = 6;
            for(var k = 1; k <= numberOfShips; k++){
                let path = "ship"+k;
                this.load.image(path, './assets/PLayerAssets/' + path + '.png');
            }
            this.load.image('play', './assets/MenuAssets/Play Button.png')
        }

    }

    create(){
        this.cam = this.cameras.main;
        this.scene.stop(Constants.MUSIC.MAINGAMEMUSIC);

        this.canvasWidth = this.game.canvas.width;
        this.canvasHeight = this.game.canvas.height;

        this.scene.bringToTop();
        this.scene.setVisible(true);
        this.add.image(this.canvasWidth / 2, this.canvasHeight/2, 'popup');
        this.showLevel = this.level - 1;

        switch(this.caller){
            // HELP MENU
            case Constants.MENUS.HELPMENU:
                this.createArrowButton(this.page);
                this.createHelpText(this.page);
                break;

            // MAIN GAME
            case Constants.MAINGAME.MAINGAME:
                this.toResume = Constants.MAINGAME.MAINGAME;
                let toStart;
                //PAUSE
                if(this.state === Constants.STATES.PAUSE) {
                    this.createResumeButton();
                    this.createMainGameExitButton();
                    this.createStats();
                    this.createMinigameList();
                }
                // START OF GAME
                else if(this.state === Constants.STATES.WELCOME){
                    this.showShips();
                    this.createChooseShipText();
                    this.createWelcomePlayButton();
                }else{
                    let gameName = '';
                    let gameID = '';
                    switch(this.state){
                        case Constants.STATES.BPPOSITION:
                            gameName = "DEQ";
                            gameID = "BubblePopperMiniGame";
                            toStart = Constants.GAMES.BUBBLEPOPPER;
                            break;
                        case Constants.STATES.FFPOSITION:
                            gameName = "FoodFight";
                            gameID = "FoodFightMiniGame";
                            toStart = Constants.GAMES.FOODFIGHT;
                            break;
                        case Constants.STATES.MECPOSITION:
                            gameName = "DEM";
                            gameID = "MechanicMiniGame";
                            toStart = Constants.GAMES.MECHANIC;
                            break;
                    }
                    this.createPlayMiniGameText(gameName, gameID);
                    this.createYesButton(toStart);
                    this.createNoButton(this.toResume);

                }
                break;

            // FOOD FIGHT
            case Constants.GAMES.FOODFIGHT:
                this.toResume = Constants.GAMES.FOODFIGHT;
                if(this.state === Constants.STATES.PAUSE) {
                    this.createPausedText();
                    this.createScoreText();
                    this.createResumeButton();
                    this.createExitButton();
                }else if(this.state === Constants.STATES.NEXTLEVEL){
                    this.createLevelPassedText();
                    this.createNextButton();
                    this.createExitButton();
                }else if(this.state === Constants.STATES.GAMEOVER) {
                    this.createGameOverText();
                    this.createRetryButton();
                    this.createExitButton();
                }
                break;
            //MECHANIC
            case Constants.GAMES.MECHANIC:
                this.toResume = Constants.GAMES.MECHANIC;
                if(this.state === Constants.STATES.PAUSE){
                    this.createPausedText();
                    this.createResumeButton();
                    this.createExitButton();
                    this.createPausedText();
                }else if(this.state === Constants.STATES.NEXTLEVEL){
                    this.createLevelPassedText();
                    this.createNextButton();
                    this.createExitButton();

                }else if(this.state === Constants.STATES.GAMEOVER){
                    this.createGameOverText();
                    this.createRetryButton();
                    this.createExitButton();

                }
                break;
            //BUBBLE POPPER
            case Constants.GAMES.BUBBLEPOPPER:
                this.toResume = Constants.GAMES.BUBBLEPOPPER;
                if(this.state === Constants.STATES.NEXTLEVEL) {
                    this.createLevelPassedText();
                    this.createNextButton();
                    this.createExitButton();
                }else if(this.state === Constants.STATES.PAUSE){
                    this.createPausedText();
                    this.createScoreText();
                    this.createResumeButton();
                    this.createExitButton();
                }else if(this.state === Constants.STATES.GAMEOVER){
                    this.createGameOverText();
                    this.createRetryButton();
                    this.createExitButton();

                }
                break;
        }
    }

    createPlayMiniGameText(name, id){
        let level = localStorage.getItem(id) || 1;

        this.retryButton = this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2-100, 'Do you want to\nstart the '+ name+ '\nminigame?\n\n\n' +
            "Your level: " + level, {
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "28px"
        });
    }

    createPausedText(){
        this.add.text(123, this.canvasHeight / 2 - 125, 'Game\nPaused', {
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "96px",
            align: 'center'
        })
    }

    createYesButton(toStart){
        this.yesButton = this.add.text(475, this.canvasHeight / 2 + 175, "Yes", {
            fontFamily: 'arc',
            color: "#00ff00",
            fontSize: "28px"
        });
        this.yesButton.setInteractive();
        this.yesButton.on('pointerover', () => {
            this.yesButton.setScale(1.1);
            this.yesButton.setText("[Yes]");
        });
        this.yesButton.on('pointerout', () => {
            this.yesButton.setScale(1.0);
            this.yesButton.setText("Yes");
        });
        this.yesButton.on('pointerdown', () => {
            this.close();
            this.stopMainGameMusic();
            this.scene.start(toStart, {music: this.music, volume: this.volume})
        });
    }

    createNoButton(toResume){
        this.noButton = this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2 + 175, "No", {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "28px"
        });
        this.noButton.setInteractive();
        this.noButton.on('pointerover', () => {
            this.noButton.setScale(1.1);
            this.noButton.setText("[No]");
        });
        this.noButton.on('pointerout', () => {
            this.noButton.setScale(1.0);
            this.noButton.setText("No");
        });
        this.noButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume(Constants.MAINGAME.MAINGAME, {music: this.music, volume: this.volume});

        });
    }

    createMinigameList(){
        let XStart = 200;
        let XOffset = 200;
        let YStart = 375;

        this.FFButton = this.add.image(XStart+2*XOffset,YStart,'miniGameButton');
        this.FFButton.tint = 1;
        this.FFButton.setInteractive();
        this.FFButton.on('pointerover', () => this.buttonHoverState(this.FFButton));
        this.FFButton.on('pointerout', () => this.buttonRestState(this.FFButton));
        this.FFButtonText = this.add.text(XStart+2*XOffset-37, YStart-20, 'Food\nFight', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "16px",
            align: 'center',
            lineSpacing: 0.5,
        });
        this.FFButton.on("pointerdown", () => {
            this.close();
            this.stopMainGameMusic();
            this.scene.start(Constants.GAMES.FOODFIGHT,{music: this.music, volume: this.volume});
        });

        this.BPButton = this.add.image(XStart,YStart,'miniGameButton');
        this.BPButton.setInteractive();
        this.BPButton.tint = 1;
        this.BPButton.on("pointerdown", () => {
            this.close();
            this.stopMainGameMusic();
            this.scene.start(Constants.GAMES.BUBBLEPOPPER,{music: this.music, volume: this.volume});
        });
        this.BPButton.on('pointerover', () => this.buttonHoverState(this.BPButton));
        this.BPButton.on('pointerout', () => this.buttonRestState(this.BPButton));
        this.BPButtonText = this.add.text(XStart-25, YStart-10,'DEQ', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "16px"
        });

        this.MECButton = this.add.image(XStart+XOffset,YStart,'miniGameButton');
        this.MECButton.setInteractive();
        this.MECButton.on("pointerdown", () => {
            this.close();
            this.stopMainGameMusic();
            this.scene.start(Constants.GAMES.MECHANIC,{music: this.music, volume: this.volume});
        });
        this.MECButton.on('pointerover', () => this.buttonHoverState(this.MECButton));
        this.MECButton.on('pointerout', () => this.buttonRestState(this.MECButton));

        this.MECButtonText = this.add.text(XStart+XOffset-25, YStart-10, 'DEM',{
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "16px"
        });
    }

    createChooseShipText(){
        this.add.text(125, this.canvasHeight / 2 - 100, 'Choose your ship: ', {
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "32px"
        });
    }

    createMainGameExitButton(){
        this.exitButton = this.add.text(125, this.canvasHeight / 2 + 150, 'Exit\nGame', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "32px"
        });
        this.exitButton.setInteractive();
        this.exitButton.on("pointerdown", () => {
            this.close();
            this.stopMainGameMusic();
            for(var i = 0; i < this.scene.manager.scenes.length; i++){
                this.scene.stop(this.scene.manager.scenes[i]);
            }
            this.scene.start(Constants.MAINMENU.MAINMENU,{music: this.music, volume: this.volume});
        });
        this.exitButton.on('pointerover', () => {
            this.exitButton.setScale(1.1);
            this.exitButton.setText("[Exit\nGame]");
        });
        this.exitButton.on('pointerout', () => {
            this.exitButton.setScale(1.0);
            this.exitButton.setText("Exit\nGame");
        });
    }

    createExitButton(){
        this.exitButton = this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2 + 175, 'Exit', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "28px"
        });
        this.exitButton.setInteractive();
        this.exitButton.on("pointerdown", () => {
            localStorage.setItem(this.toResume, JSON.stringify(this.level));
            this.close();
            this.stopGamesMusic();
            this.stopMainGameMusic();
            this.scene.start(Constants.MAINGAME.MAINGAME, {
                level: this.level,
                volume: this.volume,
                music: this.music
            });
        });
        this.exitButton.on('pointerover', () => this.exitHoverState(this.exitButton));
        this.exitButton.on('pointerout', () => this.exitRestState(this.exitButton));
    }

    createRetryButton(){
        this.retryButton = this.add.text(475, this.canvasHeight / 2 + 173, 'Retry', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "28px"
        });
        this.retryButton.setInteractive();
        this.retryButton.on('pointerdown', () => {
            this.close();
            this.scene.start(this.toResume,{level: this.level, music: this.music, volume: this.volume});
        });
        this.retryButton.on("pointerover", ()=> {
            this.retryButton.setScale(1.1);
            this.retryButton.setText("[Retry]");
            });
        this.retryButton.on('pointerout', () => {
            this.retryButton.setScale(1.0);
            this.retryButton.setText("Retry");
        });

    }

    createPlayButton(){
        this.playButton = this.add.image(500, 475, 'play');
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.launch(this.toResume,{level: this.level, music: this.music, volume: this.volume, ship: this.ship});

        });
        this.playButton.on("pointerover", ()=> { this.buttonHoverState(this.playButton)});
        this.playButton.on('pointerout', () => this.buttonRestState(this.playButton));
    }

    createWelcomePlayButton(){
        this.playButton = this.add.image(500, 475, 'play');
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.launch(this.toResume,{level: this.level, music: this.music, volume: this.volume, ship: this.ship});
            this.resetShipArray(null);
        });
        this.playButton.on("pointerover", ()=> { this.buttonHoverState(this.playButton)});
        this.playButton.on('pointerout', () => this.buttonRestState(this.playButton));

    }

    createGameOverText(){
        this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2 - 100, 'GAME OVER!', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "32px"
        });
        this.add.text(this.canvasWidth / 2 - 200, this.canvasHeight / 2 , ':(', {
            fontFamily: 'arc',
            color: "#ff0000",
            fontSize: "128px"
        });
    }

    createStats(){
        let YStart = this.canvasHeight / 2 - 100;
        this.add.text(this.canvasWidth / 2 - 280,YStart ,
            'Chemical Engineering Level:\t\t\t' + this.BPLvl + "\n\n"+
            'Mechanical Engineering Level:\t' + this.MECLvl + "\n\n"+
            'Food Fight Level:\t\t\t\t\t\t\t\t\t\t\t\t\t' + this.FFLvl+"\n\n",
            {
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "16px"
        });
    }

    createScoreText(){
        this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2 + 100, 'Score: ' + this.scoreAmount, {
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "32px"
        });
    }

    createLevelPassedText(){
        this.add.text(this.canvasWidth / 2 - 260, this.canvasHeight / 2 - 60, 'Level ' + this.showLevel +" passed!", {
            fontFamily: 'arc',
            color: "#00ff00",
            fontSize: "32px"
        });

    }

    createResumeButton(){
        this.resumeButton = this.add.text(400, this.canvasHeight / 2 + 175, 'Continue', {
            fontFamily: 'arc',
            color: "#00ff00",
            fontSize: "28px"
        });
        this.resumeButton.setInteractive();
        this.resumeButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume(this.toResume);

        });
        this.resumeButton.on('pointerover', () => this.continueHoverState(this.resumeButton));
        this.resumeButton.on('pointerout', () => this.continueRestState(this.resumeButton));
    }

    createNextButton(){
        this.nextButton = this.add.text(475, 475, 'Next', {
            fontFamily: 'arc',
            color: "#00ff00",
            fontSize: "28px"
        });
        this.nextButton.setInteractive();
        this.nextButton.on('pointerdown', () => {
            this.close();
            this.scene.start(this.toResume, {level: this.level});

        });
        this.nextButton.on('pointerover', () => {
            this.nextButton.setScale(1.1);
            this.nextButton.setText("[Next]");
        });
        this.nextButton.on('pointerout', () => {
            this.nextButton.setScale(1.0);
            this.nextButton.setText("Next");
        });
    }

    createArrowButton(page){
        if(page === 1) {
            this.nextArrow = this.add.image(645, 500, 'nextPage');
            this.nextArrow.setInteractive();
            this.nextArrow.on('pointerdown', () => {
                this.scene.stop();
                this.page++;
                this.scene.start(Constants.POPUP.POPUP, {page: this.page, key: Constants.MENUS.HELPMENU, music: this.music, volume:this.volume});

            });
            this.nextArrow.on('pointerover', () => this.buttonHoverState(this.nextArrow));
            this.nextArrow.on('pointerout', () => this.buttonRestState(this.nextArrow));
        }else{
            this.nextArrow = this.add.image(645, 500, 'nextPage');
            this.nextArrow.setInteractive();
            this.nextArrow.angle = 180;
            this.nextArrow.on('pointerdown', () => {
                this.scene.stop();
                this.page--;
                this.scene.start(Constants.POPUP.POPUP, {page: this.page, key: Constants.MENUS.HELPMENU, music: this.music, volume:this.volume});

            });
            this.nextArrow.on('pointerover', () => this.buttonHoverState(this.nextArrow));
            this.nextArrow.on('pointerout', () => this.buttonRestState(this.nextArrow));

        }
    }

    createHelpText(page){
        if(page === 1){
            this.add.text(this.canvasWidth / 2 - 280, this.canvasHeight / 2 - 100, 'Fly around Polo 2 and find buildings. \nSome of them' +
                ' have a colored entrance. \nThere are 3 of them in total,\neach representing a different game.\nSee how far you can go. \n\n' +
                'As long as you press "Load Game" you will\ncome back to your saved game.\nPressing "New Game" will restart your\nprogress!\n'+
                'You have been warned!\n\n\n'+
                '\nGood luck!\n\n\nPS: The arrow at the bottom right shows you\nthe game controls ;)', {
                fontFamily: 'arc',
                color: "#000000",
                fontSize: "12px"
            });

        }else{
            this.add.image(this.canvasWidth/2, this.canvasHeight/2+20, 'controls');
        }
    }

    showShips(){

        let shipY = 320;
        let shipYOffset = 70;
        let shipXStart = 170;
        let shipXOffset = 120;

        this.shipArr = [false, false, false, false, false, false];
        this.ships = [this.add.image(shipXStart, shipY, 'ship1'),
            this.add.image(shipXStart+shipXOffset, shipY, 'ship2'),
            this.add.image(shipXStart+2*shipXOffset, shipY, 'ship3'),
            this.add.image(shipXStart+3*shipXOffset, shipY, 'ship4'),
            this.add.image(shipXStart+4*shipXOffset, shipY, 'ship5'),
            this.add.image(shipXStart+8, shipY+shipYOffset, 'ship6')
        ];


        this.ships[0].alpha = 0.5;
        this.ships[0].setInteractive();
        this.ships[0].setScale(0.8);
        this.ships[0].on('pointerdown', () => {
            this.ship = 1;

            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[0].alpha = 1;
            this.shipArr[0] = true;
            this.resetShipArray(1);
            this.resetShips();
        });
        this.ships[0].on('pointerover', () => this.shipHoverState(this.ships[0]));
        this.ships[0].on('pointerout', () => this.shipRestState(this.ships[0], this.shipArr[0]));


        this.ships[1].setInteractive();
        this.ships[1].alpha = 0.5;
        this.ships[1].setScale(0.8);
        this.ships[1].on('pointerdown', () => {
            this.ship = 2;
            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[1].alpha = 1;
            this.shipArr[1] = true;
            this.resetShipArray(2);
            this.resetShips();
        });
        this.ships[1].on('pointerover', () => this.shipHoverState(this.ships[1]));
        this.ships[1].on('pointerout', () => this.shipRestState(this.ships[1], this.shipArr[1]));

        this.ships[2].setInteractive();
        this.ships[2].alpha = 0.5;
        this.ships[2].setScale(0.8);
        this.ships[2].on('pointerdown', () => {
            this.ship = 3;
            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[2].alpha = 1;
            this.shipArr[2] = true;
            this.resetShipArray(3);
            this.resetShips();
        });
        this.ships[2].on('pointerover', () => this.shipHoverState(this.ships[2]));
        this.ships[2].on('pointerout', () => this.shipRestState(this.ships[2], this.shipArr[2]));

        this.ships[3].setInteractive();
        this.ships[3].alpha = 0.5;
        this.ships[3].setScale(0.8);
        this.ships[3].on('pointerdown', () => {
            this.ship = 4;
            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[3].alpha = 1;
            this.shipArr[3] = true;
            this.resetShipArray(4);
            this.resetShips();
        });
        this.ships[3].on('pointerover', () => this.shipHoverState(this.ships[3]));
        this.ships[3].on('pointerout', () => this.shipRestState(this.ships[3], this.shipArr[3]));

        this.ships[4].setInteractive();
        this.ships[4].alpha = 0.5;
        this.ships[4].setScale(0.8);
        this.ships[4].on('pointerdown', () => {
            this.ship = 5;
            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[4].alpha = 1;
            this.shipArr[4] = true;
            this.resetShipArray(5);
            this.resetShips();
        });
        this.ships[4].on('pointerover', () => this.shipHoverState(this.ships[4]));
        this.ships[4].on('pointerout', () => this.shipRestState(this.ships[4], this.shipArr[4]));

        this.ships[5].setInteractive();
        this.ships[5].alpha = 0.5;
        this.ships[5].setScale(0.8);
        this.ships[5].on('pointerdown', () => {
            this.ship = 6;
            this.scene.get(Constants.MAINGAME.MAINGAME).setShip(this.ship);
            // Redundancy for security
            localStorage.setItem('ship', JSON.stringify(this.ship));
            this.ships[5].alpha = 1;
            this.shipArr[5] = true;
            this.resetShipArray(6);
            this.resetShips();
        });
        this.ships[5].on('pointerover', () => this.shipHoverState(this.ships[5]));
        this.ships[5].on('pointerout', () => this.shipRestState(this.ships[5], this.shipArr[5]));
    }

    resetShips(){
        for(var i = 0; i < this.shipArr.length; i++){
            if(this.shipArr[i] === false){
                this.ships[i].alpha = 0.5;
            }
        }
    }

    exitHoverState(text) {
        text.scaleX = 1.0;
        text.scaleY= 1.05;
        text.setText("[Exit]");
    }

    exitRestState(text) {
        text.scaleX = 1;
        text.scaleY= 1;
        text.setText("Exit");

    }

    buttonHoverState(button) {
        button.scaleX = 1.1;
        button.scaleY= 1.1;
    }

    buttonRestState(button) {
        button.scaleX = 1;
        button.scaleY= 1;
    }

    continueHoverState(text){
        text.scaleX = 1.0;
        text.scaleY= 1.05;
        text.setText("[Continue]");
    }

    continueRestState(text) {
        text.scaleX = 1;
        text.scaleY= 1;
        text.setText("Continue");

    }

    shipHoverState(ship) {
        ship.alpha = 1;
    }

    shipRestState(ship, chosen) {
        if(!chosen){
            ship.alpha = 0.5;
        }
    }

    resetShipArray(chosen){
        if(chosen !== null) {
            for (let i = 0; i < this.shipArr.length; i++) {
                if ((i + 1) !== chosen) {
                    this.shipArr[i] = false;
                } else {
                    this.shipArr[i] = true;
                }
            }
        }else {
            for (let i = 0; i < this.shipArr.length; i++) {
                this.shipArr[i] = false;
            }
        }
    }

    stopMainGameMusic(){
        if(this.scene.get(Constants.MUSIC.MAINGAMEMUSIC).isPlayingMusic()) {
            this.scene.get(Constants.MUSIC.MAINGAMEMUSIC).pauseMusic();
        }
        this.scene.stop(Constants.MUSIC.MAINGAMEMUSIC);
    }

    stopGamesMusic(){
        if(this.scene.get(Constants.MUSIC.GAMESMUSIC).isPlayingMusic()) {
            this.scene.get(Constants.MUSIC.GAMESMUSIC).pauseMusic();
        }
        this.scene.stop(Constants.MUSIC.GAMESMUSIC);
    }

    close(){
        this.scene.stop();
        this.scene.stop(this.toResume);
    }
}
