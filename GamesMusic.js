class GamesMusic extends Phaser.Scene{

    constructor(){
        super({key:Constants.MUSIC.GAMESMUSIC});
    }

    init(data){
        this.music = data.music;
        this.isPlaying = false;
        this.caller = data.key;
        console.log("GamesMusic init()");
    }

    preload ()
    {   this.load.audio('FFmusic', ['./assets/FoodFightAssets/music/song.ogg', './assets/FoodFightAssets/music/song.ogg']);
        this.load.audio('BPmusic', ['./assets/BubblePopperAssets/music/song.ogg', './assets/BubblePopperAssets/music/song.ogg']);
        this.load.audio('MECmusic', ['./assets/MechanicAssets/music/song.ogg', './assets/MechanicAssets/music/song.ogg']);
    }

    create ()
    {   console.log("GameMusic caller: " + this.caller);
        switch(this.caller){
            case Constants.GAMES.FOODFIGHT:
                this.song = this.sound.add('FFmusic', { loop: true ,volume: 0.1});
                break;
            case Constants.GAMES.BUBBLEPOPPER:
                this.song = this.sound.add('BPmusic', { loop: true ,volume: 0.1});
                break;
            case Constants.GAMES.MECHANIC:
                this.song = this.sound.add('MECmusic', { loop: true ,volume: 0.1});
                break;

        }
        this.song.pauseOnBlur = false;
        if(this.music){
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