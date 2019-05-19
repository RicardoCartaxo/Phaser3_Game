//Setting configuration for the game
var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    backgroundColor: '#efefef',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 0},
        },
        matter: {
            gravity: { y: 1 },
            enableSleep: false
        }

    },
    pack: {
        files: [
            {
                type: 'spritesheet',
                key: 'cat',
                url: 'assets/cat_ani/cat_fighter_sprite2.png',
                frameConfig: { frameWidth: 500, frameHeight: 500 }
            }
        ]
    },
    scene: [
        MainMenu, MenuMusic, MainGameMusic, GamesMusic,PlayMenu, HelpMenu, OptionsMenu, CreditsMenu,
        MainGame, Popup,
        BubblePopperMiniGame,
        FoodFightMiniGame,
        MechanicMiniGame, Bye]
};

//Init our game using the above stated configuration
this.game = new Phaser.Game(config);

