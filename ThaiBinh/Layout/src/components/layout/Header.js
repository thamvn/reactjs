import React, { Component } from 'react'
import facebook from '../../assets/fb.jpg'
import ins from '../../assets/ins.png'
import twitter from '../../assets/twitter.jpg'
export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav>
                    <h1><a href="/">Jevelin</a></h1>
                    <div>
                        <ul className="nav-list">
                            <li className="nav-list__item" id="home">
                                <a href="#">Home <i className="fa fa-chevron-down"></i>
                                
                                </a>
                                 <div className="nav-list__item--hover">
                    <div>
                        <ul>
                            <li>
                                <p>Industries 1</p>
                            </li>
                            <li>
                                <a href="#">Architect <span className="badge badge--align">NEW</span></a>
                            </li>
                            <li>
                                <a href="#">Coporate Accouting <span className="badge badge--align">NEW</span></a>
                            </li>
                            <li>
                                <a href="#">Finances</a>
                            </li>
                            <li>
                                <a href="#">Creative Agency</a>
                            </li>
                            <li>
                                <a href="#">Medical</a>
                            </li>
                            <li>
                                <a href="#">Education</a>
                            </li>
                            <li>
                                <a href="#">Foodie</a>
                            </li>
                        </ul>
                    </div>
                   <div>
                   <ul>
                        <li>
                            <p>Industries 2</p>
                        </li>
                        <li>
                            <a href="#">Beauty </a>
                        </li>
                        <li>
                            <a href="#">Personal Blog</a>
                        </li>
                        <li>
                            <a href="#">Shop</a>
                        </li>
                        <li>
                            <a href="#">Fashion Shop</a>
                        </li>
                        <li>
                            <a href="#">Single Product</a>
                        </li>
                        <li>
                            <a href="#">Startup</a>
                        </li>
                        <li>
                            <a href="#">Startup Clean <span className="badge badge--align">NEW</span></a>
                        </li>
                        <li>
                            <a href="#">Startup Creative <span className="badge badge--align">NEW</span></a>
                        </li>
                    </ul>
                   </div>
                    <div>
                    <ul>
                        <li>
                            <p>Industries 3</p>
                        </li>
                        <li>
                            <a href="#">Construction </a>
                        </li>
                        <li>
                            <a href="#">Autospot</a>
                        </li>
                        <li>
                            <a href="#">Photography</a>
                        </li>
                        <li>
                            <a href="#">Corporate</a>
                        </li>
                        <li>
                            <a href="#">Event</a>
                        </li>
                        <li>
                            <a href="#">Crypto</a>
                        </li>
                        <li>
                            <a href="#">Fitness</a>
                        </li>
                        <li>
                            <a href="#">Wedding</a>
                        </li>
                    </ul>
                    </div>  
                    <div>
                    <ul>
                        <li>
                            <p>Basic 1</p>
                        </li>
                        <li>
                            <a href="#">Basic </a>
                        </li>
                        <li>
                            <a href="#">Boxed</a>
                        </li>
                        <li>
                            <a href="#">Creative</a>
                        </li>
                        <li>
                            <a href="#">Nature</a>
                        </li>
                        <li>
                            <a href="#">Landing</a>
                        </li>
                        <li>
                            <a href="#">Landing 2</a>
                        </li>
                        <li>
                            <a href="#">Comming Soon</a>
                        </li>
                        <li>
                            <a href="#">Comming Soon - Side by Side</a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <ul>
                        <li>
                            <p>Basic 2</p>
                        </li>
                        <li>
                            <a href="#">Blog - Full </a>
                        </li>
                        <li>
                            <a href="#">Blog - Side to Side </a>
                        </li>
                        <li>
                            <a href="#">Blot + Sidebar</a>
                        </li>
                        <li>
                            <a href="#">Portfolio</a>
                        </li>
                        <li>
                            <a href="#">Portfolio + Side Header</a>
                        </li>
                        <li>
                            <a href="#">Portfolio Minimalistic <span className="badge badge--align">NEW</span></a>
                        </li>
                        <li>
                            <a href="#">Portfolio Full-Width <span className="badge badge--align">NEW</span></a>
                        </li>
                        <li>
                            <a href="#">Portfolio Freelance <span className="badge badge--align">NEW</span></a>
                        </li>
                    </ul>
                    </div>
                   

                </div>


                            </li>
                            <li className="nav-list__item"><a href="#">Blog <i className="fa fa-chevron-down"></i></a></li>
                            <li className="nav-list__item"><a href="#">Portfolio <i className="fa fa-chevron-down"></i></a></li>
                            <li className="nav-list__item"><a href="#">Shop <i className="fa fa-chevron-down"></i></a> </li>
                            <li className="nav-list__item"><a href="#">Variations <i className="fa fa-chevron-down"></i></a> </li>
                            <li className="nav-list__item"><a href="#">Elements <i className="fa fa-chevron-down"></i></a> </li>
                            <li className="nav-list__item"><a href="#"><i className="fa fa-shopping-cart"></i><span className='badge'> 0 </span></a></li>
                            <li className="nav-list__item"><a href="#"><i className="fa fa-search"></i></a></li>
                            <li className="nav-list__item"><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li className="nav-list__item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="nav-list__item"><a href="#"><i className="fab fa-instagram"></i></a></li>

                        </ul>
                    </div>

                </nav>
               
                <div className="slider" >

                    <button>
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <div className="slider__content">

                        <div>
                            <h1>Set your <span className="slider__content--primary">business</span> <br />in motion today</h1>
                            <p>Create awesome website today!</p>
                        </div>

                    </div>
                    <button>
                        <i className="fa fa-chevron-right"></i>
                    </button>

                </div>
                <div className="slider__dot">
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                </div>
            </header>
        )
    }
}
