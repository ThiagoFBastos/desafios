import dotenv from 'dotenv';

dotenv.config();

import { MenuController } from './controllers/menu-controller';
import MenuPresenter from './presenter/menu-presenter';

( async (): Promise<void> => {
    let controller: MenuController = new MenuController();
    let presenter: MenuPresenter = new MenuPresenter(controller);
    await presenter.run();
}) ();
