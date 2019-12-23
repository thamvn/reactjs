import React, { Component } from 'react'
import Title from '../Title'
import gallery from '../../assets/gallery.jpg'
import LoadMoreBtn from '../../components/LoadmoreBtn'
export default class Gallery extends Component {
    render() {
        return (
            <div className="gallery">
                <Title title="Project" primary="gallery" subtitle="Portfolio" />
                <div className="gallery__content">
                    <div className="gallery__content__text">
                        <p>ALL</p>
                        <p>COMMERCIAL</p>
                        <p>DESIGN</p>
                        <p>LIFE & WORK</p>
                        <p>MISC.</p>
                    </div>
                    <hr/>
                    <div className="gallery__content__img">
                            <div className="gallery__content__img__item">
                            <img src={gallery} alt="" />
                            <div className="gallery__content__img--hover">
                                <div className="gallery__content__img--hover__text">
                                        <h3>Brand in the bag</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                         been the industry's standard dummy text ever since the 1500s</p>

                                </div>
                                <div className="gallery__content__img--hover__link">
                                    <button><i className="fa fa-link"></i></button>
                                    <button>DESIGN</button>
                                </div>
                            </div>
                            </div>
                            <div className="gallery__content__img__item">
                                
                                <img src={gallery} alt="" />
                                <div className="gallery__content__img--hover">
                                <div className="gallery__content__img--hover__text">
                                        <h3>Brand in the bag</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                         been the industry's standard dummy text ever since the 1500s</p>

                                </div>
                                <div className="gallery__content__img--hover__link">
                                    <button><i className="fa fa-link"></i></button>
                                    <button>DESIGN</button>
                                </div>
                            </div>
                            </div>
                            <div className="gallery__content__img__item">
                               
                                <img src={gallery} alt="" />
                                <div className="gallery__content__img--hover">
                                <div className="gallery__content__img--hover__text">
                                        <h3>Brand in the bag</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                         been the industry's standard dummy text ever since the 1500s</p>

                                </div>
                                <div className="gallery__content__img--hover__link">
                                    <button><i className="fa fa-link"></i></button>
                                    <button>DESIGN</button>
                                </div>
                            </div>
                            </div>
                            <div className="gallery__content__img__item">
                                
                                <img src={gallery} alt="" />
                                <div className="gallery__content__img--hover">
                                <div className="gallery__content__img--hover__text">
                                        <h3>Brand in the bag</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                         been the industry's standard dummy text ever since the 1500s</p>

                                </div>
                                <div className="gallery__content__img--hover__link">
                                    <button><i className="fa fa-link"></i></button>
                                    <button>DESIGN</button>
                                </div>
                            </div>

                            </div>
                    </div>
                    <div className="btn">
                        <LoadMoreBtn/> 
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
