import React, {Component} from 'react';

class EditItemid extends Component{
    render(){
        return(
            <div>
                <hr></hr>
                <h1>Sua san pham</h1>
                <form>
                    <div className="for-group">
                        <label>Name: </label>
                        <input type="text" name="name" value={this.props.info.name}></input>
                    </div>
                    <div className="for-group">
                        <label>Price: </label>
                        <input type="text" name="price" value={this.props.info.price}></input>
                    </div>
                    <button className="btn btn-success">Save</button>
                    <a className="btn btn-danger" href="/">Cancle</a>
                </form>
            </div>
        );
    };
}

class EditItem extends Component{
    constructor(props){
        super(props);
        let li = JSON.parse(localStorage.getItem('Session'));
        
        this.state={
            listProduct : li.list,
            amount: li.amount
        };
    };

    render(){
        return(
            <div>
                <a className="btn" href="/">Back to Store</a>
                {
                    this.state.listProduct.map((e) => <EditItemid key={e.id} info={e} />)
                }
            </div>
        );
    }
}

export default EditItem;

