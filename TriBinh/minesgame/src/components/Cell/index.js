import React from "react";

const Cell = props => {
  let cell = () => {
    if (props.data.isOpen) {
      if (props.data.hasMine) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            <span><i class="fas fa-bomb"></i></span>
          </div>
        );
      } else if (props.data.count === 0) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
            className={props.data.count === 1 ? "cell open one" :
            (props.data.count === 2 ? "cell open two" :
            ( props.data.count === 3 ? "cell open three" : "cell open four"))}
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
        return (
          <div
            className="cell open-flag"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          >
            <span><i class="fas fa-flag"></i></span>
          </div>
        );
    } else {
      if(props.flagCount > 0) {
        return (
          <div
            className="cell"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
          className="cell"
          onContextMenu={e => {
            e.preventDefault();
          }}
          onClick={() => props.open(props.data)}
        />
        )
      } 
    }
  };
  return cell();
};

export default Cell;