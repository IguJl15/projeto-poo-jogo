import Board from "../base/Board";
import Character from "../interfaces/Character";
import Position from "../interfaces/Position";
import Ligeirinho from "./Ligeirinho";
import Precavido from "./Precavido";

abstract class Characters {
    static characters: string[] = [
        "Ligeirinho", "Precavido"
    ];

    static getChar(index: number, board: Board, initialPosition: Position): Character {
        switch (Characters.characters[index]) {
            case "Ligeirinho":
                    return new Ligeirinho(board, initialPosition);
            case "Precavido":
                return new Precavido(board, initialPosition)        
            default:
                throw new Error("Method not implemented");
        }
    }
}

export default Characters;