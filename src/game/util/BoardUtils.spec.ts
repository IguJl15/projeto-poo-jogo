import assert from "assert";
import { writeFileSync } from "fs";
import { describe, it } from "node:test";
import { resolve } from "path";
import * as tmp from "tmp";
import EmptyPosition from "../positions/EmptyPosition";
import EndPosition from "../positions/EndPosition";
import JumpPosition from "../positions/JumpPosition";
import PathPosition from "../positions/PathPosition";
import StartPosition from "../positions/StartPosition";
import BoardUtils from "./BoardUtils";

// tmp.setGracefulCleanup();

describe("test board utils success cases", () => {
  const tmpFile = tmp.fileSync({});
  const tmpFileContent = `00SSPPF3B2PPEE00`;
  writeFileSync(tmpFile.name, tmpFileContent);

  const board = BoardUtils.loadLevelFromFile(tmpFile.name)

  it("should create a board", () => {
    assert.ok(board);
  });

  it("should have the right number of positions", () => {
    assert.equal(board.positions.length, 8);
  });

  it("each Position object should be parsed correctly", () => {
    assert.equal(board.positions[0] instanceof EmptyPosition, true);
    assert.equal(board.positions[1] instanceof StartPosition, true);
    assert.equal(board.positions[2] instanceof PathPosition, true);
    assert.equal(board.positions[3] instanceof JumpPosition, true);
    assert.equal(board.positions[4] instanceof JumpPosition, true);
    assert.equal(board.positions[6] instanceof EndPosition, true);
    assert.equal(board.positions[7] instanceof EmptyPosition, true);
  });
  
  it("position column should be sequential", () => {
    assert.equal(board.positions[0].column, 0);
    assert.equal(board.positions[1].column, 1);
    assert.equal(board.positions[2].column, 2);
    assert.equal(board.positions[3].column, 3);
    assert.equal(board.positions[4].column, 4);
    assert.equal(board.positions[6].column, 6);
    assert.equal(board.positions[7].column, 7);
  });

  it("JumpPosition should point to the correct direction", () => {
    assert.equal((board.positions[3] as JumpPosition).effectDirection, "forward")
    assert.equal((board.positions[4] as JumpPosition).effectDirection, "backward")
  });


})

describe("test board utils failure cases", () => {
  const tmpFile = tmp.fileSync({});
  const tmpFileContent = `00SSPPF3B2PPEE00`;

  it("should throw a InvalidFile Exception if the file has invalid data", () => {
    writeFileSync(tmpFile.name, tmpFileContent + "!");
    //                                             \ wrong character (!)

    assert.throws(() => {
      BoardUtils.loadLevelFromFile(tmpFile.name);
    }, {
      value: resolve(tmpFile.name),
      row: 0,
      column: 0
    });
  });

  it("should throw a FileNotFound Exception if the file does not exists", () => {
    assert.throws(() => {
      BoardUtils.loadLevelFromFile("foo");
    }, {
      value: "foo",
      row: 0,
      column: 0
    });
  });
});