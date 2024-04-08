import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default class Currency {
    private BASE_URL: string

    constructor() {
        this.BASE_URL = `https://v6.exchangerate-api.com/v6/${process.env.KEY}`;
    }

    async convert(source: string, dest: string, value: number): Promise<number> { 
        let url: string = this.BASE_URL + '/pair/' + source + '/' + dest;

        try {
            var response = await axios.get(url);
        } catch(e) {
            throw new Error(`A requisição não pôde ser completada`);
        }

        const conversion_rate: number = response.data.conversion_rate;

        return value * conversion_rate;   
    }
}
