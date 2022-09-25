import React, { Component, useRef} from 'react';

import "./css/Players.css";
import Ball from "./Ball";

class Players extends Component {
    state = { }
    
    constructor(props) {
        super(props);
        this.state = {
            OneY: 44,
            TwoY: 44,

            ScoreOne: 0,
            ScoreTwo: 0,

            "KeyW": false,
            "KeyS": false,
            "ShiftLeft": false,

            "ArrowUp": false,
            "ArrowDown": false,
            "ShiftRight": false,
        }
        this.childRef = React.createRef()
    }   

    componentDidMount() {
        console.log(this.childRef.current.state.ballY)
        document.addEventListener('keyup', this.keyUpHandler); 
        document.addEventListener('keydown', this.keyDownHandler); 
        document.addEventListener('touchmove', this.mobileMoveCheck); 
        document.addEventListener('touchstart', this.mobileMoveCheck); 

        this.movementCheckOne = (time) => {

            if(this.props.gamemode == "Easy") {
                //console.log((this.state.TwoY-(window.innerWidth*0.008/window.innerHeight/100)+6.5)/100)
                //console.log(this.state.OneY)
                //console.log(this.childRef.current.state.ballY)
                if(this.state.OneY > this.childRef.current.state.ballY) {
                    this.setState(() => ({ "KeyW": true, "KeyS": false}));
                }else if((this.state.OneY+6 < this.childRef.current.state.ballY)) {
                    this.setState(() => ({ "KeyW": false, "KeyS": true}));
                }else{
                    this.setState(() => ({ "KeyW": false, "KeyS": false}));
                }
            }
            if(this.state["KeyW"]) {
                if(this.state.OneY-1 >= 1) {
                    this.setState(() => ({ OneY: this.state.OneY-1 }));
                }   
            }else if(this.state["KeyS"]) {
                if(this.state.OneY+1+12 <= 99) {
                    this.setState(() => ({ OneY: this.state.OneY+1 }));
                }
            }
            var nextTime = 35
            /*
            if(this.state["ShiftLeft"]) {
                nextTime = 15
            }
            */

            setTimeout(() => {
            this.movementCheckOne(nextTime)
            }, time)
        }
        this.movementCheckOne(35)

        this.movementCheckTwo = (time) => {
            if(this.state["ArrowUp"]) {
                if(this.state.TwoY-1 >= 1) {
                    this.setState(() => ({ TwoY: this.state.TwoY-1 }));
                }
            }else if(this.state["ArrowDown"]) {
                if(this.state.TwoY+1+12 <= 99) {
                    this.setState(() => ({ TwoY: this.state.TwoY+1 }));
                }
            }
            var nextTime = 35
            /*
            if(this.state["ShiftRight"]) {
                nextTime = 15
            }
            */

            setTimeout(() => {          
            this.movementCheckTwo(nextTime)
            }, time)
        }
        this.movementCheckTwo(35)


    }

    mobileMoveCheck = (key) => {
        for(var i = 0; i< key.touches.length; i++){
            if(key.touches[i].pageX/window.innerWidth <= 0.5){
                const newY = key.touches[i].pageY/window.innerHeight*100-6
                this.setState(() => ({OneY: newY}));
            }else if(key.touches[i].pageX/window.innerWidth > 0.5){
                const newY = key.touches[i].pageY/window.innerHeight*100-6
                this.setState(() => ({TwoY: newY}));
            }
        }
    }


    keyUpHandler = (key) => {
        if(this.state[key.code]) {
            if((this.props.gamemode === "Easy" && (key.code==="ArrowUp" || key.code==="ArrowDown")) || this.props.gamemode === "TwoPlayer"){
                key.preventDefault()
                this.setState(() => ({
                    [key.code]: false,
                }))
            }
        }
    }

    keyDownHandler = (key) => { 
        if(!this.state[key.code]) {
            if((this.props.gamemode === "Easy" && (key.code==="ArrowUp" || key.code==="ArrowDown")) || this.props.gamemode === "TwoPlayer") {
                key.preventDefault()
                this.setState(() => ({
                    [key.code]: true,
                }))
            }
        }
    }

    addScore = (team) => {
        if(team === "ScoreOne"){
            this.setState(() => ({
                ScoreOne: this.state.ScoreOne+1,
            }))
        }else if(team === "ScoreTwo") {
            this.setState(() => ({
                ScoreTwo: this.state.ScoreTwo+1,
            }))
        }
    }

    render() { 
        return (
            <React.Fragment>
            <div className="playerAvatar rounded-pill" id="playerOne" style={{top: this.state.OneY+"vh"}}/>
            <div className="playerAvatar rounded-pill" id="playerTwo" style={{top: this.state.TwoY+"vh"}}/>

            <div className="scoreTableOne">{this.state.ScoreOne}</div>
            <div className="scoreTableTwo">{this.state.ScoreTwo}</div>

            <Ball PData={this.state} addScore={this.addScore} ref={this.childRef}/>
            </React.Fragment>

        );
    }
}
 
export default Players;
