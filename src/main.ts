import Ligeirinho from "./game/characters/Ligeirinho";
import Game from "./game/game";
import Player from "./game/player/Player";
import BoardUtils from "./game/util/BoardUtils";

function main() {

    // Inicializa o jogo
    
    // const player = new Player("Igor Julliano", new Ligeirinho());
    
    const game = new Game();
    game.start();
}
main();