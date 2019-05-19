class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:Constants.MAINMENU.MAINMENU});
    }

    init(data){
        // CONTROL WHETER DATA MUSIC IS NULL, IF SO MUSIC = TRUE, ELSE MUSIC = DATA.MUSIC
        this.music = data.music  || true;
        this.volume = true;
    }

    setVolumeAndSound(volume, music){
        this.volume = volume;
        this.music = music;
    }

    setVolume(volume){
        this.volume = volume;
    }
    setMusic(music){
        this.music = music;
    }

    getVolume(){
        return this.volume;
    }

    getMusic(){
        return this.music;
    }

    //Loading files
    preload ()
    {
        this.load.image('menu', './assets/MenuAssets/mmbg.png');
        this.load.image('play', './assets/MenuAssets/Play Button.png');
        this.load.image('help', './assets/MenuAssets/Help Button.png');
        this.load.image('exit', './assets/MenuAssets/Exit Button.png');
        this.load.image('options', './assets/MenuAssets/Options Button.png');
        this.load.image('credits', './assets/MenuAssets/Credits Button.png');

    }


    create ()
    {
        if(!this.scene.isActive(Constants.MUSIC.MENUMUSIC)) {
            this.scene.launch(Constants.MUSIC.MENUMUSIC, {music: this.music});
        }
        this.bg = this.add.image(400,300, 'menu');

        //PLAY BUTTON//
        this.playButton = this.add.image(150, 200,'play');
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.scene.stop(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! if theres problems maybe this
            this.scene.launch(Constants.MENUS.PLAYMENU, {music: this.music, volume: this.volume});
        });
        this.playButton.on('pointerover', () => this.buttonHoverState(this.playButton) );
        this.playButton.on('pointerout', () => this.buttonRestState(this.playButton) );


        //HELP BUTTON//
        this.helpButton = this.add.image(150, 280,'help');
        this.helpButton.setInteractive();
        this.helpButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.launch(Constants.MENUS.HELPMENU, {volume: this.volume, music: this.music});
        });
        this.helpButton.on('pointerover', () => this.buttonHoverState(this.helpButton) );
        this.helpButton.on('pointerout', () => this.buttonRestState(this.helpButton) );


        //CREDITS BUTTON//
        this.creditsButton = this.add.image(150, 360,'credits');
        this.creditsButton.setInteractive();
        this.creditsButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.launch(Constants.MENUS.CREDITSMENU, {volume: this.volume, music: this.music});
        });
        this.creditsButton.on('pointerover', () => this.buttonHoverState(this.creditsButton) );
        this.creditsButton.on('pointerout', () => this.buttonRestState(this.creditsButton) );


        //EXIT BUTTON//
        this.exitButton = this.add.image(150, 440,'exit');
        this.exitButton.setInteractive();
        this.exitButton.on('pointerdown', () => {
            //Exit Game
            this.scene.launch(Constants.EXIT.BYE);
            this.scene.get(Constants.MUSIC.MENUMUSIC).destroyMusic();
            this.scene.stop();

        });
        this.exitButton.on('pointerover', () => this.buttonHoverState(this.exitButton) );
        this.exitButton.on('pointerout', () => this.buttonRestState(this.exitButton) );

        //OPTIONS BUTTON
        this.optionsButton = this.add.image(675, 560,'options');
        this.optionsButton.setInteractive();
        this.optionsButton.on('pointerdown', () => {
            this.scene.launch(Constants.MENUS.OPTIONSMENU,{music: this.music, volume: this.volume});
        });
        this.optionsButton.on('pointerover', () => this.buttonHoverState(this.optionsButton) );
        this.optionsButton.on('pointerout', () => this.buttonRestState(this.optionsButton) );

        // GAME TITLE
        this.title = this.add.text(50, 20, 'POLO 2:\nA Mini Game',{
            fontFamily: 'arc',
            color: "#000000",
            fontSize: "64px",
            align: 'left',
            shadow: {
                offsetX: 5,
                color: '#a61eff',
                blur: 0,
                stroke: true,
                fill: true
            }
        });

    }

    buttonHoverState(button) {
        button.scaleX = 1.1;
        button.scaleY= 1.1;
    }
    buttonRestState(button) {
        button.scaleX = 1;
        button.scaleY= 1;
    }



    // Main Loop
    update (delta)
    {
    }







}