
import deepcopy from 'deepcopy';
import timeComparator from '../scheduler/helpers/timeComparator';
import { func } from 'prop-types';

//с помощью 

class PlaybackHandler {

    constructor(sound, timeToLeftThreshold){
        if(!!PlaybackHandler.instance){
            return PlaybackHandler.instance
        }

        PlaybackHandler.instance = this;

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

    _insertIntoPlaylist(playlist){

        console.log(playlist);
        //first start
        this.sound.playlist.splice(0, this.sound.playlist.length, ...arr);
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

}

export default PlaybackHandler







