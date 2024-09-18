import { HttpErrorResponse } from "@angular/common/http";

export type StatusNotification = "OK"| "ERROR" | "INIT";

export class State< T, V = HttpErrorResponse>{
    value?: T;
    error?: V| HttpErrorResponse;
    status: StatusNotification;

    constructor(status: StatusNotification,value?:T, error?:V|HttpErrorResponse){
        this.value = value;
        this.status = status;
        this.error = error;
    }

    static Builder<T = any, V = HttpErrorResponse>(){
        return new StateBuilder<T, V>();
    }
}
class StateBuilder<T, V=HttpErrorResponse>{
    private status: StatusNotification = 'INIT';
    private value?: T;
    private error?: V|HttpErrorResponse;

    public forSucces(value: T): State<T, V>{
        this.value = value;
        return new State<T, V>('OK', this.value, this.error);
    }

    public forError(error: V | HttpErrorResponse = new HttpErrorResponse({error: 'Unknown Error'}), value?:T): State<T,V>{
        this.error=error;
        this.value = value;
        return new State<T, V>('ERROR', this.value, this.error);
    }

    public forInit(): State<T,V>{
        return new State<T,V>('INIT', this.value, this.error);
    }
}