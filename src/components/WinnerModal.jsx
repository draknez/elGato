
import { Square } from './Square.jsx'

// eslint-disable-next-line react/prop-types
export function WinnerModal({ winner, resetGame }) {
    // renderizado condicional
    if (winner == null) return null

    const winnerText = winner == false ? 'Empate' : 'Ganador'

    return (
        <section className='winner' >
            <div className='text'>
                <h2>{winnerText}</h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Otra partida</button>
                </footer>
            </div>
        </section>
    )
}

