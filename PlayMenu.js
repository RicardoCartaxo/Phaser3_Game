class PlayMenu extends Phaser.Scene{

    constructor(){
        super({key:Constants.MENUS.PLAYMENU});
    }

    init(data){
        this.music = data.music;
        this.volume = data.volume;
        this.xOffset = 125;
        this.yOffset = 40;
    }

    preload ()
    {
        this.load.image('menu', './assets/MenuAssets/mmbg.png');
        this.load.image('load', './assets/PlayMenuAssets/Load Game Button.png');
        this.load.image('new', './assets/PlayMenuAssets/New Game Button.png');
        this.load.image('back', './assets/MenuAssets/Back Button.png')
    }

    create ()
    {
        this.bg = this.add.image(400,300, 'menu');

        // New Game, hence we clear the storage
        this.newButton = this.add.image(150, 280,'new');
        this.newButton.setInteractive();
        this.newButton.on('pointerdown', () => {
            localStorage.clear();
            this.scene.get(Constants.MUSIC.MENUMUSIC).pauseMusic(true);
            this.scene.stop(Constants.MUSIC.MENUMUSIC);
            this.scene.stop(Constants.MAINMENU.MAINMENU);
            this.scene.start(Constants.POPUP.POPUP, {key: Constants.MAINGAME.MAINGAME, state: Constants.STATES.WELCOME, music: this.music, volume: this.volume});
            this.scene.stop();
        });
        this.newButton.on('pointerover', () => this.buttonHoverState(this.newButton) );
        this.newButton.on('pointerout', () => this.buttonRestState(this.newButton) );

        // Loading Game
        this.loadButton = this.add.image(150, 360,'load');
        this.loadButton.setInteractive();
        this.loadButton.on('pointerdown', () => {
            //Starting Saved Game
            if(localStorage.length !== 0) {
                this.scene.get(Constants.MUSIC.MENUMUSIC).pauseMusic(true);
                this.scene.stop(Constants.MUSIC.MENUMUSIC);
                this.scene.stop(Constants.MAINMENU.MAINMENU);
                this.scene.start(Constants.MAINGAME.MAINGAME, {music: this.music, volume: this.volume});
                this.scene.stop();
            }else{
                this.scene.get(Constants.MUSIC.MENUMUSIC).pauseMusic(true);
                this.scene.stop(Constants.MUSIC.MENUMUSIC);
                this.scene.stop(Constants.MAINMENU.MAINMENU);
                this.scene.start(Constants.POPUP.POPUP, {key: Constants.MAINGAME.MAINGAME, music: this.music, volume: this.volume ,state: Constants.STATES.WELCOME});
                this.scene.stop();
            }
        });
        this.loadButton.on('pointerover', () => this.buttonHoverState(this.loadButton) );
        this.loadButton.on('pointerout', () => this.buttonRestState(this.loadButton) );

        // Back
        this.backButton = this.add.image(this.sys.game.canvas.width-this.xOffset, this.sys.game.canvas.height-this.yOffset, 'back');
        this.backButton.setInteractive();
        this.backButton.on('pointerover', () => this.buttonHoverState(this.backButton) );
        this.backButton.on('pointerout', () => this.buttonRestState(this.backButton) );
        this.backButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start(Constants.MAINMENU.MAINMENU, {music: this.music, volume: this.volume});
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
}