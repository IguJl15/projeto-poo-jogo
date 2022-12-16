import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import Board from "../base/Board";
import EmptyPosition from "../positions/EmptyPosition";
import EndPosition from "../positions/EndPosition";
import StartPosition from "../positions/StartPosition";
import { BoardParserException, FileNotFound, InvalidFile, UnexpectedException, ValueError } from "./errors/Exceptions";
import JumpPosition from "../positions/JumpPosition";
import PathPosition from "../positions/PathPosition";


abstract class BoardUtils {
    private constructor() { }

    public static fromFile(path: string) {
        try {
            if (!existsSync(path)) throw new FileNotFound(path, 0, 0);

            var file = readFileSync(resolve(path), "utf8");

            if (file.length % 2 != 0) throw new InvalidFile(path, 0, 0);

            return this.fromString(file);
        }
        catch (error) {
            if (error instanceof ValueError) throw error;
            if (error instanceof FileNotFound) throw error;
            if (error instanceof InvalidFile) throw error;

            throw new UnexpectedException(path, 0, 0);
        }
    };
    private static fromString(file: string) {
        let lines = file.split('\n');

        let board = new Board(lines.length, lines[0].length, []);

        // Board columns and row
        for (let row = 0; row < lines.length; row++) {
            for (let column = 0; column < lines[row].length / 2; column++) {
                // Each position on file is represented by two characters
                const textPosition = column * 2;
                const stringPair = lines[row].substring(textPosition, textPosition + 2);

                board.positions.push(this.parsePosition(stringPair, row, column));
            }
        }

        return board;
    };
    private static parsePosition(stringPair: string, row: number, column: number) {
        // Base positions (Empty, start, path, end)
        switch (stringPair) {
            case EmptyPosition.shortString:
                return new EmptyPosition(row, column);
            case StartPosition.shortString:
                return new StartPosition(row, column);
            case PathPosition.shortString:
                return new PathPosition(row, column);
            case EndPosition.shortString:
                return new EndPosition(row, column);
        }

        // Jump positions
        if (Number(stringPair[1.])) {
            switch (stringPair[0]) {
                case "F":
                    return new JumpPosition(row, column, Number(stringPair[1]), "forward");
                case "B":
                    return new JumpPosition(row, column, Number(stringPair[1]), "backward");
            }
        }
        throw new ValueError(stringPair, row, column);
    };
    public static toString(board: Board) {
        var str = '';
        for (var row = 0; row < board.totalRows; row++) {
            for (var column = 0; column < board.totalColumns; column++) {
                var position = board.getPosition(row, column);
                str += position.shortString;
            }
            str += '\n';
        }
        return str;
    }
}

export default BoardUtils;
