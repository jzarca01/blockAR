/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ARScene, { ARBoxNode, ARTextNode, ARNode } from 'react-arkit';

const Echo = React.createClass({
  
  render: function() {
    // render the messages from state:
    return <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
  }
});

export default class blockARv2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount(){
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket('wss://ws.blockchain.info/inv');

    this.connection.onopen = evt => {
      this.connection.send('{"op":"unconfirmed_sub"}');
    }
    // listen to onmessage event
    this.connection.onmessage = evt => { 
      // add the new message to state
      this.setState({
        blocks : this.state.blocks.concat([ evt.data ])
      });
    };
  }

  render() {
    return (
    <ARScene style={{ flex: 1 }}
    onPlaneDetected={({id, alignment, node, center, extent}) => {
        console.log("Detected plane:", id);
    }}
    onPlaneUpdated={({id, alignment, node, center, extent}) => {
        console.log("Updated plane:", id);
    }}>
    {this.state.blocks.slice(-200).map((block, index) => 
        <ARBoxNode
        key={index}
        geoposition={{x: this.state.blocks.length * Math.random()*Math.cos(index), y: this.state.blocks.length * Math.random()*Math.cos(index), z: this.state.blocks.length * Math.random()*Math.cos(index)}}
        size={{ height: 0.05,
                width: 0.05,
                length: 0.05,
                chamferRadius: 0.01 }}
        color='#00F'/>
          /* if you prefer cats over blocks
          <ARNode
        modelAssetPath={'CustomAssets.scnassets/Cat.dae:Cat'}
        geoposition={{x: this.state.blocks.length * Math.random()*Math.cos(index), y: this.state.blocks.length * Math.random()*Math.cos(index), z: this.state.blocks.length * Math.random()*Math.cos(index)}}
        />
          */
    )}
    </ARScene>
    );
  }
}

AppRegistry.registerComponent('blockARv2', () => blockARv2);
