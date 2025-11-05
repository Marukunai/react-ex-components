import React, { useState } from 'react';
import Square from './Square';

// Funció externa per detectar el guanyador
function calculateWinner(squares) {
    // Totes les combinacions guanyadores possibles (files, columnes, diagonals)
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Files
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnes
        [0, 4, 8], [2, 4, 6],           // Diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Retorna 'X' o 'O'
        }
    }
    return null; // No hi ha guanyador
}

function Board() {
    // 1. Estat del Tauler (Array de 9 elements: null, 'X' o 'O')
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    // 2. Estat del Torn (Comença la 'X')
    const [xIsNext, setXIsNext] = useState(true);

    // Gestor de clic d'una casella
    const handleClick = (i) => {
        const winner = calculateWinner(squares);
        
        // 🅰️ Guardrails: Si ja hi ha guanyador o la casella està plena, ignora el clic
        if (winner || squares[i]) {
            return;
        }

        // 🅱️ Creació d'una còpia de l'array per a la immutabilitat
        const nextSquares = squares.slice(); 
        
        // 🇨 Actualització de la casella i el torn
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        
        setSquares(nextSquares);
        setXIsNext(!xIsNext); // Alterna el torn
    };

    // Funció per crear una casella (renderitzat DRY - Don't Repeat Yourself)
    const renderSquare = (i) => {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => handleClick(i)}
            />
        );
    };
    
    // Determinació de l'estat del joc
    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null); // Empat: no hi ha guanyador i totes plenes
    
    let status;
    if (winner) {
        status = `Guanyador: ${winner} 🎉`;
    } else if (isDraw) {
        status = `Empat! 🤝`;
    } else {
        status = `Torn de: ${xIsNext ? 'X' : 'O'}`;
    }

    // Funció per reiniciar el joc
    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div className="game-board-container">
            <div className={`game-status ${winner ? 'status-winner' : isDraw ? 'status-draw' : ''}`}>
                {status}
            </div>
            
            {/* NOU CONTENIDOR PER A TAULER I BOTÓ */}
            <div className="board-and-reset"> 
                <div className="board">
                    <div className="board-row">
                        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
                    </div>
                </div>
                
                {(winner || isDraw) && (
                    <button onClick={resetGame} className="btn-reset">
                        Reiniciar Joc
                    </button>
                )}
            </div> {/* FINAL DEL NOU CONTENIDOR */}
        </div>
    );
}

export default Board;