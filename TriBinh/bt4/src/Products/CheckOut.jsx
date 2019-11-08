import React, {Component} from 'react';

class ListProductCheckOut extends Component{
    render(){
      return(   
        <div className="col-md-3">
            <div className="card mt-2" style={{border:"2px solid red",borderRadius:"5px"}}>
            <img src={this.props.info.ThumbnailPicture} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="card-title">Name: {this.props.info.name}</div>
                    <div className="card-text">
                        Price: {this.props.info.price} USD
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }

class CheckOut extends Component{
    constructor(props){
        super(props);
        let li = JSON.parse(localStorage.getItem('Products'));
        
        for (var i in li.list) {
            if(!li.list[i].status)
            {
                delete li.list[i];
            }
        }
        
        this.state={
            listProduct : li.list,
            amount: li.amount
        };
    };

    render(){
        return(
            <div>
                <a className="btn" href="/">Back to Store</a>
                <div className="row">
                {
                    this.state.listProduct.map((e) => <ListProductCheckOut key={e.id} info={e} />)
                }
                </div>
                 <h2 className="text-danger ">  Total : {this.state.amount} </h2>
            </div>
        );
    }
}

export default CheckOut;