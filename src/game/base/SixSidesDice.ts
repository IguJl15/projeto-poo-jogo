import Dice from "../interfaces/Dice";

class SixSidesDice implements Dice {
    public sides: number = 6;
    roll(): number{
        return Math.floor(Math.random() * this.sides) + 1;
    }
}
export default SixSidesDice;