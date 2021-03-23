export default function getAllTracksFromSchedule(schedule) {
    let tracks = [];

    schedule.forEach(campaign => {
        campaign.playlists.forEach(playlist => {
            Array.prototype.push.apply(tracks, playlist.tracks)
        });
    });

    return tracks
}