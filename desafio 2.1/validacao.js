import * as Reader from './io/reader.js';
import * as Writer from './io/writer.js';
import path from 'path';
import {argv} from 'process';
import ValidacaoJsonClientes from './utils/ValidacaoJsonClientes.js';
import {DateTime} from 'luxon';

(() => {
    try {
        if(argv.length < 3)
            throw new Error('O arquivo não foi passado como argumento');

        const entrada = argv[2];
        const dirname = path.dirname(entrada);

        let dados = Reader.readJson(entrada);

        let erros = ValidacaoJsonClientes.valida(dados);

        Writer.writeJson(path.join(dirname, 'erros' + DateTime.now().toFormat('ddLLyyyy-HHmmss') + '.json'), erros);
    } catch(e) {
        console.log(e.message);
    }
}) ();
