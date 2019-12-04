import React, { Component } from 'react';
import '../css/style.css'
import Header from '../component/header';
import Main from '../component/main';
import Footer from '../component/footer';
class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main />
                <Footer/>
            </div>
        );
    }
}

export default Index;