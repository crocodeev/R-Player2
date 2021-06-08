import React from 'react';
import rpc from '../../api/renderProccessConnector';

export default function TestFunction() {

    const testFunc = () => {
        console.log("TEST FUNCTION");
        rpc.relaunch();
    }

    return(
        <div className="col pdleftzero">
        <a className="waves-effect waves-light btn-small" onClick={testFunc}>
        TEST
        </a>
        </div>
    );
    
}