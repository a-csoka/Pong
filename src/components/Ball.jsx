import React, { Component } from 'react';

import "./css/Ball.css";

class Ball extends Component {
    
    state = {  
        ballX: 49,
        ballY: 49,
        Speed: 0.05,
        Move: 0.2, //Amennyit elmozdul
        Rotation: 280,
        ableToMoveBall: false,
    } 

    constructor(props) {
        super(props);
        this.ballTimer = null
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
        this.setState(() => ({ 
            ballX: 49,
            ballY: 49,
            Speed: 0.05,
            Move: 0.2, //Amennyit elmozdul
            Rotation: 280,
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