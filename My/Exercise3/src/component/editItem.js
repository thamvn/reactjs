import React, { Component } from 'react';
class FormEdit extends Component {
    constructor(props){
        let itemDetailGetInLocal= JSON.parse(localStorage.getItem("ItemEdit"))
        super(props);
        this.state={
            name: itemDetailGetInLocal.name,
            model: itemDetailGetInLocal.model,
            price: itemDetailGetInLocal.price,
            status: itemDetailGetInLocal.status,
            nameErr: "",
            modelErr:"",
            priceErr:""
        }
    }
    handleChangeName(event){
        var nameItem=event.target.value
        this.setState({name:nameItem})
    }
    handleChangeModel(event){
        var modelItem=event.target.value
        this.setState({model:modelItem})
    }
    handleChangePrice(event){
        var priceItem=event.target.value
        this.setState({price:priceItem})
    }
    handleClick(){
        let listItemGetInLocal = JSON.parse(localStorage.getItem("State"))
        for(var i in listItemGetInLocal.listItem){
            if(this.state.name === listItemGetInLocal.listItem[i].name){
                listItemGetInLocal.listItem[i] = this.state
            }
        }
        localStorage.setItem("State",JSON.stringify(listItemGetInLocal))
        alert("Save success!")
    }
    render() {
        return (
            <form>
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addName">Name: </label>
                        <input type="text" className="form-control" id="addName" value={this.state.name} onChange={(event) => this.handleChangeName(event)}/>
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addModel">Model: </label>
                        <input type="text" className="form-control" id="addModel" value={this.state.model} onChange={(event) => this.handleChangeModel(event)}/>
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addPrice">Price: </label>
                        <input type="text" className="form-control" id="addPrice" value={this.state.price} onChange={(event) => this.handleChangePrice(event)} />
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <a  href="/" className="btn btn-danger">Cancel</a>
                        <button type="button" className="btn btn-success" onClick={(event) => this.handleClick()}>Save</button>
                    </div>
                </div>
                <a href="/"> Go to shop</a>
            </form>
        );
    }
}

export default FormEdit;