import ValidacaoCPF from './ValidacaoCPF.js';
import ValidacaoNome from './ValidacaoNome.js';
import ValidacaoDataNascimento from './ValidacaoDataNascimento.js';
import ValidacaoRenda from './ValidacaoRenda.js';
import ValidacaoEstadoCivil from './ValidacaoEstadoCivil.js';

export default class ValidacaoCliente {
    static valida(nome, cpf, dt_nascimento, renda_mensal, estado_civil) {
        let errors = [];
     
        if(!nome)
            errors.push({campo: "nome", mensagem: "Campo obrigatório ausente"});
        else if(!ValidacaoNome.valida(nome))
            errors.push({campo: "nome", mensagem: "O nome não possui tamanho entre 5 a 60 caracteres"});

        if(!cpf)
            errors.push({campo: "cpf", mensagem: "Campo obrigatório ausente"});
        else if(!ValidacaoCPF.validaFormato(cpf))
            errors.push({campo: "cpf", mensagem: "O cpf está com o formato incorreto"});
        else if(!ValidacaoCPF.validaDV(cpf))
            errors.push({campo: "cpf", mensagem: "O cpf é inválido"});

        if(!dt_nascimento)
            errors.push({campo: "dt_nascimento", mensagem: "Campo obrigatório ausente"});
        else if(!ValidacaoDataNascimento.validaFormato(dt_nascimento))
            errors.push({campo: "dt_nascimento", mensagem: "A data de nascimento está com o formato incorreto"});
        else if(!ValidacaoDataNascimento.validaIdade(dt_nascimento))
            errors.push({campo: "dt_nascimento", mensagem: "O cliente tem menos de 18 anos"});

        if(renda_mensal && !ValidacaoRenda.valida(renda_mensal))
            errors.push({campo: "renda_mensal", mensagem: "A renda_mensal está com o formato incorreto"});

        if(estado_civil && !ValidacaoEstadoCivil.valida(estado_civil))
            errors.push({campo: "estado_civil", mensagem: "O estado civil está com o formato incorreto"});

        return errors;
    }
}
