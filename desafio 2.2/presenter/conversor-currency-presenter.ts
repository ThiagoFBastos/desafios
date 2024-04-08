import ConversorCurrencyView from '../views/conversor-currency-view';
import ConversorCurrencyController from '../controllers/conversor-currency-controller';

export default class ConversorCurrencyPresenter {
    private view: ConversorCurrencyView
    private controller: ConversorCurrencyController

    constructor(controller: ConversorCurrencyController) {
        this.view = new ConversorCurrencyView();
        this.controller = controller;
    }

    async run() : Promise<void> {
        while(true) {
            let sourceCurrency: string = this.view.readSourceCurrency();

            if(sourceCurrency == '')
                break;

            let destinyCurrency: string = this.view.readDestinyCurrency();

            let value: number = this.view.readValue();

            let result = await this.controller.convert(sourceCurrency, destinyCurrency, value);

            this.view.show(result);
        }
    }
}
