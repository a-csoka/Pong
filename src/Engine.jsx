import React, { Component } from 'react';

import Scenery from './components/Scenery';
import StartPage from "./components/StartPage";
import Field from "./components/Field";

class Engine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamemode: null,
        }
        this.startGameHandler = this.startGameHandler.bind(this)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.exitHandler); 
    }

    startGameHandler(gamemode){
        this.setState({
            gamemode: gamemode,
        })
    }

    exitHandler = (key) => {
        if(key.code == "Backspace")
            this.setState(() => ({gamemode: null}));
    }
      
    render() { 
        let currentPage;

        if(this.state.gamemode == null) {
            currentPage = <StartPage startGameHandler={this.startGameHandler} ></StartPage>
        }else{
            currentPage = (
            <Field gamemode={this.state.gamemode}></Field>
            )
        }

        return (
            <React.Fragment>
                <Scenery></Scenery>
                {currentPage}
            </React.Fragment>
        );
    }

}
 
export default Engine;