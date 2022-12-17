import chalk from "chalk";
import Board from "./base/Board";
import { default as Dice, default as SixSidesDice } from "./base/SixSidesDice";
import Characters from "./characters/Characters";
import EffectPosition from "./interfaces/EffectPosition";
import Position from "./interfaces/Position";
import Player from "./player/Player";
import EmptyPosition from "./positions/EmptyPosition";
import EndPosition from "./positions/EndPosition";
import JumpPosition from "./positions/JumpPosition";
import PathPosition from "./positions/PathPosition";
import StartPosition from "./positions/StartPosition";
import BoardUtils from "./util/BoardUtils";
import { askEnter, askEnterFor, askInput, askNumber } from "./util/InputUtils";


class Game {
    public board!: Board;
    public players!: Player[];
    public currentPlayer!: Player;
    public dice: Dice = new SixSidesDice();

    start(): void {

        console.log(chalk.green("BEM VINDO AO BOAR GAME"));
        // console.log("-------------------");
        console.log("");

        const levels = BoardUtils.listAllLevels();

        const selectedLevel = this.selectLevel(levels);
        this.board = BoardUtils.loadLevelFromFile(selectedLevel);

        const playersCount = askNumber("Quantos players jogarão desta vez? (2-4) ", [2, 3, 4]);
        this.players = this.createPlayers(playersCount, this.board.initialPosition);

        this.currentPlayer = this.determineFirstPlayer();

        askEnterFor("iniciar o jogo...");

        console.log(chalk.bold(`\n${this.currentPlayer.name.toUpperCase()} você irá começar!`));

        askEnter();

        this.gameLoop();
    }

    private gameLoop(): void {
        do {
            this.printBoard();

            console.log(chalk.bold(`\n${this.currentPlayer.name.toUpperCase()} é a sua vez...`));

            const move = this.rollDice();

            this.movePlayer(this.currentPlayer, move);

            this.printBoard();

            this.verifyEffects(this.currentPlayer);

            this.printBoard();

            this.currentPlayer = this.determineNextPlayer();

        } while (true);
    }

    verifyEffects(player: Player): void {
        const position = player.character.position;

        const isEffectPosition = "effectSteps" in position && "description" in position;

        if (!isEffectPosition) {
            console.log("Nao é efeito.");
            return;
        }

        console.assert(typeof position.effectSteps === "number");

        position as EffectPosition;

        console.log("Parece que você parou logo em cima de uma casa com efeito!");
        console.log(chalk.bold(`Efeito: ${position.description}`));

        const playerMovement = position.onCharacterSettle(player.character);

        if (playerMovement != position.effectSteps) {
            console.log(chalk.magenta(`Por conta do seu personagem, voce irá pular ${playerMovement} casas`));
        }

        askEnter();

        this.printBoard()

        return this.verifyEffects(this.currentPlayer);
    }

    determineNextPlayer(): Player {
        let nextPlayerIndex = this.players.indexOf(this.currentPlayer) + 1;
        nextPlayerIndex = nextPlayerIndex % this.players.length;

        return this.players[nextPlayerIndex];
    }

    movePlayer(player: Player, steps: number) {
        const playerMovement = this.currentPlayer.character.moveForward(steps)

        console.log(`Voce irá mover ${playerMovement} casas`);

        askEnter()
    }

    rollDice(): number {
        askEnterFor("rolar os dados...");

        console.log(chalk.green("Rolando dados..."));

        const diceValue = this.dice.roll();
        console.log(`Dado: ${diceValue}`);

        askEnter();

        return diceValue;
    }

    private printBoard(): void {
        // cada item do array é uma lista de lista da string
        let boardStrings: string[][] = Array.from(
            { length: this.board.totalRows },
            (): string[] => []
        );

        for (let i = 0; i < this.board.totalRows; i++) {
            for (let j = 0; j < this.board.totalColumns; j++) {
                const position = this.board.getPosition(i, j);

                const playersInPosition = this.players.filter(p => p.character.position === position)

                const positionStr = this.colorizePosition(position, playersInPosition);
                const splitted = positionStr.split("\n")

                for (let k = 0; k < splitted.length; k++) {
                    const positionString = splitted[k];

                    boardStrings[i][k] = boardStrings[i][k] ?
                        boardStrings[i][k] + positionString :
                        positionString;
                }

            }
        }
        boardStrings.forEach((row) => {
            for (const lineOfString of row) {
                console.log(lineOfString);
            }
        });
    }

    private colorizePosition(position: Position, playersInPosition: Player[]): string {
        const str = position.beautyString(playersInPosition);

        if (position instanceof StartPosition) return chalk.bgBlueBright(str);
        if (position instanceof EndPosition) return chalk.bgCyan(str);
        if (position instanceof PathPosition) return chalk.bgGray(str);
        if (position instanceof EmptyPosition) return chalk.bgBlack(str);

        if (position instanceof JumpPosition) return position.effectSteps > 0 ? chalk.bgGreen(str) : chalk.bgRed(str);

        return str;
    }

    private createPlayers(playersCount: number, initialPosition: Position) {
        const players: Player[] = [];

        for (let i = 0; i < playersCount; i++) {

            const playerName = askInput(`Qual o nome do player ${(i + 1)}? `, undefined, 'P' + (i + 1));

            console.log("Personagens: ");

            Characters.characters.forEach((character, index) => {
                console.log(`${index + 1} - ${character}`);
            });

            const playerCharacter = askNumber(`Qual o personagem do player ${(i + 1)}? `, Array.from(Characters.characters.keys(), (i) => i + 1));
            const player = new Player(playerName, Characters.getChar(playerCharacter - 1, this.board, initialPosition));
            players.push(player);
        }

        return players;
    }

    private selectLevel(levels: string[]) {
        console.log("SELECIONE O NIVEL: ");
        levels.forEach((level, index) => {
            console.log(`${index + 1} - ${level}`);
        });

        const selectedLevel = askNumber("Seleção: ", Array.from(Array(levels.length).keys(), (v) => v + 1));

        return levels[selectedLevel - 1];
    }

    private determineFirstPlayer() {
        return this.players[Math.floor(Math.random() * this.players.length)];
    }
}


export default Game;