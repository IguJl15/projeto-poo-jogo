import Character from "../interfaces/Character";

class Player {
    constructor(
        public readonly name: string,
        public readonly character: Character,
    ) { }
}

export default Player;