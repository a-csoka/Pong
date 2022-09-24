import React, { Component } from 'react';

import "./css/Ball.css";

class Ball extends Component {
    state = {}
    constructor(props) {
        super(props);
        let randomRot = 0
        if(Math.random() <= 0.5){
            randomRot = 180
        }
        this.state = {  
            ballX: 49,
            ballY: 49,
            Speed: 0.05,
            Move: 0.2, //Amennyit elmozdul
            Rotation: randomRot,
            ableToMoveBall: false,
        } 

    }



    componentDidMount() {
        this.ballMoveHandler = () => {
            if(this.state.ableToMoveBall) {
                // https://academo.org/demos/rotation-about-point/
                let moveX = this.state.Move*Math.cos(degrees_to_radians(this.state.Rotation))
                let moveY = this.state.Move*Math.sin(degrees_to_radians(this.state.Rotation))
                
                //console.log("x: "+moveX+";\n Y: "+moveY+";")
                
                if(this.state.ballY+moveY <= window.innerWidth*0.004/window.innerHeight*100) {
                    this.setState(() => ({
                        Rotation: this.state.Rotation*-1,
                        ballX: this.state.ballX+moveX,
                        ballY: window.innerWidth*0.004/window.innerHeight*100,
                    }))
                }else if(this.state.ballY+moveY+(window.innerWidth*0.02/window.innerHeight*100) >= 100-window.innerWidth*0.004/window.innerHeight*100) {
                    this.setState(() => ({
                        Rotation: this.state.Rotation*-1,
                        ballX: this.state.ballX+moveX,
                        ballY: (100-window.innerWidth*0.004/window.innerHeight*100)-(window.innerWidth*0.02/window.innerHeight*100),
                    }))
                }else if(this.state.ballX <= 0.4) {
                    this.props.addScore("ScoreTwo")
                    this.restartBall()
                }else if(this.state.ballX+2 >= 99.6){
                    this.props.addScore("ScoreOne")
                    this.restartBall()
                }else if(this.state.ballX <= 1.4 && this.state.ballY >= this.props.PData.OneY-2 && this.state.ballY <= this.props.PData.OneY+10) {                    
                    let moveY = this.state.Move*Math.sin(degrees_to_radians(315+90*((this.state.ballY-this.props.PData.OneY)/10)))
                    
                    this.setState(() => ({
                        Rotation: 315+90*((this.state.ballY-this.props.PData.OneY)/10),
                        ballX: 1.5,
                        ballY: this.state.ballY+moveY,
                    }))
                    
                    //console.log(315+90*((this.state.ballY-this.props.PData.OneY)/10))
                }else if(this.state.ballX+2 >= 98.6 && this.state.ballY >= this.props.PData.TwoY-2 && this.state.ballY <= this.props.PData.TwoY+10) {
                    let moveY = this.state.Move*Math.sin(degrees_to_radians(225-90*((this.state.ballY-this.props.PData.TwoY)/10)))
                    
                    this.setState(() => ({
                        Rotation: 225-90*((this.state.ballY-this.props.PData.TwoY)/10),
                        ballX: 96.5,
                        ballY: this.state.ballY+moveY,
                    }))
                }else{  
                    this.setState(() => ({
                        ballX: this.state.ballX+moveX,
                        ballY: this.state.ballY+moveY,
                    }))
                }   
            }        
        }  
        
        this.moveRepeater = () => {
            setTimeout(() => {this.ballMoveHandler(); this.moveRepeater()}, this.state.Speed)
        }
        this.moveRepeater()
        setTimeout(() => {
            this.setState(() => ({
                ableToMoveBall: true,
            }))
        }, 1000)   
    }

    restartBall = () => {
        let randomRot = 0
        if(Math.random() <= 0.5){
            randomRot = 0
        }
        this.setState(() => ({ 
            ballX: 49,
            ballY: 49,
            Speed: 0.05,
            Move: 0.2, //Amennyit elmozdul
            Rotation: randomRot,
            ableToMoveBall: false,
        }))
        setTimeout(() => {
            this.setState(() => ({
                ableToMoveBall: true,
            }))
        }, 1000)  
    }

    render() { 
        return (
            <React.Fragment>
                <div className='ballDiv rounded-circle' style={{
                    top: this.state.ballY+"vh",
                    left: this.state.ballX+"vw",

                }}/>
            </React.Fragment>
        );
    }
}
 
export default Ball;

function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
  }