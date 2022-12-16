import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class PathPosition implements Position {
    static shortString: string = "PP";
    
    constructor(
        public row: number,
        public column: number
    ) { }

    onCharacterSettle(character: Character): void {
        return;
    }

    get shortString(): string {
        return PathPosition.shortString;
    }
}

export default PathPosition;