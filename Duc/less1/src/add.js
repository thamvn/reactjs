import React from 'react'
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
        this.addNew = this.addNew.bind(this);
        this.FieldChange = this.FieldChange.bind(this);
    }
    addNew() {
        this.props.add(this.state.user)
        this.setState({user:''})
    }
    FieldChange(e) {
        console.log(e.target.value);
        this.setState({ user: e.target.value })
    }
    render() {
        return (
            <div>
                <input type="text" name="user" onChange={(e) => this.FieldChange(e)} value={this.state.user}></input>
                <button onClick={this.addNew}>Add</button>
            </div>
        )
    }
}
export default Add;