import Character from "./Character";

interface Position {
    row: number;
    column: number;

    onCharacterSettle(character: Character): void;

    
    get shortString() : string;
}

export default Position;