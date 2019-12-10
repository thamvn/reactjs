import React, { Component } from 'react'
import Title from '../Title'
export default class Timeline extends Component {
    render() {
        return (
            <div className="timeline-wrap">
                <Title title="Event" primary="time-line" subtitle="Event Schedule" />
                <div className="timeline">
                <div className="container left">
                    <div className="timeline__content">
                        <h2>2017</h2>
                        <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                    </div>
                    
                </div>
                <div className="container right">
                    <div className="timeline__content">
                        <h2>2016</h2>s
                        <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                    </div>
                </div>
                <div className="container left">
                    <div className="timeline__content">
                        <h2>2015</h2>
                        <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                    </div>
                </div>
                
            </div>
            </div>
            
        )
    }
}
