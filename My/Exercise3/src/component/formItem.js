import React, { Component } from 'react';
import Items from './addItem';
class FormAdd extends Component {
    constructor(props){
        let itemGetInLocal=JSON.parse(localStorage.getItem("State"))

        super(props);
        this.state={
            listItem: itemGetInLocal.listItem,
            name:"",
            model:"",
            price:"",
            status:"Add to cart",
            nameErr: "",
            modelErr:"",
            priceErr:""
        
        }
    }
    handleChangeName(event){
        var regexName = /[A-Z]+[a-zA-z0-9]{6,20}\s */;
        var nameItem=event.target.value
        if(regexName.test(nameItem)===true){
            this.setState({nameErr:"Name wrong!"})
        }
        else this.setState({nameErr:""})
        this.setState({name:nameItem})
    }
    handleChangeModel(event){
        var modelItem=event.target.value
        var regexModel = /[a-zA-Z0-9]+/;
        if(regexModel.test(modelItem)===true){
            this.setState({modelErr:"Model wrong!"})
        }
        else this.setState({modelErr:""})
        this.setState({model:modelItem})
    }
    handleChangePrice(event){
        var priceItem=event.target.value
        var regexPrice = /[0-9]{1,10}/;
        if(regexPrice.test(priceItem)===true){
            this.setState({priceErr:"Price wrong!"})
        }
        else this.setState({priceErr:""})
        this.setState({price:priceItem})
    }
    handleClick(event){
        let newItem={name: this.state.name,model:this.state.model,price:this.state.price,status: this.state.status}
        let itemGetInLocal=JSON.parse(localStorage.getItem("State"))
        if(this.state.name==="" || this.state.model==="" || this.state.price===""){
        }
        else{
            itemGetInLocal.listItem[itemGetInLocal.listItem.length]=newItem
        }
        this.setState({listItem: itemGetInLocal.listItem})
        localStorage.setItem("State",JSON.stringify(itemGetInLocal))
    }
    handleDeleteItem(index){
        let itemGetInLocal=JSON.parse(localStorage.getItem("State"))
        let priceItem= itemGetInLocal.listItem[index].price
        itemGetInLocal.listItem.splice(index,1)
        this.setState({listItem:itemGetInLocal.listItem})
        itemGetInLocal.totalPrice -= priceItem
        localStorage.setItem("State",JSON.stringify(itemGetInLocal))
        let itemAddedInLocal =JSON.parse(localStorage.getItem("ItemsAdded"))
        localStorage.setItem("ItemsAdded",JSON.stringify(itemAddedInLocal))
    }
    handleEditItem(index){
        let itemGetInLocal = JSON.parse(localStorage.getItem("State"))
        let itemDetailSetToLocal= itemGetInLocal.listItem[index]
        localStorage.setItem("ItemEdit",JSON.stringify(itemDetailSetToLocal))
    }
    render() {
        return (
            <form>
                {this.state.listItem.map((ele,index) => <Items key={ele.name} infor={ele} 
                editItem={()=>{ this.handleEditItem(index) }} 
                deleteItem={()=>{this.handleDeleteItem(index)}}
             />)}
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addName">Name: </label>
                        <input type="text" className="form-control" id="addName" value={this.state.name} onChange={(event) => this.handleChangeName(event)}/>
                        <p className="text-danger">{this.state.nameErr}</p>
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addModel">Model: </label>
                        <input type="text" className="form-control" id="addModel" value={this.state.model} onChange={(event) => this.handleChangeModel(event)}/>
                        <p className="text-danger">{this.state.modelErr}</p>
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <label className="text-strong" htmlFor="addPrice">Price: </label>
                        <input type="text" className="form-control" id="addPrice" value={this.state.price} onChange={(event) => this.handleChangePrice(event)} />
                        <p className="text-danger">{this.state.priceErr}</p>
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <button type="reset" value="Reset" className="btn btn-warning">Reset</button>
                        <button type="button" className="btn btn-success" onClick={(event) => this.handleClick()}>Add</button>
                    </div>
                </div>
                <a href="/"> Go to shop</a>
            </form>
        );
    }
}

export default FormAdd;