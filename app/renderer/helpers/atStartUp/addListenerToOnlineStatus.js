import { setNetworkStatus } from '../../../store/actions/apiActions';

export default function addListenerToOnlineStatus(rpc, store) {
    const changeOnlineStatus = () => {
        const status = navigator.onLine
        rpc.changeOnlineStatus(status);
        store.dispatch(setNetworkStatus(status));
    }
    window.addEventListener('online', changeOnlineStatus);
    window.addEventListener('offline', changeOnlineStatus);

    changeOnlineStatus();
}