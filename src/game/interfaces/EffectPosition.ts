import Position from "./Position";

interface EffectPosition extends Position {
    effectSteps: number;
    description: string;
}

export default EffectPosition;