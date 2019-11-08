import React, { Component } from 'react';
import Page from './addItem';
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
            priceErr:"",
            selectedFile:"",
            thumbnailFile:""
        }
        this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
    }
    handleChangeName(event){
        var regexName = /([A-Z]+\w{5,10})$/;
        var nameItem=event.target.value
        let arrNameItem=nameItem.split(" ")
        for(var i in arrNameItem){
            if(!regexName.test(arrNameItem[i]) && nameItem!==""){
                this.setState({nameErr:"Wrong name!"})
            }
            else this.setState({nameErr:""})
        }
            this.setState({name:nameItem})
    }
    handleChangeModel(event){
        var modelItem=event.target.value
        var regexModel = /([a-zA-Z]{3,20})+/;
        if(!regexModel.test(modelItem) && modelItem!==""){
            this.setState({modelErr:"Wrong model!"})
        }
        else this.setState({modelErr:""})
        this.setState({model:modelItem})
    }
    handleChangePrice(event){
        var priceItem=event.target.value
        var regexPrice= /^[+-]?((\d+(\.\d*)?)|(\.\d{0,2}))$/
        if(!regexPrice.test(priceItem)&& priceItem!==""){
            this.setState({priceErr:"Wrong price"})
        }
        else {
        let wordSpell=this.NumInWords(priceItem) 
        this.setState({priceErr:wordSpell})
        }
        this.setState({price:priceItem})
    }
    handleClick(event){
        let newItem={name: this.state.name,model:this.state.model,price:parseFloat(this.state.price),status: this.state.status,selectedFile: this.state.selectedFile,thumbnailFile: this.state.thumbnailFile}
        let itemGetInLocal=JSON.parse(localStorage.getItem("State"))
        if(this.state.name==="" || this.state.model==="" || isNaN(this.state.price)){
            if(this.state.name==="") this.setState({nameErr:"Please fill name input"})
            if(this.state.model==="") this.setState({modelErr:"Please fill model input"})
            if(this.state.price==="") this.setState({priceErr:"Don't sale for free =))"})
        }
        else{
            itemGetInLocal.listItem[itemGetInLocal.listItem.length]=newItem
            alert("Created success")
        }
        this.setState({listItem: itemGetInLocal.listItem})
        localStorage.setItem("State",JSON.stringify(itemGetInLocal))//Update to Local
        
    }
    handleReset(e){
        this.setState({
            price: 0,
            name:"",
            model:"",
            nameErr:"",
            priceErr:"",
            modelErr:"",
            selectedFile:"",
            thumbnailFile:"",
        })
        document.getElementById("fileInput").value = null
        document.getElementById("imgInput").src = ""
    }
    handleSelectedFiles(event){
        // var self=this
        var fileToLoad = event.target.files[0]
        var fileOrgReader = new FileReader()
        ///setState BLOb image Original
        fileOrgReader.onloadend =(fileLoadedEventfile)=>{
            this.setState({selectedFile:fileOrgReader.result})
            const width = 300
            const height = 200
            let canvas = document.createElement('canvas');
            var img=new Image() //getID()
            img.src=fileOrgReader.result
            img.onload = ()=>{
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                let imgThumb= canvas.toDataURL()
                this.setState({thumbnailFile: imgThumb})
             }
          }
        fileOrgReader.readAsDataURL(fileToLoad)
        
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
    render() {
        return (
            <form>
                <Page listItem={this.state.listItem} />
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
                    <input type="file" onChange={(event)=>this.handleSelectedFiles(event)} id="fileInput"/>
                    <img src={this.state.thumbnailFile} alt={this.state.name} id="imgInput" />
                    </div>
                </div>
                <div className="from-group">
                    <div className="row">
                        <button type="reset" className="btn btn-warning" onClick={()=>this.handleReset()}>Reset</button>
                        <button type="button" className="btn btn-success" onClick={(event) => this.handleClick()}>Add</button>
                    </div>
                </div>
                <a href="/"> Go to shop</a>
            </form>
        );
    }
}

export default FormAdd;