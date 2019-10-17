import React from 'react';
import ItemEntry from '../components/ItemEntry';

class Paging extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: this.props.itemList,
            currentPage: 1,
            totalPage: 1,
            pageList: null,
            entryPerPage: 5
        }

        this.divideIntoPages = this.divideIntoPages.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);
        this.renderNumberNavigation = this.renderNumberNavigation.bind(this);
    }

    componentDidMount() {
        if (this.state.itemList) 
            this.divideIntoPages();
    }

    divideIntoPages() {
        let tmp = this.state.itemList;
        let tmpPageList = [], pageIdx = 0, tmpPage = {};
        let finalPageList = [];
        let numberOfEntry = this.state.entryPerPage;
        if (tmp.length === 0) {
            tmpPage = {index: 1, content: []};
            finalPageList.push(tmpPage);
            pageIdx = 1;
            this.setState({totalPage: pageIdx, pageList: finalPageList})
        }
        else {
            while (tmp.length > 0) {
                pageIdx++;
                for (var i = 0; i < numberOfEntry; i++) {
                    if (tmp[i])
                        tmpPageList.push(tmp[i]);
                    else break;
                }

                tmpPage = {index: pageIdx, content: tmpPageList};
                finalPageList.push(tmpPage);
                tmpPageList = [];
                tmp.splice(0, numberOfEntry);
            }
            this.setState({totalPage: pageIdx, pageList: finalPageList})
        }
    }

    renderPage(e) {
        if (this.state.pageList !== null) {
            return (
                <div>
                    {(this.state.pageList[this.state.currentPage - 1].content.map(el => {
                        return <ItemEntry item={el} renderButton={this.props.renderButton} onClickDelete={this.props.onClickDelete} onClickEdit={this.props.onClickEdit} key={Math.random()} />
                    }))}
                </div>
            )
        }
    }

    renderNumberNavigation(e) {
        return (
            <div>
                <div>
                    <span>
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: 1})
                            }}>1</button>
                        {(this.state.currentPage === 1) ? (
                            <button type="button" className="btn btn-default" 
                                onClick={e => {
                                    this.setState({currentPage: 2})
                                }}>{2}</button>
                        ) : (<span></span>)}
                        ...
                    </span>
                    {(this.state.currentPage >= 2 && this.state.currentPage <= this.state.totalPage - 1) ? 
                        (<span>
                            {(this.state.currentPage === 2) ? (<span></span>) : (
                                <button type="button" className="btn btn-default" 
                                    onClick={e => {
                                        this.setState({currentPage: this.state.currentPage - 1})
                                    }}>{this.state.currentPage - 1}</button>
                            )}
                            

                            <button type="button" className="btn btn-default" 
                                onClick={e => {
                                    this.setState({currentPage: this.state.currentPage})
                                }}>{this.state.currentPage}</button>


                            {(this.state.currentPage === this.state.totalPage - 1) ? (<span></span>) : (
                                <button type="button" className="btn btn-default" 
                                    onClick={e => {
                                        this.setState({currentPage: this.state.currentPage + 1})
                                    }}>{this.state.currentPage + 1}</button>
                            )}
                            

                        </span>) :
                        (<span></span>)
                    }
                    <span>
                        ...
                        {(this.state.currentPage === this.state.totalPage - 1) ? (<span></span>) : (
                            <button type="button" className="btn btn-default" 
                                onClick={e => {
                                    this.setState({currentPage: this.state.totalPage - 1})
                                }}>{this.state.totalPage - 1}</button>
                        )}
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: this.state.totalPage})
                            }}>{this.state.totalPage}</button>
                    </span>
                </div>
            </div>
        )
    }

    renderNavigation(e) {
        return (
            <div>
                <div>
                    {`Showing page ${this.state.currentPage} of total ${this.state.totalPage} pages`}
                </div>
                <div>
                    <span>
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: 1})
                            }}>{'<<'}</button>
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: (this.state.currentPage === 1) ? (1) : (this.state.currentPage - 1)})
                            }}>{'<'}</button>
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: (this.state.currentPage === this.state.totalPage) ? (this.state.totalPage) : (this.state.currentPage + 1)})
                            }}>{'>'}</button>
                        <button type="button" className="btn btn-default" 
                            onClick={e => {
                                this.setState({currentPage: this.state.totalPage})
                            }}>{'>>'}</button>
                    </span>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>{' '}</h2>
                <div>{this.renderNavigation()}</div>
                <div>{this.renderPage()}</div>
                <div>{this.renderNumberNavigation()}</div>
            </div>
        )
    }
}

export default Paging;
