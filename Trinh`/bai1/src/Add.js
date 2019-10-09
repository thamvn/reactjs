import React from 'react';
import Search from './Search'

class Add extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      lst : [],
      val : ''
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick(e) {
    // e.preventDefault();
    let tmp = this.state.lst;
    tmp.push(this.state.val);
    this.setState({lst : tmp});
  }

  onChange(e) {
    // e.preventDefault();
    this.setState({val : e.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" value={this.state.val} onChange={this.onChange} />
        <button type="button" className="btn btn-default" onClick={this.onClick}>Add</button>
        <div>{this.state.lst.toString()}</div>
        <Search nameList = {this.state.lst} />
      </div>
    )
  }
}

export default Add;
