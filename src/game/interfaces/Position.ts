import Player from "../player/Player";
import Character from "./Character";

interface Position {
    row: number;
    column: number;

    onCharacterSettle(character: Character): number | void;

    get shortString() : string;
    beautyString(players?: Player[]) : string;

    
    set nextPosition(v : Position | undefined);
    get nextPosition(): Position | undefined;
    set previousPosition(v : Position | undefined);
    get previousPosition(): Position | undefined;
    
}

export default Position;