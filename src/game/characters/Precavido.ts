import Board from "../base/Board";
import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class Precavido extends Character {
    constructor(board: Board, initialPosition: Position) {
        super("Precavido", board, initialPosition,
            0.75, 1.5, 0.5)
    }    
}

export default Precavido;