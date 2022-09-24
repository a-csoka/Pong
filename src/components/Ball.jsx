import React, { Component } from 'react';

import "./css/Ball.css";

class Ball extends Component {
    state = {  
        ballX: 49,
        ballY: 49,
        Speed: 0.05,
        Move: 0.2, //Amennyit elmozdul
        Rotation: 110,
    } 

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.ballMoveHandler = () => {
            // https://academo.org/demos/rotation-about-point/
            let moveX = this.state.Move*Math.cos(degrees_to_radians(this.state.Rotation))
            let moveY = this.state.Move*Math.sin(degrees_to_radians(this.state.Rotation))
            
            //console.log("x: "+moveX+";\n Y: "+moveY+";")
            
            

            this.setState(() => ({
                ballX: this.state.ballX+moveX,
                ballY: this.state.ballY+moveY,
            }))
            
            
            setTimeout(() => {this.ballMoveHandler()}, this.state.Speed)
        }
        setTimeout(() => {this.ballMoveHandler()}, 1000)
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