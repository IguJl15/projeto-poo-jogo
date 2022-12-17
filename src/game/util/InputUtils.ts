import * as readLineSync from "readline-sync";
import chalk from "chalk";

export function askInput(question: string, possibleValues?: string[], defaultValue?: string): string {
    let str: string = "";

    do {
        str = readLineSync.question(question);

        if (possibleValues && !possibleValues.includes(str)) {
            console.log(chalk.red("Valor inválido. Escreva algo dentre as seguintes opções: " + possibleValues.join(", ")));
            continue;
        }
        if (str.trim() === "") {
            if(defaultValue != undefined) return defaultValue;
            console.log(chalk.yellow("Escreva algo..."));
            continue;

        }

        return str.trim();

    } while (true);
}

export function askYesNo(question: string, possibleValues?: string[]): string {
    return askInput(chalk.bold(question + " [Y/N]", ["Y", "N"]));
}

export function askNumber(question: string, possibleValues?: number[]): number {
    let num: number;
    do {
        num = Number(askInput(question));

        if (possibleValues && !possibleValues.includes(num)) {
            console.log(chalk.red("Valor inválido. Escreva algo dentre as seguintes opções: " + possibleValues.join(", ")));
            continue;
        }
        if (isNaN(num)) {
            console.log(chalk.yellow("Por favor, digite um número válido!"));
            continue;
        }

        return num;
    } while (true);
}

export function askEnter() {
    askEnterFor("continuar... ");
}

export function askEnterFor(action: string) {
    askInput("Pressione <ENTER> para " + action, undefined, "");
}

export function clearScreen() {
    console.clear();
}