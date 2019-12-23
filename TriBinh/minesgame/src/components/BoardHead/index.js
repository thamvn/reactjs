import React from 'react';

const BoardHead = (props) => {
    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes * 60 || 0;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = `${minutes}:${seconds}`;
     let status = props.status === "running" ? (
        <i class="fas fa-globe fa-spin"></i>
    ) : ( props.status === "waiting" ? (
        <i class="fas fa-globe"></i>
    ) : (
        <i class="fas fa-heart-broken"></i>
    ));

    return (
        <div className="board-head">
            <div className="flag-count">
                {props.flagCount}<i class="fas fa-flag"></i>
            </div>
             <button className="reset" onClick={props.resetGame}>{status}</button>
            <div className="timer">{time}</div>
        </div>
    );
};

export default BoardHead;