import React, { Component } from 'react';
import ListItem from '../component/itemEntry';
import Pagination from 'react-paginating';

let listItemGetInLocal = JSON.parse(localStorage.getItem("State"))
if(!listItemGetInLocal){
    let newLocalStorge={
        listItem: [{name:"Audi" ,model:"R8" ,price:50000,status:"Add to cart",thumbnailFile:"",selectedFile:""},
        {name:"Ford",model:"Mustang",price:34000,status:"Add to cart",thumbnailFile:"",selectedFile:""},
        {name:"Cherolet",model:"Camaro",price:56000,status:"Add to cart",thumbnailFile:"",selectedFile:""},
        {name:"Honda",model:"Civic",price:46000,status:"Add to cart",thumbnailFile:"",selectedFile:""}],
        totalPrice: 0
    }
    localStorage.setItem("State",JSON.stringify(newLocalStorge))
}
const limit = 3
const pageCount = 5
const total= listItemGetInLocal.listItem.length
var fistitemCurrent = []
for(var i in listItemGetInLocal.listItem){
    if(i>=0 && i<=limit -1)
    {
        fistitemCurrent.push(listItemGetInLocal.listItem[i])
    }
}
class SortHandle extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleSortName}>Sort by Name</button>
                <button onClick={this.props.handleSortPrice}>Sort by price</button>
            </div>
        );
    }
}
class Paginating extends Component {
    constructor(){
        super()
        this.state={
            listItem: listItemGetInLocal.listItem,
            itemPerPage: fistitemCurrent,
            sortNameStatus : "Descending",
            sortPriceStatus : "Descending",
            currentPage:1
        }
    }
    handlePageChange = (page, e) => {
        var itemCurrent=[]
        for(var i in this.state.listItem){
            if(i>=page*limit-limit && i<=page*limit-1)
            {
                itemCurrent.push(this.state.listItem[i])
            }
        }
        this.setState({
            itemPerPage: itemCurrent,
            currentPage: page,
        })
    }
    handleClickSortName(){
        let listItemInState=[...this.state.listItem]
        let lastIndexItemInPage = this.state.currentPage*limit
        listItemInState.sort((key1,key2)=>{
            if(key1.name>key2.name) return 1
            if(key1.name<key2.name) return -1
            return 0
        })
        
        if(this.state.sortNameStatus==="Descending"){
            var itemCurrentDesencding=[]
            for(var i in listItemInState){
                if(i>=lastIndexItemInPage-limit && i<=lastIndexItemInPage-1)
                {
                    itemCurrentDesencding.push(listItemInState[i])
                }
            }
           this.setState({
            listItem: listItemInState,
            sortNameStatus: "Ascending",
            itemPerPage:itemCurrentDesencding
        })
        }
        else{
            var itemCurrentAscending=[]
            listItemInState.reverse()
            for(var j in listItemInState){
                if(j>=lastIndexItemInPage-limit && j<=lastIndexItemInPage-1)
                {
                    itemCurrentAscending.push(listItemInState[j])
                }
            }
            this.setState({
                listItem: listItemInState,
                sortNameStatus: "Descending",
                itemPerPage:itemCurrentAscending
            })
        }
    }
    handleClickSortPrice(){
        let listItemInState = [...this.state.listItem]
        let lastIndexItemInPage = this.state.currentPage*limit
        listItemInState.sort((key1,key2)=>{
            if(key1.price>key2.price) return 1
            if(key1.price<key2.price) return -1
            return 0
       })
       if(this.state.sortNameStatus==="Descending"){
        var itemCurrentDesencding=[]
        for(var i in listItemInState){
            if(i>=lastIndexItemInPage-limit && i<=lastIndexItemInPage-1)
            {
                itemCurrentDesencding.push(listItemInState[i])
            }
        }
       this.setState({
        listItem: listItemInState,
        sortNameStatus: "Ascending",
        itemPerPage:itemCurrentDesencding
        })
        }
        else{
            var itemCurrentAscending=[]
            listItemInState.reverse()
            for(var j in listItemInState){
                if(j>=lastIndexItemInPage-limit && j<=lastIndexItemInPage-1)
                {
                    itemCurrentAscending.push(listItemInState[j])
                }
            }
            this.setState({
                listItem: listItemInState,
                sortNameStatus: "Descending",
                itemPerPage:itemCurrentAscending
            })
        }
    }
    render() {
        return (
            <div>
                <SortHandle handleSortName={()=>{this.handleClickSortName()}} handleSortPrice={()=>{this.handleClickSortPrice()}} />
                <ListItem itemPerPage={this.state.itemPerPage} listItem={this.state.listItem} currentPage={this.state.currentPage}
                sortNameStatus={this.state.sortNameStatus} sortPriceStatus={this.state.sortPriceStatus}
                />
                <Pagination total={total} limit={limit} pageCount={pageCount} currentPage={this.state.currentPage}>
                    {({
                        pages,
                        currentPage,
                        hasNextPage,
                        hasPreviousPage,
                        previousPage,
                        nextPage,
                        totalPages,
                        getPageItemProps
                    })=>(
                        <div className="text-center">
                            <button {...getPageItemProps({ pageValue: 1, onPageChange: this.handlePageChange })}> First</button>
                            {hasPreviousPage && ( <button {...getPageItemProps({ pageValue: previousPage, 
                                onPageChange: this.handlePageChange})}> {'<'}
                            </button> )}
                            { pages.map(page => {
                                let activePage = null;
                                if (currentPage === page) {
                                activePage = { backgroundColor: '#fdce09' };
                                }
                                return (
                                <button
                                    {...getPageItemProps({
                                    pageValue: page,
                                    key: page,
                                    style: activePage,
                                    onPageChange: this.handlePageChange
                                    })}
                                >
                                    {page}
                                </button>
                                );
                            })}
                            {hasNextPage && ( <button {...getPageItemProps({
                                pageValue: nextPage,
                                onPageChange: this.handlePageChange
                            })}
                >
                  {'>'}
                </button>
              )}
                            <button {...getPageItemProps({ pageValue: totalPages, onPageChange: this.handlePageChange})}> Last</button>
                        </div>
                    )}
                </Pagination>
            </div>
        );
    }
}

export default Paginating;