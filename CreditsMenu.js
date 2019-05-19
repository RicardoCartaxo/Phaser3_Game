class CreditsMenu extends Phaser.Scene{

    constructor(){
        super({key:Constants.MENUS.CREDITSMENU});
    }

    init(){
        this.xOffset = 125;
        this.yOffset = 40;
    }

    //Loading files
    preload ()
    {
        this.load.image('menu', './assets/MenuAssets/mmbg.png');
        this.load.image('back', './assets/MenuAssets/Back Button.png');
        this.load.image('crCanvas', './assets/MenuAssets/creditsCanvas.png');
        this.load.image('icon', './assets/MenuAssets/creditsIcon.png')

    }

    create ()
    {
        this.bg = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2, 'menu');
        this.crCanvas = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'crCanvas');

        this.add.text(110, 150, 'This game was developped in an academic \ncontext.\n\n' +
            'In the year 2019, three students got together \nto form a small game development\n' +
            'team for the course "Multimedia" from the LEI \nbachelor.\n' +
            '\n' +
            'This game is property of it\'s creators and \nthe Faculty of Sciences and Technology -\n' +
            'University of Coimbra.\n' +
            '\n\n\n\n' +
            'Developpers:\n' +
            '\n\n' +
            '*Yussuaif Abdulgafar Mussagy Bay\n' +
            '*Diogo Jorge da Rocha Mota\n' +
            '*Joao Ricardo Martins Cartaxo'
            , {
            fontFamily: 'arc',
            color: '#000000',
            fontSize: '8px'
        });

        this.add.image(100,100,'icon');

        this.backButton = this.add.image(this.sys.game.canvas.width-this.xOffset, this.sys.game.canvas.height-this.yOffset, 'back');
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start(Constants.MAINMENU.MAINMENU);
        });
        this.backButton.on('pointerover', () => this.buttonHoverState(this.backButton) );
        this.backButton.on('pointerout', () => this.buttonRestState(this.backButton) );

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