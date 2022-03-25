import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {

    return (
      <button className="square"
      onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );  
}

const Board = ({squares, onClick}) => {

  const renderSquare=(i)=> {
    return (
      <Square 
        value={squares[i]}
        onClick={ () => onClick(i)}
      />);
  }

    return (
      <div className='subcontainer-board'>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

const FunctionalGame = (props) => {

  const [history, setHistory] = useState([{squares : Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) =>{
    const localHistory = history.slice(0, stepNumber + 1);
    const current = localHistory[localHistory.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares)|| squares[i]){
      return;
    }
    squares[i] = xIsNext? 'X': 'O';
    setHistory([...localHistory, {squares}]);
    setStepNumber(localHistory.length);
    setXIsNext(!xIsNext);

  }

  const jumpTo = (step) =>{
    setStepNumber(step);
    setXIsNext((step%2)===0);
  }

    const localHistory = history;
    const current = localHistory[stepNumber]
    const winner = calculateWinner(current.squares);
    const moves = localHistory.map((step, move)=>{
      const desc = move? 'Ir al movimiento #'+move : 'Incio del juego';
      return(
        <li key={move}>
          <button onClick={()=> jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status = '';
    if(winner){
      status = 'Ganador: ' + winner;
    }else{
      status = 'Próximo judador: ' + (xIsNext? 'X': 'O');
    }
    return (
      <div className="game">
        <div className='header-info'>{ status }</div>
        <div className='game-secondary'>
        <div className="game-board">
          <Board 
            squares={ current.squares}
            onClick = { handleClick}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
        </div>
      </div>
    );
  
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  < FunctionalGame />,
  document.getElementById('root')
);