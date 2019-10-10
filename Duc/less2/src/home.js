import React from 'react'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.shopping = this.shopping.bind(this);
    }
    shopping() {
        this.props.history.push({pathname:'/items'});
    }
    render() {
        return (
            <div>
                <h1>Let's buy something....</h1>
                <input type="button" value='Shop now' onClick={this.shopping}></input>
            </div>
        )
    }
}
export default Home