import React, { Component } from 'react';
import "./css/Field.css";

import Players from "./Players";

class Field extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <React.Fragment>
                <div id="left-border"/>
                <div id="right-border"/>
                <div id="top-border"/>
                <div id="bottom-border"/>

                <div className="halfField"/>

                <Players gamemode={this.props.gamemode}/>
            </React.Fragment>
        )
    }
}

export default Field;