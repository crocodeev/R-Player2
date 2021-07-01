import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


const Row = ({ data, index, style}) => {

  const { playlist, position } = data;

  return(
    <div className={index === position ? "collection-item active" : "collection-item"} style={style}>
      {playlist[index]}
    </div>
  )
  }



class TrackList extends Component {

    constructor(props){
      super(props);

      this.listRef = React.createRef();
      this.state = {
        position: props.position
      }
    }

    


  
  /*shouldComponentUpdate(nextProps){

    if(this.props.currentTrack.name !== nextProps.currentTrack.name){
      console.log("diff name");
      return true;
    }

    if(this.props.playlist !== nextProps.playlist){
      console.log("diff list");
      console.log(nextProps.playlist);
      return true;
    }

    return false;
   
  }*/

  componentDidUpdate(){
    //console.log("update");
    this.listRef.current.scrollToItem(this.props.position, 'center');
  }


  render(){

    //console.log("RENDER LIST");

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
          position: this.props.position
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
  }
}


export default connect(mapStateToProps)(TrackList);
