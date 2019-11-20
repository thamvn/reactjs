import React, { Component } from 'react';
import Header from './../component/Header'
import Footer from './../component/Footer'
import MainHome from '../component/MainHome';
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            count:1
        }
    }
    render() {
        return (
            <div>
                <Header page={<MainHome/>} />
                <Footer />
            </div>
        );
    }
}

export default Home;