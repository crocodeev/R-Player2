

export default function getChannelSchedule(store) {

    const currentChannel = store.getState().webapi.currentChannel;
    const channel = store.getState().webapi.channels.find((item) => item.id == currentChannel )
    return channel.workTime

}