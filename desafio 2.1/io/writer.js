import fs from 'fs';

export function writeJson(filename, object) {
    try {
        const jsonString = JSON.stringify(object);
        fs.writeFileSync(filename, jsonString);
    } catch(e) {
        throw new Error(`ocorreu um erro ao escrever no arquivo: ${e.message}`);
    }
}
