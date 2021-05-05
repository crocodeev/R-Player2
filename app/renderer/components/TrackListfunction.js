import React, { Component, useEffect } from 'react';
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
  
 /*shouldComponentUpdate(nextProps){
   
    return this.props.name !== nextProps.name;
    //return this.props.currentTrack !== nextProps.currentTrack;

  }*/


  componentDidUpdate(){
    console.log("Updated");
    this.listRef.current.scrollToItem(this.props.position, 'center')
  }

  render(){

    console.log("!!!RENDER!!!");

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
          currentTrack: this.props.name
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
  return {
    playlist: state.player.playlist,
    position: state.player.playlistPosition,
    name: state.player.currentTrack.name
  }
}


export default connect(mapStateToProps)(TrackList);
