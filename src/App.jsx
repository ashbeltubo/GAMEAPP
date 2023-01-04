import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import Status_message from './components/Status_message';
import { calculateWinner } from './winner';
import './styles/main.scss';
import logo from './images/logo.png';

const New_game = [{ board: Array(9).fill(null), isXnext: true }];
const App = () => {
  const [history, update_history] = useState(New_game);
  const [currentmove, set_currentmove] = useState(0);

  const curr = history[currentmove];

  const { winner, winningSquare } = calculateWinner(curr.board);

  const handlesquareclick = position => {
    if (curr.board[position] || winner) return;

    update_history(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXnext ? 'O' : 'X';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXnext: !last.isXnext });
    });
    set_currentmove(prev => prev + 1);
  };

  const moveTo = move => {
    set_currentmove(move);
  };

  const onNew_game = () => {
    update_history(New_game);
    set_currentmove(0);
  };

  return (
    <div className="app">
      <img src={logo} className="background"></img>
      <h1>
        {' '}
        <span className="text-green"> Tic </span>{' '}
        <span className="text-purple"> Tac </span>{' '}
        <span className="text-green"> Toe </span>{' '}
      </h1>
      <Status_message winner={winner} curr={curr} />
      <Board
        board={curr.board}
        handlesquareclick={handlesquareclick}
        winningSquare={winningSquare}
      />
      <button
        type="button"
        onClick={onNew_game}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        {' '}
        Start new Game{' '}
      </button>
      <h2>
        {' '}
        <span className="text-purple">APPLICATION DEVELOPMENT</span>{' '}
      </h2>
      <History history={history} moveTo={moveTo} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
