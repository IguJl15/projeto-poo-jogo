import Character from "../interfaces/Character";
import Position from "../interfaces/Position";

class StartPosition implements Position {
    static shortString: string = "SS";

    constructor(
        public row: number,
        public column: number
    ) { }

    onCharacterSettle(character: Character): void {
        return;
    }
    
    get shortString() : string {
        return this.shortString;
    }
    
}

export default StartPosition;