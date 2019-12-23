import React, { Component } from 'react';
import London from '../image/city/london_dusk_cityscape_4k-750x1334.jpg';
import Newyork from '../image/city/manhattan_skyline_new_york_city-1440x900.jpg';
import Moscow from '../image/city/Moscow.jpg';
import Newyork2 from '../image/city/twilight_in_new_york_city-1440x900.jpg';
import Rate from '../image/icon/3.5-star-rating..png'
import Man from '../image/icon/user_m.png';
import Woman from '../image/icon/user_f.png';
import  Couple from '../image/icon/c.jpeg';
class Main extends Component {
    render() {
        return (
            <main>
        <div className="fillter">
          <div className="watch-intro">
            <iframe src="https://www.youtube.com/embed/jIXf-x6Ue2E" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            <div className="line">
              <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
            </div>
          </div>
          <div className="fillter-bar">
            <div className="item">
              <span>DESTINATION</span>
              <select>
                <option value={0}>Melbourne</option>
              </select>
            </div>
            <div className="item">
              <span>ADULTS</span>
              <select>
                <option value={0}>2</option>
              </select>
            </div>
            <div className="item">
              <span>CHECK IN</span>
              <select>
                <option value={0}>Sat, 17th Sep 2018</option>
              </select>
            </div>
            <div className="item">
              <span>CHECK OUT</span>
              <select>
                <option value={0}>Tue, 20th Sep 2018</option>
              </select>
            </div>
            <div className="button-book">
              <button>
                <div className="text-book">
                  <span>Book</span> <span>Now</span>
                </div>
                <div className="text-book">
                  <i className="fa fa-arrow-right" />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="trip-planner">
          <div className="line">
            <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
          </div>
          <div className="trip-planner__content">
            <div className="trip-planner__content__text">
              <div className="trip-planner__content-large">
                Trip Planner
              </div>
              <div className="trip-planner__content-normal">
                Twenty years from now you will be more disappointed by the things that you didn't do than by the
                ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade
                winds in your sails.
              </div>
              <div className="button-view">
                <div className="block-color-first">
                </div>
                <button>
                  View All Trip Plans
                </button>
                <div className="block-color-last">
                </div>
              </div>
            </div>
            <div className="trip-planner__content__image">
              <div className="planner">
                <div className="planner-item">
                  <img src={London} />
                  <div className="toure">
                    <div className="name">GUIDED TOURS</div>
                    <div className="price"><span>$99</span>/day</div>
                  </div>
                  <div className="city">New York City Tour</div>
                  <div className="detail">
                    <div className="rate">
                      <img src={Rate} />
                    </div>
                    <div className="time">7 days tour</div>
                  </div>
                </div>
                <div className="planner-item">
                  <img src={Newyork} />
                  <div className="toure">
                    <div className="name">GUIDED TOURS</div>
                    <div className="price"><span>$99</span>/day</div>
                  </div>
                  <div className="city">New York City Tour</div>
                  <div className="detail">
                    <div className="rate">
                      <img src={Rate} />
                    </div>
                    <div className="time">7 days tour</div>
                  </div>
                </div>
                <div className="planner-item">
                  <img src={Moscow} />
                  <div className="toure">
                    <div className="name">GUIDED TOURS</div>
                    <div className="price"><span>$99</span>/day</div>
                  </div>
                  <div className="city">New York City Tour</div>
                  <div className="detail">
                    <div className="rate">
                      <img src={Rate} />
                    </div>
                    <div className="time">7 days tour</div>
                  </div>
                </div>
                <div className="planner-item">
                  <img src={Newyork2} />
                  <div className="toure">
                    <div className="name">GUIDED TOURS</div>
                    <div className="price"><span>$99</span>/day</div>
                  </div>
                  <div className="city">New York City Tour</div>
                  <div className="detail">
                    <div className="rate">
                      <img src={Rate} />
                    </div>
                    <div className="time">7 days tour</div>
                  </div>
                </div>
              </div>
              <div className="button-slide">
                <button>
                  &lt;</button> <button>&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="room-site">
          <div className="room-size-detail">
            <div className="room-site-detail__title">
              Room &amp; site
            </div>
            <div className="room-site-detail__subtitle">
              Pick a room that suites your taste and budget
            </div>
            <div className="room-site-detail__image">
              <div className="image-protait">
                <div className="price">$149/night</div>
                <div className="name">Deluxe Room</div>
              </div>
              <div className="image-lanscape">
                <div className="image-lanscape-first">
                  <div className="price">$149/night</div>
                  <div className="name">Deluxe Room</div>
                </div>
                <div className="image-lanscape-second">
                  <div className="price">$149/night</div>
                  <div className="name">Deluxe Room</div>
                </div>
              </div>
              <div className="image-lanscape">
                <div className="image-lanscape-third">
                  <div className="price">$149/night</div>
                  <div className="name">Deluxe Room</div>
                </div>
                <div className="image-lanscape-forth">
                  <div className="price">$149/night</div>
                  <div className="name">Deluxe Room</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="traveller">
          <div className="traveller-site">
            <div className="traveller-site__title">Traveller's Experiences</div>
            <div className="traveller-site__subtitle">Here're some awesome feedback from our travller's
            </div>
          </div>
          <div className="traveller-content">
            <div className="line">
              <div className="line-first">
                <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
              </div>
              <div className="line-second">
                <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
              </div>
            </div>
            <div className="traveller-content__item">
              <img src={Man} alt="#" />
              <div className="block-text">
                <div className="block-text__detail">Twenty years from now you will be more disappointed by the
                  things that you didn't do than by the
                  ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade
                  winds in your sails.</div>
                <div className="block-text__name">Jonathan Doe</div>
                <div className="block-text__position">CEO, Jigsawlab</div>
              </div>
            </div>
            <div className="traveller-content__item">
              <img src={Woman} alt="#" />
              <div className="block-text">
                <div className="block-text__detail">Twenty years from now you will be more disappointed by the
                  things that you didn't do than by the
                  ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade
                  winds in your sails.</div>
                <div className="block-text__name">Jonathan Doe</div>
                <div className="block-text__position">CEO, Jigsawlab</div>
              </div>
            </div>
            <div className="traveller-content__item">
              <img src={Couple} alt="#" />
              <div className="block-text">
                <div className="block-text__detail">Twenty years from now you will be more disappointed by the
                  things that you didn't do than by the
                  ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade
                  winds in your sails.</div>
                <div className="block-text__name">Jonathan Doe</div>
                <div className="block-text__position">CEO, Jigsawlab</div>
              </div>
            </div>
          </div>
        </div>
      </main>
        );
    }
}

export default Main;