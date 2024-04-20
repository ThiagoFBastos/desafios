import readline from 'readline-sync';
import { DateTime } from 'luxon';
import { ValidationInput } from './validations';

export default class Input {
    
    static readInt(message: string, validations?: ValidationInput<number>[]): number {
        const regex: RegExp = /^\d+$/;

        validations = validations ?? [];

        while(true) {
            let text: string = readline.question(message);

            if(!regex.test(text)) {
                console.log('a entrada não contém um número inteiro válido');
                continue;
            }

            let num: number = parseInt(text);
            let accepted: boolean = true;

            for(let i = 0; i < validations.length; ++i) {
                if(!validations[i].checker(num)) {
                    accepted = false;
                    console.log(validations[i].message);
                }
            }

            if(accepted) return num;
        }
    }

    static readString(message: string, validations?: ValidationInput<string>[]): string {
        validations = validations ?? [];

        while(true) {
            let text: string = readline.question(message);
            let accepted: boolean = true;

             for(let i = 0; i < validations.length; ++i) {
                if(!validations[i].checker(text)) {
                    accepted = false;
                    console.log(validations[i].message);
                }
            }

            if(accepted) return text;
        }
    }

    static readDate(message: string, validations?: ValidationInput<DateTime>[]): DateTime {
        validations = validations ?? [];

        while(true) {
            let text: string = readline.question(message);

            let date: DateTime = DateTime.fromFormat(text, 'dd/MM/yyyy');

            if(!date.isValid) {
                console.log('a entrada não contém uma data com formato dd/MM/yyyy válida');
                continue;
            }

            let accepted: boolean = true;

            for(let i = 0; i < validations.length; ++i) {
                if(!validations[i].checker(date)) {
                    accepted = false;
                    console.log(validations[i].message);
                }
            }

            if(accepted) return date;
        }
    }

    static readHour(message: string, validations?: ValidationInput<DateTime>[]): DateTime {
        validations = validations ?? [];

        while(true) {
            let text: string = readline.question(message);

            let hour: DateTime = DateTime.fromFormat(text, 'HHmm');

            if(!hour.isValid) {
                console.log('a entrada não contém um horário com formato HHmm válido');
                continue;
            }

            let accepted: boolean = true;

            for(let i = 0; i < validations.length; ++i) {
                if(!validations[i].checker(hour)) {
                    accepted = false;
                    console.log(validations[i].message);
                }
            }

            if(accepted) return hour;
        }
    }
}
