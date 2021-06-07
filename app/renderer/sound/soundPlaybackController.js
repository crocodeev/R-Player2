

//с помощью 

class PlaybackController {

    constructor(sound, timeToLeftThreshold){
        if(!!PlaybackController.instance){
            return PlaybackController.instance
        }

        PlaybackController.instance = this;

        this.sound = sound;
        this.timeToLeftThreshold = timeToLeftThreshold ? timeToLeftThreshold : 10;

        return this;
    }

    // task that didn't interrup playlist immediately
    longWaitJob(playlist){


        return task 
    }

    _currentTrackPlaybackTimeLeft(playlist){


    }

    insertIntoPlaylist(playlist){

        if(this._isPlaylistEmpty()){
            console.log("Playlist is Empty so replace");
            this.replacePlaylist(playlist);
            return;
        }

        if(this.sound.isPlaying){
            this.sound.unloadSlot(this.sound.index + 1);
            this.sound.once('change', async () => {
                console.log("UPDATE SCHEDULE");
                const data = this.sound.playlist[this.sound.index + 1];
                data.howl = await this.sound._createHowl(data);
            });
            this.sound.setNewPlaylist(playlist, "INSERT", this.sound.index + 1);
        }else{
            this.sound.setNewPlaylist(playlist, "INSERT", 0);
            this.sound.play();
        }
    }



    replacePlaylist(playlist){

        if(this.sound.isPlaying){
            //unload next slot
            this.sound.unloadSlot(this.sound.index + 1);
            this.sound.once('change', async () => {
                console.log("UPDATE SCHEDULE");
                const data = this.sound.playlist[this.sound.index + 1];
                data.howl = await this.sound._createHowl(data);
            });
            this.sound.setNewPlaylist(playlist, "REPLACE", this.sound.index + 1);
        }else{
            this.sound.setNewPlaylist(playlist, "REPLACE", 0);
            this.sound.play();
        }
    }

    stopAndClear(){
        this.sound.stop();
        const playlist = [{name:"Artist - Title"}];
        this.sound.setNewPlaylist(playlist, "REPLACE", 0);
        this.sound.index = 0;
    }

    _isPlaylistEmpty(){
        return this.sound.playlist.length === 1 && this.sound.playlist[0].name === "Artist - Title";
    }


}

export default PlaybackController







