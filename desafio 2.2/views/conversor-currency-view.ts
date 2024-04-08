import readline from 'readline-sync';
import StatusCodes from '../utils/status-codes';
import {ResultConversorType} from '../utils/types';

export default class ConversorCurrencyView {
 
    readSourceCurrency(): string {
        let currency: string;
        do
        {
            currency = readline.question('Moeda origem: ');
             if(currency.length != 3 && currency.length != 0)
                console.log('erro: a moeda de origem deve conter 3 caracteres!');
        } while(currency.length != 3 && currency.length != 0);
        return currency;
    }

    readDestinyCurrency(): string {
        let currency: string;
        do
        {
            currency = readline.question('Moeda destino: ');
            if(currency.length != 3)
                console.log('erro: a moeda de destino deve conter 3 caracteres!');
        } while(currency.length != 3);
        return currency;
    }

    readValue(): number {
        let value: number;
        let re: RegExp = /^\d+(,\d+)?$/;
        while(true) {
            let text: string = readline.question('Valor: ');
            if(re.test(text)) {
                value = parseFloat(text.replace(',', '.'));
                if(value > 0)
                    break;
                console.log('erro: o número informado deve ser maior que zero');
            } else {
                console.log('erro: o número informado deve ser um real com vírgula');
            }
        }
        return value;
    }

    show(result: ResultConversorType) : void {
        switch(result.status) {
            case StatusCodes.SUCESS:
                const {sourceCurrency, destinyCurrency, sourceValue, destinyValue, tax} = result.data;
                console.log(`${sourceCurrency} ${sourceValue} => ${destinyCurrency} ${destinyValue}`);
                console.log(`Taxa = ${tax}\n`);
                break;
            case StatusCodes.EQUAL_CURRENCIES_ERROR:
                console.log('erro: as moedas de origem e destino devem ser diferentes');
                break;
            case StatusCodes.API_ERROR:
                console.log('erro: aconteceu um erro ao realizar a operação de conversão');
                break;
            case StatusCodes.CONVERSION_ERROR:
                console.log('erro: aconteceu um erro na conversão');
                break;
        }
    }
}
