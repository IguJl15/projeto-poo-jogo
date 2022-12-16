import Position from "./Position";

interface EffectPosition extends Position {
    effectSteps: number;
    effectDirection: 'forward' | 'backward';
}

export default EffectPosition;