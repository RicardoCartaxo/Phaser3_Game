class MenuMusic extends Phaser.Scene{



    constructor(){
        super({key:Constants.MUSIC.MENUMUSIC});
    }

    init(data){
        this.music = data.music;
        this.isPlaying = false;
    }

    preload ()
    {
        this.load.audio('bgMusic', [
            './assets/MenuAssets/music/bgMusic.mp3',
            './assets/FoodFightAssets/music/bgMusic.mp3'
        ]);

    }


    create ()
    {
        this.song = this.sound.add('bgMusic', { loop: true, volume: 0.1 });
        this.song.pauseOnBlur = false;
        if(this.music) {
            this.playSong();
        }

    }

    pauseMusic(){
            this.song.pause();
            this.isPlaying = false;

    }

    destroyMusic(){
        this.song.destroy();
        this.isPlaying = false;
    }

    playSong(){
        this.song.play();
        this.isPlaying = true;
    }

    resumeMusic(){
        this.song.resume();
        this.isPlaying = true;
    }

    isPlayingMusic(){
        return this.isPlaying;
    }
}