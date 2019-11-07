import React, { Component } from 'react';
import Item from './EditItem';

export default class ListItem extends Component {
    renderItem = () => {
        let content = this.props.listItem.map((e)=>{
            return (
                <Item item={e} key={e.id} 
                deleteItem={()=>this.props.delete(e.id)} 
                />
            )
        })
        return content;
    }

    render() {
        return (
            <div>
                <a href="/">Move to Home Page</a>
                <h1 className="text-center text-danger">THAY DOI SAN PHAM</h1>
                <div className="row">
                    {this.renderItem()}
                </div>
            </div>
           
        )
    }
}