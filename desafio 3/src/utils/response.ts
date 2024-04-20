import { Status, Errors } from './status';

export interface Response<T> {
    status: Status;
    errors?: Errors[];
    data?: T;
}
