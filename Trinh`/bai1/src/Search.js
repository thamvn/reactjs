import React from 'react';

class Search extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      lst : this.props.nameList,
      val : '',
      ret : []
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.findMatch = this.findMatch.bind(this);
  }

  findMatch(str) {
    let  list = this.state.lst;
    let results = [];
    for (var prop in list) {
        if (list[prop].indexOf(str) >= 0) {
            results.push(list[prop]);
            this.setState({ret : results})
        }
    }
  }

  onClick(e) {
    e.preventDefault();
    this.findMatch(this.state.val);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({val : e.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" value={this.state.val} onChange={this.onChange} />
        <button type="button" className="btn btn-default" onClick={this.onClick}>Search</button>
        <div>{this.state.ret.toString()}</div>
      </div>
    )
  }
}

export default Search;
