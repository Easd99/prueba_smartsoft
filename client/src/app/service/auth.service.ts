import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private _URL = 'http://localhost:4000/api/v1/users'


    constructor(private http: HttpClient){ }

    signUp(user:any){
        return this.http.post<any>(this._URL + '/signup', user )
    }
    signIn(user:any){
        return this.http.post<any>(this._URL + '/signin', user )
    }
   
}