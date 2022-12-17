import Board from "../base/Board";
import Position from "./Position";

abstract class Character {
    readonly name: string;
    readonly board: Board;
    position: Position;

    readonly moveForwardMultiplier: number;

    readonly jumpForwardMultiplier: number;
    readonly jumpBackwardMultiplier: number;

    constructor(name: string, board: Board, initialPosition: Position, moveForwardMultiplier: number, jumpForwardMultiplier: number, jumpBackwardMultiplier: number) {
        this.name = name;
        this.board = board;
        this.position = initialPosition;
        this.moveForwardMultiplier = moveForwardMultiplier;

        this.jumpForwardMultiplier = jumpForwardMultiplier;
        this.jumpBackwardMultiplier = jumpBackwardMultiplier;
    }

    moveForward(steps: number): number {
        steps = this.roundSteps(steps * this.moveForwardMultiplier)

        for (let i = 0; i < steps; i++) {
            this.position = this.position.nextPosition ? this.position.nextPosition : this.position;
        }

        this.onMoved();

        return steps;
    };

    public jump(steps: number): number {
        let modifier: number = 0;

        modifier = steps > 0 ?
            this.jumpForwardMultiplier :
            this.jumpBackwardMultiplier;

        steps = this.roundSteps(steps * modifier);

        if (steps > 0) return this.jumpForward(steps);
        if (steps < 0) return this.jumpBackward(-steps);

        return 0;
    }

    private jumpForward(steps: number): number {
        for (let i = 0; i < steps; i++) {
            this.position = this.position.nextPosition ? this.position.nextPosition : this.position;
        }
        return steps;
    }
    private jumpBackward(steps: number): number {
        for (let i = 0; i < steps; i++) {
            this.position = this.position.previousPosition ? this.position.previousPosition : this.position;
            
        }
        return steps;
    }

    protected roundSteps(steps: number): number {
        if (Math.trunc(steps) === 0) return steps < 0 ? -1 : 1;
        return Math.trunc(steps);
    };

    /// Function called after the character moves
    /// call super.onMoved() if overriding this method.
    onMoved(): void {
        // console.log(`${this.name} moved to ` + this.position);
        // console.log(`${this.name} moved to ${this.position}`
        //     + ` on board ${this.board}`);
    };
}

export default Character;
