import Board from "../base/Board";
import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class Ligeirinho extends Character {
    constructor(board: Board, initialPosition: number) {
        super("Ligeirinho", board, initialPosition,
            1.5, 0.50, 2.0)
    }    
}

export default Ligeirinho;