import MenuView from '../views/menu-view';
import { MenuController } from '../controllers/menu-controller';

export default class MenuPresenter {
    private controller: MenuController;
    private view: MenuView;

    constructor(controller: MenuController) {
        this.controller = controller;
        this.view = new MenuView();
    }

    async run(): Promise<void> {
        while(true) {
            let option: number = this.view.receive();

            if(option == 1)
                await this.controller.menuCadastroPaciente();
            else if(option == 2)
                await this.controller.menuAgenda();
            else
                break;
        }
    }
}
