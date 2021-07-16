import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    _URL = 'https://jsonplaceholder.typicode.com/users';
    URL = 'http://localhost:4000/api/v1/products';
    constructor(
        private http: HttpClient
    ){
        console.log('Servicio Product')
    }

    getProducts(){
        const header = new HttpHeaders()
            .set('Type-content', 'aplicacion/json') 
        
        return this.http.get(this.URL, {
            headers: header
        })
    }
    postProduct(product:any){
        return this.http.post<any>(this.URL + '/', product )
    }
    deleteProduct(id:any){
        return this.http.delete<any>(this.URL + `/${id}` )
    }
    
}