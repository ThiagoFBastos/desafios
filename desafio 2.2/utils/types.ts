import StatusCodes from './status-codes';

type ResultConversorType = {
    status: StatusCodes, 
    data: {
        sourceCurrency: string,
        destinyCurrency: string,
        sourceValue: string,
        destinyValue: string,
        tax: string
    }
};

export {ResultConversorType};
