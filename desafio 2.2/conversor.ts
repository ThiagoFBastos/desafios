import ConversorCurrencyPresenter from './presenter/conversor-currency-presenter';
import ConversorCurrencyController from './controllers/conversor-currency-controller';

(
    () => {
        let controller: ConversorCurrencyController = new ConversorCurrencyController();
        let presenter: ConversorCurrencyPresenter = new ConversorCurrencyPresenter(controller);
        presenter.run();
    }
) ();
