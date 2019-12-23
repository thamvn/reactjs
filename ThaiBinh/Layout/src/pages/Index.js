import React, { Component,Fragment } from 'react'
import Header from '../components/layout/Header'
import Client from '../components/layout/Client'
import Timeline from '../components/layout/Timeline'
import Screen from '../components/layout/Screen'
import Countdown from '../components/layout/Countdown'
import Gallery from '../components/layout/Gallery'
import VideoFrame from '../components/layout/VideoFrame'
import Shop from '../components/layout/Shop'
import CoreValue from '../components/layout/CoreValue'
import Compact from '../components/layout/Compact'
import End from '../components/layout/End'
import '../css/style.css'
export default class Index extends Component {
    render() {
        return (
           <Fragment>
               <Header />
               <Client />
               <Timeline />
               
               <Screen />
               <Countdown/>
               <Gallery/>
               <VideoFrame/>
               <Shop/>
               <CoreValue/>
               <Compact/>
               <End />
           </Fragment>
        )
    }
}
