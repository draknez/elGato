// Objetivo: lógica del tablero
// se importa la constante WINNER_COMBO del archivo constants.js para poder usarla en esta lógica
import { WINNER_COMBO } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBO) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] == boardToCheck[b] &&
            boardToCheck[a] == boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    // si no hay ganador
    return null
}