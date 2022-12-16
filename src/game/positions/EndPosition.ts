import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class EndPosition implements Position {
    static shortString: string = "EE";
    
    constructor(
        public row: number,
        public column: number
    ) { }

    onCharacterSettle(character: Character): void {
        return;
    }

    get shortString(): string {
        return EndPosition.shortString;
    }
}

export default EndPosition;