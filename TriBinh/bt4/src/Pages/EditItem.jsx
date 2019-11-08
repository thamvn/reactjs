import Resizer from 'react-image-file-resizer';
import React, { Component } from 'react';

export default class Item extends Component {
    constructor(props) {
        super(props);
    var total = JSON.parse(localStorage.getItem("Products"));
        this.state = {
            EditStatus: false,
            amount: total.amount,
            id : this.props.item.id,
            name : this.props.item.name,
            price : this.props.item.price,
            ThumbnailPicture: this.props.item.ThumbnailPicture,
            picPreview:this.props.item.picPreview,
            errorName:"",
            errorPrice:"",
            spellingWord:"",
        }
    }

    NumInWords (number) {
        const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
        let word = '';
      
        for (let i = 0; i < mad.length; i++) {
          let tempNumber = number%(100*Math.pow(1000,i));
          if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
            if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
              word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
            } else {
              word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
            }
          }
      
          tempNumber = number%(Math.pow(1000,i+1));
          if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'hunderd ' + word;
        }
          return word;
      }
      onChangeName =(e)=>{
        const inputName = e.target.value;
        let input = inputName[0].toUpperCase() + inputName.slice(1) ;
        if(inputName.length < 6 || inputName.length > 20){
          this.setState({
            errorName: "Enter letters between 6 and 20"
          });
          return;
        }
        this.setState({
            name:input,
            errorName:""
        });
      }
    
      onChangePrice =(e)=>{
        const regex = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
        const inputPrice = e.target.value;
        const spelling = this.NumInWords(inputPrice);
        if(!regex.test(inputPrice) || inputPrice<0 ||inputPrice>10000000000){
          this.setState({
            errorPrice:"Incorrect Decimal Format",
            spellingWord:""
          });
        }
        else{
          if(this.state.amount===0){
            this.setState({
              price:inputPrice,
              errorPrice:"",
              spellingWord: spelling
            });
          }
          else{
            let amount = this.state.amount + Number(inputPrice) - this.state.price;
            this.setState({
              price:inputPrice,
              errorPrice:"",
              spellingWord: spelling,
              amount: amount
            });
          }
        }
      }

    editItem = (e,id) => {
        e.preventDefault();
        let listItemEdit = JSON.parse(localStorage.getItem("Products"));
        let i = listItemEdit.list.findIndex(d => d.id === id);

        const price = Number(this.state.price);
        listItemEdit.amount = this.state.amount;
        listItemEdit.list[i].name = this.state.name;
        listItemEdit.list[i].price = price;
        listItemEdit.list[i].ThumbnailPicture = this.state.ThumbnailPicture;
        listItemEdit.list[i].picPreview = this.state.picPreview;
        console.log(listItemEdit.list[i]);
        localStorage.setItem("Products",JSON.stringify(listItemEdit));
        this.setState({
            EditStatus: false
        })
    }
    //Upload File and Resize Picture
    fileChangedHandler=(event)=>{
      var fileInput = false
      if(event.target.files[0]) {
          fileInput = true;
      }
      if(fileInput) {
          Resizer.imageFileResizer(
              event.target.files[0],
              400,
              400,
              'JPEG',
              100,
              0,
              uri => {
                  this.setState({
                    picPreview : uri
                })
              },
              'base64'
          );
          Resizer.imageFileResizer(
            event.target.files[0],
            200,
            200,
            'PNG',
            100,
            0,
            uri => {
                this.setState({
                  ThumbnailPicture : uri
                })
            },
            'base32'
        );
      }
    }

    render = () => {
        if (!this.state.EditStatus) {
            return (
                <div className="col-md-3">
                    <div className="card" style={{"width": "18rem"}}>
                    <img className="img-top" src={this.state.ThumbnailPicture} alt="" ></img>

                    <div className="card-body">
                        <div className="card-title">{this.state.name}</div>
                        <div className="card-text">
                            Price: {this.state.price} USD
                        </div>

       <button onClick={() => this.setState({ EditStatus: !this.state.EditStatus})}>Edit</button>
       <button onClick={() => this.props.deleteItem(this.props.item.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="col-md-3">
                <div className="card" style={{"width": "18rem"}}>
                    <button onClick={() => this.setState({ EditStatus: !this.state.EditStatus})}>X</button>
                        <form onSubmit={(e)=>this.editItem(e,this.props.item.id)}>
                        <img className="img-top" src={this.state.picPreview} alt="" ></img>
                        <input type="file" onChange={this.fileChangedHandler}/>
                    <div className="card-body">
                            <div className="card-title">
                            IdProduct: <input 
                                readOnly
                                value={this.props.item.id} />
                            </div>
                            <div className="card-text">
                            Name: <input 
                                type="text" 
                                name="name" 
                                onChange={(e)=>this.onChangeName(e)} 
                                defaultValue={this.state.name} />
                            </div>
                            <p className="text-danger">{this.state.errorName}</p>


                            <div className="card-text">
                            Price: <input type="text" 
                                name="price" 
                                onChange={(e)=>this.onChangePrice(e)} 
                                defaultValue={this.state.price}/>USD
                            </div>
                  <p className="text-danger">
                  {this.state.errorPrice===""?this.state.spellingWord:this.state.errorPrice}
                  </p>
                            <button>SAVE</button>
                    </div>

                        </form>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.render()}
            </div>
        )
    }
}