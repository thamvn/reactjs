import React, { Component } from 'react'

export default class Title extends Component {
    render() {
        return (

            <div className="title">
                <h1>{this.props.title} <span className="title--primary">{this.props.primary}</span></h1>
                <p>{this.props.subtitle}</p>
                <hr />
            </div>

        )
    }
}
