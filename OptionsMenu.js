class OptionsMenu extends Phaser.Scene{

    constructor(){
        super({key:Constants.MENUS.OPTIONSMENU});
    }

    init(data){
        this.xOffset = 125;
        this.yOffset = 40;
    }

    preload ()
    {
        this.load.image('menu', './assets/MenuAssets/mmbg.png');
        this.load.image('back', './assets/MenuAssets/Back Button.png');
        this.load.image('sound', './assets/MenuAssets/Sound Button.png');
        this.load.image('music', './assets/MenuAssets/Music Button.png');

    }

    create ()
    {
        this.volume = this.scene.get(Constants.MAINMENU.MAINMENU).getVolume();
        this.music = this.scene.get(Constants.MAINMENU.MAINMENU).getMusic();

        this.bg = this.add.image(400,300, 'menu');

        this.backButton = this.add.image(this.sys.game.canvas.width-this.xOffset, this.sys.game.canvas.height-this.yOffset, 'back');
        this.backButton.setInteractive();
        this.backButton.on('pointerover', () => this.buttonHoverState(this.backButton) );
        this.backButton.on('pointerout', () => this.buttonRestState(this.backButton) );
        this.backButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume(Constants.MAINMENU.MAINMENU);
        });

        this.volumeButton = this.add.image(this.xOffset, 2*this.yOffset, 'sound');
        this.volumeButton.setInteractive();
        this.volumeButton.on('pointerover', () => this.buttonHoverState(this.volumeButton) );
        this.volumeButton.on('pointerout', () => this.buttonRestState(this.volumeButton) );
        this.volumeButton.on('pointerdown', () => {
            let _v = !this.scene.get(Constants.MAINMENU.MAINMENU).getVolume();
            this.scene.get(Constants.MAINMENU.MAINMENU).setVolume(_v);
        });

        this.musicButton = this.add.image(this.xOffset, 4*this.yOffset, 'music');
        this.musicButton.setInteractive();
        this.musicButton.on('pointerover', () => this.buttonHoverState(this.musicButton) );
        this.musicButton.on('pointerout', () => this.buttonRestState(this.musicButton) );
        this.musicButton.on('pointerdown', () => {
            let _m = !this.scene.get(Constants.MAINMENU.MAINMENU).getMusic();
            this.music = _m;
            this.scene.get(Constants.MAINMENU.MAINMENU).setMusic(_m);
            if(_m === false){
                this.scene.get(Constants.MUSIC.MENUMUSIC).pauseMusic();
            }else{
                this.scene.get(Constants.MUSIC.MENUMUSIC).resumeMusic();
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

}