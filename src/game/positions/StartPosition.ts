import Character from "../interfaces/Character";
import Position from "../interfaces/Position";
import Player from "../player/Player";

class StartPosition implements Position {
    static shortString: string = "SS";
    private next?: Position;
    private readonly previous?: Position = undefined;

    constructor(
        public row: number,
        public column: number,
    ) { }

    set nextPosition(v: Position | undefined) {
        this.next = v;
    }
    get nextPosition(): Position | undefined {
        return this.next;
    }
    set previousPosition(v: Position | undefined) { }
    get previousPosition(): Position | undefined {
        return this.previous;
    }

    onCharacterSettle(character: Character): void {
        return;
    }

    get shortString(): string {
        return StartPosition.shortString;
    }

    beautyString(players: Player[]): string {
        let p1 = players[0] ? players[0].name.substring(0, 2) : "  ";
        let p2 = players[1] ? players[1].name.substring(0, 2) : "  ";
        let p3 = players[2] ? players[2].name.substring(0, 2) : "  ";
        let p4 = players[3] ? players[3].name.substring(0, 2) : "  ";
        return '+-START-+\n' +
            `| ${p1} ${p2}  \n` +
            `| ${p3} ${p4}  \n` +
            '+-------+';
    }

}

export default StartPosition;