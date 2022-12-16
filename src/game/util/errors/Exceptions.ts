interface BoardParserException {
    value: string;
    row: number;
    column: number;
}

class InvalidFile implements BoardParserException {
    constructor(public value: string, public row: number, public column: number) { }
}

class FileNotFound implements BoardParserException {
    constructor(public value: string, public row: number, public column: number) { }
}

class ValueError implements BoardParserException {
    constructor(
        public value: string, public row: number, public column: number
    ) { }
}

class UnexpectedException implements BoardParserException {
    constructor(
        public value: string, public row: number, public column: number,
        public error?: string
    ) { }
}

export { BoardParserException, UnexpectedException, ValueError, InvalidFile, FileNotFound };