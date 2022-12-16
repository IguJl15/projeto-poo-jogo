import Position from "../interfaces/Position";

class Board {
    totalRows: number;
    totalColumns: number;
    totalPositions: number;
    positions: Position[];
    
    constructor(totalRows: number, totalColumns: number, positions: Position[]) {
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        this.totalPositions = totalRows * totalColumns;
        this.positions = positions;
    }

    getPosition(row: number, column: number): Position {
        return this.positions[row * this.totalColumns + column];
    }
    
}

export default Board;