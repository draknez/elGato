import { useState } from 'react'
import confetti from 'canvas-confetti'
//componetizando 
import { Square } from './components/Square.jsx'

// importando constantes, tambien se pueden importar archivos js
import { TURNS } from './constants.js'

// checkear ganador
import { checkWinnerFrom } from './logic/board.js'

// winner modal
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'


function App() {

  // tablero se ustiliza useState que permite modificar el estado de la variable

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // ganador
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es que hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    // no actualizar si ya hay un valor
    if (board[index] || winner) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar la jugada
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })


    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(newBoard)) {
      // revisar si hay empate
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>El Gato</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
