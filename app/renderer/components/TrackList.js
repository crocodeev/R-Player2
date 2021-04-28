import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


const Row = ({ data, index, style}) => {
  const { playlist, currentTrack } = data;
  return(
    <div className={playlist[index] === currentTrack ? "collection-item active" : "collection-item"} style={style}>
      {playlist[index]}
    </div>
  )
  }


class TrackList extends Component {

  listRef = React.createRef();
  
  shouldComponentUpdate(nextProps){

    if(this.props.currentTrack.name !== nextProps.currentTrack.name){
      return true;
    }

    if(this.props.playlist !== nextProps.playlist){
      return true;
    }

    return false;
   
  }

  componentDidUpdate(){
    console.log("update");
    this.listRef.current.scrollToItem(this.props.playlistPosition, 'center');
  }

  render(){


    return(
      <AutoSizer>
      {({width}) => (
        <List
        className="collection"
        height={350}
        itemCount={this.props.playlist.length}
        itemSize={35}
        ref={this.listRef}
        width={width}
        itemData={{
          playlist: this.props.playlist,
          currentTrack: this.props.currentTrack.name
        }}
        >
        {Row}
        </List>
        )
      }
    </AutoSizer>
    )

  }

}

const mapStateToProps = (state) => {
  return state.player
}


export default connect(mapStateToProps)(TrackList);
