import React from 'react';

import GenericButton from './button';

let gameActive = true;
const boardSize = 3;
let gameStateTest = Array(boardSize).fill(null).map(() => Array(boardSize));
let counttictactoe = { "X": 0, "O": 0 };





class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: "X",
            status: "Start Game!!"
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.handleResultValidation = this.handleResultValidation.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.resetCells = this.resetCells.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
        // this will make all this functions be called with scope of your component object.
    }


    handleCellPlayedXY(clickedCell, clickedCellIndexX, clickedCellIndexY) {
        const { currentPlayer } = this.state
        gameStateTest[clickedCellIndexX][clickedCellIndexY] = currentPlayer;
        clickedCell.checked = false;
        clickedCell.innerHTML = currentPlayer;
    }

    handlePlayerChange() {
        this.setState((state) => ({ currentPlayer: state.currentPlayer === "X" ? "O" : "X" }));
        this.setState((state) => ({
            status: `It's ${state.currentPlayer}'s turn`
        }));
    };

    checkIfValidLine(_gameStateTest) {
        const { currentPlayer } = this.state;
        console.log(currentPlayer);
        let winline = 0;
        let windown = 0;
        for (let x = 0; x <= boardSize - 1; x += 1) {
            for (let y = 0; y <= boardSize - 1; y += 1) {

                    if (winline > 2 && y > 0) {
                        if (boardSize - 1 > y  && y > 0 && _gameStateTest[x][y] === _gameStateTest[x][y - 1] && _gameStateTest[x][y] === _gameStateTest[x][y + 1]) {
                            console.log("linea?");
                        } else if (y < 1 && _gameStateTest[x][y] === _gameStateTest[x][y + 1] && _gameStateTest[x][y] === _gameStateTest[x][y + 2]) {
                            console.log("linea?");
                        } else if (boardSize - 1 > y  && _gameStateTest[x][y] === _gameStateTest[x][y - 1]) {
                            console.log("linea?");
                        }
                    } else {
                        winline += 1;
                    }
                if (windown > 2 && x > 0) {
                    if (boardSize - 1 > x  && x > 0 && _gameStateTest[x][y] === _gameStateTest[x - 1][y] && _gameStateTest[x][y] === _gameStateTest[x + 1][y]) {
                        console.log("horizontal?");
                    } else if (x < 1 && _gameStateTest[x][y] === _gameStateTest[x + 1][y] && _gameStateTest[x + 2][y] === _gameStateTest[x][y]) {
                        console.log("horizontal?");
                    } else if (boardSize - 1 > x  && _gameStateTest[x][y] === _gameStateTest[x - 1][y]) {
                        console.log("horizontal?");
                    }
                } else {
                    windown += 1;
                }
            }

        }

    };

    handleResultValidation(clickedCell) {
        const { currentPlayer } = this.state;

        for (let x = 0; x <= boardSize - 1; x += 1) {

            for (let y = 0; y <= boardSize - 1; y += 1) {

                if (!clickedCell.checked && gameStateTest[x][y] === currentPlayer) {
                    clickedCell.checked = true;
                    counttictactoe[currentPlayer] += 1;
                    if (counttictactoe[currentPlayer] >= 3) {
                        this.checkIfValidLine(gameStateTest);
                    }
                }

            }
        }


        this.handlePlayerChange();
    };

    handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndexX = parseInt(clickedCell.getAttribute('coorx'), 10);
        const clickedCellIndexY = parseInt(clickedCell.getAttribute('coory'), 10);
        if (gameActive) {
            // this.handleCellPlayed(clickedCell, clickedCellIndex);
            this.handleCellPlayedXY(clickedCell, clickedCellIndexX, clickedCellIndexY);
            this.handleResultValidation(clickedCell);
        }
    };

    resetCells(cell) {
        this.cell = cell;
        this.cell.innerHTML = "";

    }

    handleRestartGame() {
        gameActive = true;
        gameStateTest = Array(boardSize).fill(null).map(() => Array(boardSize));
        counttictactoe = { "X": 0, "O": 0 };
        this.setState(() => ({
            currentPlayer: "X",
            status: `Start Game!!`
        }));
        document.querySelectorAll('.cell').forEach(cell => this.resetCells(cell));
    };



    render() {
        const { status } = this.state;
        return (
            <>
                <h1 className="game--title">Tic Tac Toe</h1>
                <div className="game--container">
                    {[...Array(boardSize).keys()].map((index, i) => (
                        [...Array(boardSize).keys()].map((indexz, z) => (
                            <button type="button" coorx={i} coory={z} data-cell-index={i} key={`${indexz}-index`} className="cell" onClick={this.handleCellClick} />
                        ))
                    ))}

                </div>
                <h2 className="game--status">{status}</h2>
                <GenericButton className="game--restart" handleClick={this.handleRestartGame} />
            </>
        );
    }
}

export default Game
