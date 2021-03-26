export default function createReqularRequest(callback, intervalInMinutes) {
    
    const milliseconds =  intervalInMinutes > 59 ? 60000 : intervalInMinutes * 60000

    const regulalRequest = setInterval(callback, milliseconds);

    return regulalRequest
}