import Position from "../interfaces/Position";
import StartPosition from "../positions/StartPosition";

class Board {
    totalRows: number;
    totalColumns: number;
    private positions: Position[];
    readonly initialPosition: Position;
    
    constructor(totalRows: number, totalColumns: number, positions: Position[]) {
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        this.positions = positions;
        this.initialPosition = positions.find((position: Position) => position instanceof StartPosition)!;
    }

    getPosition(row: number, column: number): Position {
        return this.positions[row * this.totalColumns + column];
    }

    getPositionByindex(index: number): Position {
        return this.positions[index];
    }

    getPositionIndex(position: Position) {
        return position.row * this.totalColumns + position.column;
    }
}

export default Board;