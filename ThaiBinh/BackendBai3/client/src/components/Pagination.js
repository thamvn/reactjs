import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../store';
import { countProducts } from '../actions/productActions'

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalRecords: this.props.totalRecords,
            itemsPerPage: '',
            totalPages: '',
            currentPage: '',
            pagesToShow: '',
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.totalRecords !== state.totalRecords) {
            return {
                totalRecords: props.totalRecords
            }
        }
        return null
    }
    componentDidUpdate(prevProps, prevState) {
        let itemsPerPage = this.props.itemsPerPage;
        let pagesToShow = this.props.pagesToShow;
        let totalRecords = this.state.totalRecords;
        if (prevState.itemsPerPage !== itemsPerPage
            || prevState.pagesToShow !== pagesToShow) {
            this.setState({
                pagesToShow: pagesToShow,
                itemsPerPage: itemsPerPage,
                totalPages: Math.ceil(totalRecords / itemsPerPage)

            })
            this.setPage(this.state.currentPage)
        }
       

    }
    setPage(page){
        let {totalRecords,totalPages,itemsPerPage}=this.state;
        if(page<1){
            page=1
        }else{
            if(page>totalPages){
                page=totalPages;
            }
        }
        this.setState({
            currentPage:page
        })
        let startIndex=(page-1)*itemsPerPage;
        let endIndex=Math.min(startIndex+itemsPerPage-1,totalRecords-1)
        this.props.onPageChange(page)
    }
    getPager(){
        let {pagesToShow,currentPage,totalPages}=this.state;
        let pages=[],
            startFromNumber=1;

        if(totalPages<=pagesToShow){
            startFromNumber=1;
            pagesToShow=totalPages;

        }else{
            if(currentPage<=Math.ceil(pagesToShow/2)){
                startFromNumber=1
            }else if(currentPage+Math.floor((pagesToShow-1)/2)>=totalPages){
                startFromNumber=totalPages-(pagesToShow-1)

            }else{
                startFromNumber=currentPage-Math.floor(pagesToShow/2)
            }
        }
        console.log(pagesToShow)
        for(let i=1;i<=pagesToShow;i++){
            pages.push(startFromNumber++)
        }
        return {
            currentPage,
            totalPages,
            pages
        }
    }
    render() {
        if(!this.state.totalRecords||this.state.totalPages===1) return null;
        let pager=this.getPager();
        // console.log(pager)
        return (
            <Provider store={store}>
                <div style={{marginLeft:"770px"}}>
                    <ul className="pagination">
                        <li>
                            <button
                            disabled={pager.currentPage === 1 ? true : false}
                            onClick={() => this.setPage(1)}
                            >
                                    
                                    First
                            </button>
                        </li>
                        <li>
                            <button
                             disabled={pager.currentPage === 1 ? true : false}
                             onClick={() => this.setPage(pager.currentPage - 1)}
                            >
                                Prev
                            </button>
                        </li>
                        {pager.pages.map((page, index) => (
                            
                            <li key={index}>
                                <button
                                    className={pager.currentPage === page ? "active" : ""}
                                    onClick={() => this.setPage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                             disabled={pager.currentPage === pager.totalPages ? true : false}
                             onClick={() => this.setPage(pager.currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                        <li>
                            <button
                             disabled={pager.currentPage === pager.totalPages ? true : false}
                             onClick={() => this.setPage(pager.totalPages)}
                            >
                                Last
                            </button>
                        </li>
                    </ul>
                </div>

            </Provider>
        )
    }
}
const mapStateToProps = (state) => ({
    productNum: state.productNum
})
export default connect(mapStateToProps, { countProducts })(Pagination)