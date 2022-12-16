import Character from "../interfaces/Character";
import EffectPosition from "../interfaces/EffectPosition";

class JumpPosition implements EffectPosition {
    constructor(
        public row: number,
        public column: number,
        public effectSteps: number,
        public effectDirection: 'forward' | 'backward'
    ) { }

    onCharacterSettle(character: Character): void {
        return this.effectDirection === 'forward' ?
            character.jump(this.effectSteps) :
            character.jump(- this.effectSteps);
    }

    get shortString(): string {
        return (this.effectDirection === 'forward' ? 'F' : 'B') + this.effectSteps;
    }
}

export default JumpPosition;