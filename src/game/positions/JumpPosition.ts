import Character from "../interfaces/Character";
import EffectPosition from "../interfaces/EffectPosition";
import Position from "../interfaces/Position";
import Player from "../player/Player";

class JumpPosition implements EffectPosition {
    private next?: Position;
    private previous?: Position;
    public description: string;

    constructor(
        public row: number,
        public column: number,
        public effectSteps: number,
    ) {
        this.description = effectSteps > 0 ?
            `Você avança ${effectSteps} casas` :
            `Você retorna ${-effectSteps} casas`;
    }

    set nextPosition(v: Position | undefined) { this.next = v; }
    get nextPosition(): Position | undefined { return this.next; }
    set previousPosition(v: Position | undefined) { this.previous = v; }
    get previousPosition(): Position | undefined { return this.previous; }

    onCharacterSettle(character: Character): number {
        return character.jump(this.effectSteps);
    }

    get shortString(): string {
        return (this.effectSteps >= 0 ? 'F' : 'B') + this.effectSteps;
    }

    beautyString(players: Player[]): string {

        let effectStr: string = Math.abs(this.effectSteps).toString();
        effectStr = "0" + effectStr;
        effectStr = this.effectSteps > 0 ? "+" + effectStr : "-" + effectStr;
        effectStr = effectStr.substring(effectStr.length - 3);

        const p1 = players[0] ? players[0].name.substring(0, 2) : "  ";
        const p2 = players[1] ? players[1].name.substring(0, 2) : "  ";
        const p3 = players[2] ? players[2].name.substring(0, 2) : "  ";
        const p4 = players[3] ? players[3].name.substring(0, 2) : "  ";

        return `+-(${effectStr})-+\n` +
            `  ${p1} ${p2}  \n` +
            `  ${p3} ${p4}  \n` +
            '+-------+';
    }
}

export default JumpPosition;