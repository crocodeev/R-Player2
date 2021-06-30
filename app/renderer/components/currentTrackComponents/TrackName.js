import React from 'react';
import { connect } from 'react-redux';

function CurrentTrack({name})  {

    return (
        <div>
            <h6>{name}</h6>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { name: state.player.currentTrack.name}
  };

export default connect(mapStateToProps)(CurrentTrack);