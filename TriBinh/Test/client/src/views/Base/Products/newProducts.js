import React,{Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { itemService } from '../../services/itemservices';

export default class newProducts extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[],
            name:"",
            price:"",
            errorName:"",
            errorPrice:"",
            spellingWord:"",
        }
    }

    componentDidMount() {
      itemService.getProducts().then(
        (list)=>{
          this.setState({
            products:list
          })
        }
      ).catch(err=>{return console.log(err)});
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
          errorName:"",
          errorPrice:"",
          spellingWord:""
        });
      }
    
      onChangeName =(e)=>{
        const inputName = e.target.value;
        if(!inputName){
          this.setState({
            errorName: "..."
          });
        }
        else{
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
        if(!this.state.name){
          this.setState({
            errorName: "No value",
          });
        }
        if(!this.state.price){
          this.setState({
            errorPrice: "No value",
          });
        }
         else if(this.state.errorName === "" && this.state.errorPrice === "")
          {
            // e.preventDefault();
            // let id = (products[products.length-1].id +1);
            // let priceNum = Number(this.state.price);
            // let objAdd = {
            //   id : id,
            //   name : this.state.name,
            //   price : priceNum,
            //   status : false
            // }
            let list = [...this.state.products];
            document.getElementById("inputName").value="";
            document.getElementById("inputPrice").value="";
            // let list = products.slice();
            // list.push(objAdd);
            // localStorage.setItem("products",JSON.stringify(list));
              this.setState({
                products : list
              })
              itemService.addNewItem(list);
            alert("Saved");
            this.props.history.push('/base/tables');
          }
          else{
            alert("failed !");
          }
        }

    render(){
        return(
          <div className="animated fadeIn">
            <Row>
              <Col xs="12" sm="4">
                <Card>
                  <CardHeader>
                    Add a new product
                  </CardHeader>
                  <CardBody>
                    <Form action="" method="post">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Name</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="inputName" onChange={e => this.onChangeName(e)} name="name"/>
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                          </InputGroupAddon>
                          <b className="text-danger">{this.state.errorName}</b>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Price</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="inputPrice" onChange={e => this.onChangePrice(e)} name="price" />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                          </InputGroupAddon>
                          <b className="text-danger">
                          {this.state.errorPrice===""?this.state.spellingWord:this.state.errorPrice}
                          </b>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="form-actions">
                        <Button type="button" onClick={(e)=>this.addItem(e)}>Add Item</Button>
                        <Button type="button" onClick={this.clearText}>Clear text</Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )
    }
}
