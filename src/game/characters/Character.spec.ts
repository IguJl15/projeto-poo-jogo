import assert from "node:assert";
import { describe, it } from "node:test";
import Board from "../base/Board";
import Ligeirinho from "./Ligeirinho";

describe("test characters", () => {
    const board = new Board(0, 0, []);

    describe("Ligeirinho", () => {
        it("should be a character", () => {
            const initialPosition = 0;
            const ligeirinho = new Ligeirinho(board, initialPosition);

            assert.equal(ligeirinho.name, "Ligeirinho");
            assert.ok(ligeirinho);
        });

        it("should move into the right proportion", () => {

            const initialPosition = 0;
            const movements = [2, 4, 6, 1, 3, 5];
            const positions = [3, 9, 18, 19, 23, 30];

            const ligeirinho = new Ligeirinho(board, initialPosition);

            for (const round in movements) {
                ligeirinho.moveForward(movements[round]);
                assert.equal(ligeirinho.position, positions[round]);
            }
        });
        
        it("should jump into the right proportion", () => {

            const initialPosition = 10;
            const jumps = [+2, -2, +1, -1, +3, -2];
            const positions = [11, 7, 8, 6, 7, 3];

            const ligeirinho = new Ligeirinho(board, initialPosition);

            for (const round in jumps) {
                console.log(round);
                
                ligeirinho.jump(jumps[round]);
                assert.equal(ligeirinho.position, positions[round]);
            }
        });
    });
})