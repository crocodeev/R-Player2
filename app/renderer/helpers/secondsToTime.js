export default function secondsToTime(seconds) {

    const minutes = Math.floor(seconds/60);
    const withLeadingZeroes = String(seconds % 60).padStart(2, 0);

    return `${minutes}.${withLeadingZeroes}`
    
}