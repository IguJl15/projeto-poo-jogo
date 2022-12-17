import Character from "../interfaces/Character";
import Position from "../interfaces/Position";
import Player from "../player/Player";

class EmptyPosition implements Position {
    static shortString: string = "00";
    private readonly next?: Position = undefined;
    private readonly previous?: Position = undefined;

    constructor(
        public row: number,
        public column: number
    ) { }

    set nextPosition(v: Position | undefined) { }
    get nextPosition(): Position | undefined { return this.next; }
    set previousPosition(v: Position | undefined) { }
    get previousPosition(): Position | undefined { return this.previous; }

    onCharacterSettle(character: Character): void {
        throw new Error("Player can't settle on empty position");
    }

    get shortString(): string {
        return EmptyPosition.shortString;
    }
    beautyString(players: Player[]): string {

        return '      -  \n' +
            ' -       \n' +
            '     -   \n' +
            '+ -      ';
    }
}

export default EmptyPosition;