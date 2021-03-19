

export default function getChannelSchedule(store) {

    console.log(store.getState());
    const currentChannel = store.getState().webapi.currentChannel;
    console.log(currentChannel);
    const channel = store.getState().webapi.channels.find((item) => item.id == currentChannel )
    console.log(channel);
    return channel.workTime

}