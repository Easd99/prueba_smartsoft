import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    _URL = 'https://jsonplaceholder.typicode.com/users';
    constructor(
        private http: HttpClient
    ){
        console.log('Servicio Product')
    }

    getProducts(){
        const header = new HttpHeaders()
            .set('Type-content', 'aplicacion/json') 
        
        return this.http.get(this._URL, {
            headers: header
        })
    }
}