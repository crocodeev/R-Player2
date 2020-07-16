import React, { Component } from 'react';
//import TrackListItem from './TrackListItem';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


const Row = ({ data, index, style}) => {
  const { playlist, currentTrack } = data;
  return(
    <div className={playlist[index].name === currentTrack ? "collection-item active" : "collection-item"} style={style}>
      {playlist[index].name}
    </div>
  )
  }


class TrackList extends Component {

  listRef = React.createRef();

  shouldComponentUpdate(nextProps){
    return this.props.currentPosition !== nextProps.currentPosition;
  }

  componentDidUpdate(){
    this.listRef.current.scrollToItem(this.props.currentPosition, 'center')
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
          currentTrack: this.props.currentTrack
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



/*<AutoSizer>
      {({height, width}) => (
        <List
        className="collection"
        height={height}
        itemCount={55}
        itemSize={35}
        ref={this.listRef}
        width={width}
        >
        </List>
        )
      }
    </AutoSizer>*/




/*function TrackList({playlist, currentTrack}) {
  return (
    <ul className="collection scrolist">
    {playlist.map(item => <TrackListItem
      name={item.name}
      key={item.name}
      clName = {item.name === currentTrack ? "collection-item active" : "collection-item"}/>)}
    </ul>
  );
}*/

export default TrackList;
