import React, { Component } from 'react';
import { object } from 'prop-types';

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            EditStatus: false,
        }
    }

    editItem = (e) => {
        e.preventDefault();
        let objAdd = {
          id : this.props.info.id,
          name : this.props.info.name,
          price : this.props.info.price
        }
        console.log(this.props.info.name)
        let list = [...this.props.info,objAdd];
        // console.log(objAdd)
        // let list = this.props.info.slice();
        console.log(list)
        // list.push(objAdd);
        this.setState({
            EditStatus: false,
            list: list,
        })
    }

    handleChangeName=(event)=>{
        const input = event.target.value;
        this.setState({
            name: input
        })
      }

    handleChangePrice=(event)=>{
    const input = event.target.value;
    this.setState({
         price: input
        })
    }

    render = () => {
        if (!this.state.EditStatus) {
            return (
                <div className="col-md-3">
                    <div className="card">
                    <div className="card-body">
                        <div className="card-title">{this.props.info.name}</div>
                        <div className="card-text">
                            Price: {this.props.info.price} USD
                        </div>
       <button onClick={() => this.setState({ EditStatus: !this.state.EditStatus})}>Edit</button>
       <button onClick={() => this.props.onDelete(this.props.info.id)}>Xoa</button>
                        {/* <button onClick={this.props.editItem}>Edit</button>
                            <a href="/edit-product">Edit</a>
                        <button onClick={() => this.props.onDelete(this.props.info.id)}>Delete</button> */}
                    </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="card-title">
                            <input 
                                readOnly
                                value={this.props.info.id} />
                            </div>
                            <div className="card-text">
                            <input 
                                type="text" 
                                name="name" 
                                onChange={(e)=>this.handleChangeName(e)} 
                                defaultValue={this.props.info.name} />
                            </div>
                            <div className="card-text">
                            Price:<input type="text" 
                                name="price" 
                                onChange={(e)=>this.handleChangePrice(e)} 
                                defaultValue={this.props.info.price}/>USD
                            </div>
                            <button onClick={(e)=>this.editItem(e)}>SAVE</button>
                            <button onClick={() => this.setState({ EditStatus: !this.state.EditStatus})}>Cancel</button>
                            {/* <button onClick={e=>this.editItem(e)}>Save</button> */}
                        </form>

                    </div>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
             {this.render()}
            </div>
        );
    }
}

class ShopProducts extends Component{
    constructor(props){
        super(props);
        var li = JSON.parse(localStorage.getItem('Session'));
        if(li != null){
            this.state={
                list: li.list,
                amount: li.amount
            };
        }
        else{
            this.state={
            amount: 0, 
            list:[{ id: 1, name: "IPhone 7", price: 900, status:false},
                { id: 2, name: "Iphone 7 plus", price: 1100,status:false},
                { id: 3, name: "Iphone 8", price: 1150,status:false},
                { id: 4, name: "Iphone 8 plus", price: 1200,status:false},
                { id: 5, name: "Iphone X", price: 1800,status:false},
                { id: 6, name: "Samsung Note 8", price: 1250,status:false},
                { id: 7, name: "Samsung Note 9", price: 1300,status:false},
                { id: 8, name: "Samsung Note 10", price: 1800,status:false},
                { id: 9, name: "Oppo F11", price: 650,status:false},
                { id: 10, name: "Oppo Neo X", price: 900,status:false},
                { id: 11, name: "Nokia 7", price: 800,status:false},
                { id: 12, name: "Nokia 8", price: 650,status:false}
        ]};
        }
    };

    // handleEditProduct=(id)=>{
    //     let index = this.state.list.findIndex(d => d.get('id') === id);
    //     console.log(index);
    //     for (var i in this.state.list) {
    //         if(this.state.list[i] === index)
    //         {

    //         }
    //     }
    // };
    // editItem = (obj) =>{
    //     // let mangSP = [...this.state.list];
    //     let mangSP = this.state.list.slice();
    //     let index = mangSP.findIndex(c => c.id === obj);
    //     if(index !== -1){
    //       mangSP[index].name = "123";
    //       mangSP[index].price = this.state.price;
    //       this.setState({
    //         list : mangSP
    //       });
    //     }
    //   };

    handleDelete = (id) =>{
        const list = this.state.list.filter(d => d.id !== id);
        this.setState({list: list});
        localStorage.setItem('Session',JSON.stringify(this.state));
    };

    handleChangeName=(event)=>{
        const input = event.target.value;
        this.setState({
            name: input
        })
      }

    handleChangePrice=(event)=>{
    const input = event.target.value;
    this.setState({
        price: input
        })
    }

    addItem = (e) => {
        e.preventDefault();
        let id = (this.state.list[this.state.list.length-1].id +1);
        let objAdd = {
          id : id,
          name : this.state.name,
          price : this.state.price
        }

        let list = this.state.list.slice();
        console.log(list)
        list.push(objAdd);
        
        // let listAddedItem = [...this.state.list, objAdd];
        this.setState({
          list : list
        })
      }

      
    // addItem(e,name,price) {
    //     e.preventDefault();
    //     let item = Object.assign({}, this.state.list);
    //     item.id = this.state.list[this.state.list.length-1].id + 1;
    //       let listItem = this.state.list.push(item);
    //     // list.push(item);
    //       console.log(listItem);

    //       this.setState({list: listItem});
    // }

    render(){
        localStorage.setItem('Session',JSON.stringify(this.state));
        return(
            <div className="container">
                <div>
                    <h1 className="text-center">STORE</h1>
                    <div className="text-right">
                        <a href="/add-product">Them san pham moi</a>
                    </div>
                </div>
                <div className="row">
                    {
                    this.state.list.map((e) => 
                        <Products 
                            key={e.id} 
                            name={e.name} 
                            onDelete={this.handleDelete}
                            // onEdit={this.handleEditProduct}
                            // editItem={this.editItem}
                            info={e}
                         />)
                    }
                </div>

                <hr></hr>
                <h1>Them san pham moi</h1>
                <form onSubmit={(e)=>this.addItem(e)}>
                    <div>
                    <label>Name: </label>
                    <input type="text" onChange={e => this.handleChangeName(e)} name="name"></input>
                    </div>
                    <div>
                        <label>Price: </label>
                        <input 
                            type="text" 
                            name="price"
                            defaultValue={this.state.list.price}
                            onChange={e => this.handleChangePrice(e)} >
                        </input>
                    </div>
                    <div><button >Thêm</button></div>
                </form>
                    
            </div>
        );
    };
}

export default ShopProducts;