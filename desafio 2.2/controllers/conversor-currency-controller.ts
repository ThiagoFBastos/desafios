import StatusCodes from '../utils/status-codes';
import Currency from '../api/currency';
import {ResultConversorType} from '../utils/types';

export default class ConversorCurrencyController {
    async convert(sourceCurrency: string, destinyCurrency: string, value: number): Promise<ResultConversorType> {
        if(sourceCurrency == destinyCurrency) {
            return {
                status: StatusCodes.EQUAL_CURRENCIES_ERROR, 
                data: {
                    sourceCurrency: sourceCurrency,
                    destinyCurrency: destinyCurrency,
                    sourceValue: value.toFixed(2).replace('.', ','),
                    destinyValue: '-1',
                    tax: '-1'
                }
            };
        }
        
        let currency: Currency = new Currency();

        try {
            var convertedValue: number = await currency.convert(sourceCurrency, destinyCurrency, value);
        } catch(e) {
            return {
                status: StatusCodes.API_ERROR, 
                data: {
                    sourceCurrency: sourceCurrency,
                    destinyCurrency: destinyCurrency,
                    sourceValue: value.toFixed(2).replace('.', ','),
                    destinyValue: '-1',
                    tax: '-1'
                }
            };
        }

        return {
            status: StatusCodes.SUCESS,
            data: {
                sourceCurrency: sourceCurrency,
                destinyCurrency: destinyCurrency,
                sourceValue: value.toFixed(2).replace('.', ','),
                destinyValue: convertedValue.toFixed(2).replace('.', ','),
                tax: (convertedValue / value).toFixed(6).replace('.', ',')
            }
        };
    }
}
