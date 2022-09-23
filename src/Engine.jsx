import React, { Component } from 'react';

class Engine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamemode: "trisz",
        }
    }

    startGameHandler = () => {
        this.setState({
            gamemode: "done",
        })
    }
      
    render() { 
        return (<p>{this.state.gamemode}</p>);
    }

}
 
export default Engine;