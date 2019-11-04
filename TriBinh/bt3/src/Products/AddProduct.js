import React, {Component} from 'react';

class AddItem extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            price:"",
        }
    }

    handleChange = (e) => {
        const input = e.target;
        this.setState({
            [input.name] : input.value
        })
    }

    // handleName(event) {
    //     this.setState({name: event.target.value});
    //   }
    
    // handlePrice(event){
    //     this.setState({value: event.target.value});
    // }

    addItem=(e)=> {
        var list = localStorage.getItem("Session");
        
        let id = this.state.list[this.state.list.length-1].id + 1;
        let listItem = [...list,id];
        //   let listItem = this.state.list.concat({id},list);
          console.log(id);
          this.setState({list: listItem});
    }

    render(){
        return(
            <div>
                <hr></hr>
                <h1>Them san pham moi</h1>
                <form>
                    <div>
                        <label>Name: </label>
                        <input type="text" onChange={this.handleChange}  ></input>
                    </div>
                    <div>
                        <label>ID: </label>
                        <input type="text" onChange={this.handleChange}  ></input>
                    </div>
                    <input type='submit' onSubmit={this.addItem} className="btn btn-success" />
                    <a href="/" className='btn btn-success'>Cancle</a>
                </form>
            </div>
        );
    };
}

export default AddItem;

