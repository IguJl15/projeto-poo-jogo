import { existsSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import Board from "../base/Board";
import EmptyPosition from "../positions/EmptyPosition";
import EndPosition from "../positions/EndPosition";
import StartPosition from "../positions/StartPosition";
import { BoardParserException, FileNotFound, InvalidFile, UnexpectedException, ValueError } from "./errors/Exceptions";
import JumpPosition from "../positions/JumpPosition";
import PathPosition from "../positions/PathPosition";
import Position from "../interfaces/Position";

const CHARACTERS_PER_POSITION = 2;

abstract class BoardUtils {

    private constructor() { }

    public static listAllLevels(): string[] {
        const levelsPath = resolve(__dirname, "../../levels");
        const levelsDirectory = existsSync(levelsPath) ? readdirSync(levelsPath) : [];

        return levelsDirectory.filter(level => level.endsWith(".level"));
    }

    public static loadLevelFromFile(path: string): Board {
        try {
            path = resolve(__dirname, "../../levels", path);

            if (!existsSync(path)) throw new FileNotFound(path, 0, 0);

            var file = readFileSync(resolve(path), "utf8");

            // if (file.length % 2 != 0) throw new InvalidFile(path, 0, 0);

            return this.fromString(file);
        }
        catch (error) {
            if (error instanceof ValueError) throw error;
            if (error instanceof FileNotFound) throw error;
            if (error instanceof InvalidFile) throw error;

            if (error instanceof Error) throw new UnexpectedException(path, 0, 0, `${error.message}\n${error.stack}`);

            throw new UnexpectedException(path, 0, 0, `${error}`);
        }
    };
    private static fromString(file: string): Board {
        let lines = file.split('\n');
        const rows = lines.length;
        const columns = lines[0].length / CHARACTERS_PER_POSITION;

        const positions: Position[] = [];


        // Board columns and row
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                // Each position on file is represented by two characters
                const textPosition = column * 2;
                const stringPair = lines[row].substring(textPosition, textPosition + CHARACTERS_PER_POSITION);

                const newPosition = this.parsePosition(stringPair, row, column);

                if (column > 0) {
                    newPosition.previousPosition = positions[positions.length - 1];
                    positions[positions.length - 1].nextPosition = newPosition;
                }

                positions.push(newPosition);
            }
        }

        let board = new Board(rows, columns, positions);

        return board;
    };
    private static parsePosition(stringPair: string, row: number, column: number): Position {
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
        if (Number(stringPair[1])) {
            switch (stringPair[0]) {
                case "F":
                    return new JumpPosition(row, column, Number(stringPair[1]));
                case "B":
                    return new JumpPosition(row, column, -Number(stringPair[1]));
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
