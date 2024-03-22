import Square from "./Square";
import calculateWinner from "./helper/calculateWinner";

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  
    const result = calculateWinner(squares);
    let status;
    if (result && result.winner === 'draw') {
      status = 'It\'s a draw!';
    } else if (result && result.winner) {
      status = 'Winner: ' + result.winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    const renderSquare = (i) => {
      const isWinningSquare = result && result.line && result.line.includes(i);
      return (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          highlight={isWinningSquare}
        />
      );
    };
  
    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          {[0, 1, 2].map(renderSquare)}
        </div>
        <div className="board-row">
          {[3, 4, 5].map(renderSquare)}
        </div>
        <div className="board-row">
          {[6, 7, 8].map(renderSquare)}
        </div>
      </>
    );
  }
  