import React, { Component } from 'react'

export default class Countdown extends Component {
    render() {
        return (
            <div className="countdown">
                <div className="countdown__title">
                    <h1>
                        Until the next event
                    </h1>

                </div>
                <div className="countdown__time">
                    <div className="countdown__time__item">
                        <h2>
                            142
                        </h2>
                        <p>
                            WEEKS
                        </p>
                    </div>
                    <div className="countdown__time__item">
                        <h2>
                            05
                        </h2>
                        <p>
                            DAYS
                        </p>
                    </div>
                    <div className="countdown__time__item">
                        <h2>
                            13
                        </h2>
                        <p>
                            HOURS
                        </p>
                    </div>
                    <div className="countdown__time__item">
                        <h2>
                            31
                        </h2>
                        <p>
                            MINUTES
                        </p>
                    </div>
                    <div className="countdown__time__item">
                        <h2>
                            30
                        </h2>
                        <p>
                            SECONDS
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
