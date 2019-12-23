import React from 'react'
import Title from '../Title'
export default function VideoFrame() {
    return (
        <div className="videoFrame">
            <div className="videoFrame__text">

                <Title title="Represent your brand with stunning" primary="video frame" />

                <div className="videoFrame__text__symbol">
                    <div >
                        <i className="fa fa-mobile"></i>
                        <p>RESPONSIVE</p>
                    </div>
                    <div>
                        <i className="fa fa-paint-roller"></i>
                        <p> VISUAL ART</p>
                    </div>
                    <div>
                        <i className="fa fa-shield-alt"></i>
                        <p>SUPPORT</p>
                    </div>
                    <div>
                        <i className="fa fa-wave-square"></i>
                        <p>GROWING</p>
                    </div>
                    <div>
                        <i className="fa fa-infinity"></i>
                        <p>UNLIMITED</p>
                    </div>
                </div>
                <div className="videoFrame__text__content">
                    <h4>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </h4>
                    <p>
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
                         , and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                         Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>


            </div>
            <div className="videoFrame__video">
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/-h01EiWviW4"
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                </iframe>
            </div>
        </div>
    )
}
