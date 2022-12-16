import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class EmptyPosition implements Position {
    static shortString: string = "00";
    
    constructor(
        public row: number,
        public column: number
    ) { }

    onCharacterSettle(character: Character): void {
        throw new Error("Player can't settle on empty position");
    }

    get shortString(): string {
        return EmptyPosition.shortString;
    }
}

export default EmptyPosition;