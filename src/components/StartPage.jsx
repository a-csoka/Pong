import React, { Component } from 'react';
import "./css/StartPage.css";

class StartPage extends Component {
    render() { 
        return (
        <React.Fragment>
            <h1 className='gameTitle'>PONG</h1>
            <h2 className="selectGameModeText">Válassz játékmódot!</h2>
            <div className="gamemodesWrapper">
                <button id="EasyBtn" onClick= { () => this.props.startGameHandler("Easy")}>1 Játékos</button>
                <button id="TwoPlayersBtn" onClick= { () => this.props.startGameHandler("TwoPlayer")}>2 Játékos</button>
            </div>
        </React.Fragment>);
    }
}
 
export default StartPage;
