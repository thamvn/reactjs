import React, { Component } from 'react'
import screen from '../../assets/index.jpg'
export default class Screen extends Component {
    render() {
        return (
            <div className="screen">
                <img src={screen} alt="" />
            </div>
        )
    }
}
