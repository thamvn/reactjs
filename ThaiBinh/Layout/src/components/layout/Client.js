import React, { Component } from 'react'
import img from '../../assets/ibl.png' 
export default class Client extends Component {
    render() {
        return (
            <div className="client">
                <div>
                    
                    <img src={img} alt="" />
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
            </div>
        )
    }
}
