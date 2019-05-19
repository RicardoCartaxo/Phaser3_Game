class Bye extends Phaser.Scene{

    constructor(){
        super({key:Constants.EXIT.BYE});
    }


    preload ()
    {
            this.load.image('bye', './assets/MenuAssets/bye.png');

    }

    create ()
    {
        this.add.image(400, 300, 'bye');
        if(this.scene.get(Constants.MUSIC.MENUMUSIC).isPlayingMusic()){
            this.scene.get(Constants.MUSIC.MENUMUSIC).destroy();
        }
    }

    update(){
        if(this.scene.get(Constants.MUSIC.MENUMUSIC).isPlayingMusic()){
            this.scene.get(Constants.MUSIC.MENUMUSIC).destroy();
        }
    }








}