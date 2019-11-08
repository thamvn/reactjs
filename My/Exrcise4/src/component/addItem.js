import React, { Component } from 'react';
import Pagination from 'react-paginating';
class Items extends Component {
    render() {
        return (
                <div className="card align-left">
                    <div className="card-body row col-6">
                        <div className="col-4">
                            <h5 className="text-left">{this.props.infor.name} {this.props.infor.model} ${this.props.infor.price}</h5>
                        </div>
                        <div className="col-4">
                            <a className="btn btn-center btn-primary" href="/edit-item" onClick={this.props.editItem}>Edit</a> 
                            <button className="btn btn-center btn-danger" onClick={this.props.deleteItem}>Delete</button>
                        </div>
                        <img src={this.props.infor.thumbnailFile} alt={this.props.infor.name} />
                    </div>
                </div>
        );
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
let listItemGetInLocal = JSON.parse(localStorage.getItem("State"))
const limit = 3
const pageCount = 5
var total= listItemGetInLocal.listItem.length


class Page extends Component {
    constructor(props){
        super(props)
        this.state={
            listItem: [],
            itemPerPage: [],
            sortNameStatus : "Descending",
            sortPriceStatus : "Descending",
            currentPage: 2
        }
    }
    componentDidMount() {
        let listItemVar = [...this.props.listItem]
        let itemCurrent = []
        for(var i in listItemVar){
            if(i>=0 && i<=limit -1)
            {
                itemCurrent.push(listItemVar[i])
            }
        }
        this.setState({
            listItem:this.props.listItem,
            itemPerPage:itemCurrent
        })
    }
    
    handlePageChange = (page, e) => {
        e.preventDefault()
        var itemCurrent=[]
        for(var i in this.state.listItem){
            if(i>=page*limit-limit && i<=page*limit-1)
            {
                itemCurrent.push(this.state.listItem[i])
            }
        }
        this.setState({
            itemPerPage: itemCurrent,
            currentPage: page
        })
        console.log("page: " + page)
        console.log("this.state.currentPage: " + this.state.currentPage)
        // debugger
    }
    handleClickSortName(e){
        e.preventDefault()
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
    handleClickSortPrice(e){
        e.preventDefault()
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
    handleDeleteItem(index){
        let itemGetInLocal=JSON.parse(localStorage.getItem("State"))
        let itemAddedInLocal =JSON.parse(localStorage.getItem("ItemsAdded"))
        let priceItem= itemGetInLocal.listItem[index].price//remove from State
        if(itemAddedInLocal.listItem.length>0){
            for(var i in itemAddedInLocal.listItem){
                if(itemGetInLocal.listItem[index].name===itemAddedInLocal.listItem[i].name){
                    itemGetInLocal.totalPrice -= priceItem
                    itemAddedInLocal.totalPrice -= priceItem
                    itemAddedInLocal.listItem.splice(i,1)
                    itemGetInLocal.listItem.splice(index,1)
                }
            }
        }
        else{
            itemGetInLocal.listItem.splice(index,1)
        }
        this.setState({listItem:itemGetInLocal.listItem,totalPrice:itemGetInLocal.totalPrice})
        localStorage.setItem("State",JSON.stringify(itemGetInLocal))
        localStorage.setItem("ItemsAdded",JSON.stringify(itemAddedInLocal))
        alert("Delete Success")
    }
    handleEditItem(index){
        let itemGetInLocal = JSON.parse(localStorage.getItem("State"))
        let itemDetailSetToLocal= itemGetInLocal.listItem[index]
        localStorage.setItem("ItemEdit",JSON.stringify(itemDetailSetToLocal))
    }
    render() {
        console.log(this.state.currentPage,this.state.itemPerPage)
        
        return (
            <div>
                <SortHandle handleSortName={(e)=>{this.handleClickSortName(e)}} handleSortPrice={(e)=>{this.handleClickSortPrice(e)}} />
                {   
                this.state.itemPerPage.map((ele,index) => <Items key={ele.name} infor={ele} deleteItem={()=>{
                this.handleDeleteItem(index)
                }} editItem={()=>{
                    this.handleEditItem(index)
                    }} />)
                }
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


export default Page