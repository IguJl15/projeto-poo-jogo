import Character from "../interfaces/Character";
import Position from "../interfaces/Position";
import Player from "../player/Player";

class EndPosition implements Position {
    static shortString: string = "EE";
    private readonly next?: Position = undefined;
    private previous?: Position;

    constructor(
        public row: number,
        public column: number,
    ) { }

    set nextPosition(v: Position | undefined) { }
    get nextPosition(): Position | undefined { return this.next; }
    set previousPosition(v: Position | undefined) { this.previous = v; }
    get previousPosition(): Position | undefined { return this.previous; }

    onCharacterSettle(character: Character): void {
        return;
    }

    get shortString(): string {
        return EndPosition.shortString;
    }

    beautyString(players: Player[]): string {
        const p1 = players[0] ? players[0].name.substring(0, 2) : "  ";
        const p2 = players[1] ? players[1].name.substring(0, 2) : "  ";
        const p3 = players[2] ? players[2].name.substring(0, 2) : "  ";
        const p4 = players[3] ? players[3].name.substring(0, 2) : "  ";

        return '+--END--+\n' +
            `  ${p1} ${p2} |\n` +
            `  ${p3} ${p4} |\n` +
            '+-------+';
    }
}

export default EndPosition;