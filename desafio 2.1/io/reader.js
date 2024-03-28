import fs from 'fs';

export function readJson(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const json = JSON.parse(data);
        if(!(json instanceof Array))
            throw new Error('O objeto de entrada não é uma array');
        return json;
    } catch(e) {
        throw new Error(`ocorreu um erro ao abrir e carregar o arquivo: ${e.message}`);
    }
}
