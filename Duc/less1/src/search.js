import React from 'react'
class Search extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            listUser:this.props.list,
            matchUser: [],
            searchUser: ''
        }
        this.search = this.search.bind(this);
        this.FieldChange = this.FieldChange.bind(this);
    }
    search() {
        this.setState({ matchUser: [] })
        var listUser = this.state.listUser;
        console.log("list user: "+JSON.stringify(listUser))
        var matched = [];
        if (listUser.length === 0) {
            alert("no user in list");
            return;
        }
        for (var i = 0; i < listUser.length; i++) {
            console.log("length: "+listUser.length)
            var founded = listUser[i].indexOf(this.state.searchUser);
            console.log("founded: "+founded)
            if (founded >= 0) {
                matched.push(this.state.listUser[i])
            }
        }
        console.log("matched: "+matched)
        this.setState({ matchUser: matched })
        this.setState({searchUser:''})
    }
    FieldChange(e) {
        console.log(e.target.value);
        this.setState({ searchUser: e.target.value });
    }
    render() {
        return (
            <div>
                <input type="text" name="search" onChange={(e) => this.FieldChange(e)} value={this.state.searchUser}></input>
                <button onClick={this.search}>Search</button>
                <table>
                    <tbody>
                        <tr>
                            <th>User name</th>
                        </tr>
                        {this.state.matchUser.map((user,idx) => 
                            <tr key={user}>
                                <td>{user}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        )
    }
}
export default Search