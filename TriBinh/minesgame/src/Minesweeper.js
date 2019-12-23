import React, { Component } from 'react';
import './App.css';
import './scss/index.scss'
import Board from './components/Board';
import BoardHead from './components/BoardHead';

class Minesweeper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "waiting", // waiting, running, ended
      rows:14,
      columns: 14,
      flags: 20,
      mines: 20,
      time: 0,
      openCells: 0
    }

    this.intervals = [];
  }


  componentDidUpdate(nextProps, nextState) {
    if (this.state.status === "running") {
      this.checkForWinner();
    }
  }

  resetGame = () => {
    this.intervals.map(clearInterval);
    this.setState({flags: 30, openCells: 0, status: "waiting", time: 0});
  }

  checkForWinner = () => {
    if (this.state.mines + this.state.openCells === this.state.rows * this.state.columns) {
      this.setState({
        status: "winner"
      }, alert("You Win"))
    }
  }

  tick = () => {
    if (this.state.status === "running") {
      let time=this.state.time + 1
      this.setState({ time });
    }
  };

  setInterval = (func, time) => {
    this.intervals.push(setInterval(func, time));
  }

  handleCellClick = () => {
    if(this.state.status === "waiting"){
      this.setState({status:"running"})
      this.setInterval(this.tick, 1000);
    }

    this.setState(prevState => {
      return { openCells: prevState.openCells + 1};
    })
  }

  endGame = () => {
    this.setState({
      status: "ended"
    });
  };

  changeFlagAmount = amount => {
    let flags = this.state.flags;
      flags += amount;
      this.setState({flags});
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>MINESWEEPER</h1>
        <BoardHead 
          time={this.state.time} 
          resetGame={this.resetGame}
          flagCount={this.state.flags}
          status={this.state.status} />
        
        <Board 
          number={this.state.number}
          rows={this.state.rows} 
          flagCount={this.state.flags}
          resetGame={this.resetGame}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handleCellClick} 
          endGame={this.endGame}
          status={this.state.status}
          changeFlagAmount={this.changeFlagAmount}/>
      </div>
    );
  }
}

export default Minesweeper;
