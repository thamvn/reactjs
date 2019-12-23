import React from 'react'
import Title from '../Title'
import cart from '../../assets/cart.jpg'
export default function Shop() {
    return (
        <div className="shop">
            <Title title="Custom" primary="shop" subtitle="Sell merchandise with Jevelin" />
            <div className="shop__content">

                <div className="sold-out" >
                    <div className="triangle"></div>
                    <img src={cart} alt="" />
                    <div className="shop__content__text">
                        <h4>Havana shirt</h4>
                        <p className="shop__content__text__stuff">SHIRTS</p>
                       
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <div id="sale">
                            <p className="shop__content__text__price--sale">$21.99</p> <p className="shop__content__text__price">$14.99</p>
                        </div>
                        
                    </div>
                    <button>READ MORE</button>


                </div>
                <div>
                    <div></div>
                    <img src={cart} alt="" />
                    <div className="shop__content__text">
                        <h4>Havana shirt</h4>
                        <p className="shop__content__text__stuff">SHIRTS</p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <p className="shop__content__text__price">$8.99</p>
                    </div>
                    <button>READ MORE</button>
                </div>
                <div>
                    <div></div>
                    <img src={cart} alt="" />
                    <div className="shop__content__text">
                        <h4>Havana shirt</h4>
                        <p className="shop__content__text__stuff">SHIRTS</p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <p className="shop__content__text__price">$8.99</p>
                    </div>
                    <button>READ MORE</button>
                </div>
                <div>
                    <div></div>
                    <img src={cart} alt="" />
                    <div className="shop__content__text">
                        <h4>Havana shirt</h4>
                        <p className="shop__content__text__stuff">SHIRTS</p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <p className="shop__content__text__price">$8.99</p>
                    </div>
                    <button>READ MORE</button>
                </div>
            </div>

        </div>
    )
}
