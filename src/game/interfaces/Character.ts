import Board from "../base/Board";
import Position from "./Position";

abstract class Character {
    readonly name: string;
    readonly board: Board;
    position: number;

    readonly moveForwardMultiplier: number;

    readonly jumpForwardMultiplier: number;
    readonly jumpBackwardMultiplier: number;

    constructor(name: string, board: Board, position: number, moveForwardMultiplier: number, jumpForwardMultiplier: number, jumpBackwardMultiplier: number) {
        this.name = name;
        this.board = board;
        this.position = position;
        this.moveForwardMultiplier = moveForwardMultiplier;

        this.jumpForwardMultiplier = jumpForwardMultiplier;
        this.jumpBackwardMultiplier = jumpBackwardMultiplier;
    }

    moveForward(steps: number): void {
        this.position += this.roundSteps(steps * this.moveForwardMultiplier);
        this.onMoved();
    };

    public jump(steps: number): void {
        let modifier: number = 0;
        if(steps > 0) modifier = this.jumpForwardMultiplier;
        else if(steps < 0) modifier = this.jumpBackwardMultiplier;

        this.position += this.roundSteps(steps * modifier);

        if(this.position < 0) this.position = 0;
        if(this.position > this.board.totalPositions) this.position = this.board.totalPositions;
    }

    protected roundSteps(steps: number): number {
        if(Math.trunc(steps) === 0) return steps < 0 ? -1 : 1;
        return Math.trunc(steps);
    };

    /// Function called after the character moves
    /// call super.onMoved() if overriding this method.
    onMoved(): void {
        console.log(`${this.name} moved to ${this.position}`);
        // console.log(`${this.name} moved to ${this.position}`
        //     + ` on board ${this.board}`);
    };
}

export default Character;
