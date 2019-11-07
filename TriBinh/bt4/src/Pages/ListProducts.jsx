import React, { Component } from 'react';
import '../App.css';
import ListItem from './ListItem';
import Resizer from 'react-image-file-resizer';


class AddProducts extends Component {
  constructor(props){
    super(props);
    var Session = JSON.parse(localStorage.getItem("Products"));

    this.state={
        list:Session.list,
        amount: Session.amount,
        ThumbnailPicture: Session.ThumbnailPicture,
        picPreview: Session.picPreview,
        errorName:"",
        errorPrice:"",
        spellingWord:"",
      };
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
  
  clearText=()=>{
    document.getElementById("inputName").value="";
    document.getElementById("inputPrice").value="";
    this.setState({
      name:"",
      price:"",
      picPreview:"",
      ThumbnailPicture:"",
      errorName:"",
      errorPrice:"",
      spellingWord:""
    });
  }

  onChangeName =(e)=>{
    const inputName = e.target.value;
    let input = inputName[0].toUpperCase() + inputName.slice(1) ;
    if(inputName.length < 6 || inputName.length > 20){
      this.setState({
        errorName: "Enter letters between 6 and 20"
      });
    }
    else{
        this.setState({
          name:input,
          errorName:""
      });
    }
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
      this.setState({
        price:inputPrice,
        errorPrice:"",
        spellingWord: spelling
      });
    }
  }

  addItem = (e) => {
    console.log(this.state.name)
    if(!this.state.name){
      this.setState({
        errorName: "No value",
      });
    }
    else{
      if(!this.state.price){
        this.setState({
          errorPrice: "No value",
        });
      }
      else{
        if(this.state.errorName === "" && this.state.errorPrice === "")
        {
          e.preventDefault();
          let id = (this.state.list[this.state.list.length-1].id +1);
          let priceNum = Number(this.state.price);
          let objAdd = {
            id : id,
            name : this.state.name,
            price : priceNum,
            ThumbnailPicture: this.state.ThumbnailPicture,
            picPreview: this.state.picPreview,
            status : false
          }
          document.getElementById("inputName").value="";
          document.getElementById("inputPrice").value="";
          let list = this.state.list.slice();
          alert("Save thanh cong");
          list.push(objAdd);
          this.setState({
            list : list
          })
        }
        else{
          alert("That bai roi !");
        }
      }
    }
    
    
  }

  deleteItem = (id) => {
    let listSP = [...this.state.list];
    let item = listSP.findIndex(item => item.id === id);
      listSP.splice(item,1);
      this.setState({
        list : listSP,
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

  render() {
    localStorage.setItem("Products",JSON.stringify(this.state));
    return (
      <div>
        <ListItem listItem={this.state.list} 
                  delete={this.deleteItem}  
                  amount={this.state.amount}
                />
         
        <hr></hr>
        
         <div className="justify-content-center">
         <h1>Them san pham moi</h1>
            <form>
                <div>
                <label>Name: </label>
                <input type="text" id="inputName" onChange={e => this.onChangeName(e)} name="name"></input>
                  <p className="text-danger">{this.state.errorName}</p>
                </div>
                <div>
                    <label>Price: </label>
                  <input type="text" id="inputPrice" onChange={e => this.onChangePrice(e)} name="price"></input>
                  <p className="text-danger">
                  {this.state.errorPrice===""?this.state.spellingWord:this.state.errorPrice}
                  </p>
                </div>
                <div>
                  <input type="file" onChange={this.fileChangedHandler}/>
                  <img src={this.state.picPreview} alt=""/>
                </div>
                <div>
                  <button type="button" onClick={(e)=>this.addItem(e)}>Add Item</button>
                  <button type="button" onClick={this.clearText}>Clear text</button>
                </div>
            </form>
         </div>
         
      </div>
    );
  }
}

export default AddProducts;
