import ValidacaoCliente from './ValidacaoCliente.js';

export default class ValidacaoJsonClientes {
    static valida(clientes) {
        let errosClientes = [];
        for(let i = 0; i < clientes.length; ++i) {
            const {nome, cpf, dt_nascimento, renda_mensal, estado_civil} = clientes[i];
            let erros = ValidacaoCliente.valida(nome, cpf, dt_nascimento, renda_mensal, estado_civil);
            if(erros.length) {
                errosClientes.push({
                    dados: {...clientes[i]},
                    erros: erros
                });
            }
        }
        return errosClientes;
    }
}
