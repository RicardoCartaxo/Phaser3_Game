class MainGameMusic extends Phaser.Scene{



    constructor(){
        super({key:Constants.MUSIC.MAINGAMEMUSIC});
    }

    init(data){
        this.music = data.music;
        this.volume = data.volume;
        this.isPlaying = false;
    }


    //Loading files
    preload ()
    {
        this.load.audio('gravity', [
            './assets/MainGameAssets/music/song.mp3',
            './assets/MainGameAssets/music/song.mp3'
        ]);

    }


    create ()
    {
        this.song = this.sound.add('gravity', { loop: true, volume: 0.1 });
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