class HelpMenu extends Phaser.Scene{

    constructor(){
        super({key:Constants.MENUS.HELPMENU});
    }

    init(data){
        this.music = data.music;
        this.volume = data.music;
        this.xOffset = 125;
        this.yOffset = 40;
    }

    //Usado para load of ficheiros imagem, video, music, etc
    preload ()
    {
        this.load.image('menu', './assets/MenuAssets/mmbg.png');
        this.load.image('help', './assets/MenuAssets/Help Button.png');
        this.load.image('back', './assets/MenuAssets/Back Button.png');


    }

    create ()
    {
        this.bg = this.add.image(400,300, 'menu');

        this.helpButton = this.add.image(this.xOffset, this.yOffset,'help');

        this.backButton = this.add.image(this.sys.game.canvas.width-this.xOffset, this.sys.game.canvas.height-this.yOffset, 'back');
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.stop(Constants.POPUP.POPUP);
            this.scene.start(Constants.MAINMENU.MAINMENU);
        });
        this.backButton.on('pointerover', () => this.buttonHoverState(this.backButton) );
        this.backButton.on('pointerout', () => this.buttonRestState(this.backButton) );

        this.scene.launch(Constants.POPUP.POPUP, {page: 1, key: Constants.MENUS.HELPMENU, music: this.music, volume: this.volume});

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