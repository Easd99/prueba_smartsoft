import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service'
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'hello-word',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})


export class LoginComponent{
    title = "prueba";
    User = this.formBuilder.group({
        username: '',
        password: ''
    });

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
    ){
        // this.productService.getProducts().subscribe((resp: any) => {
        //     console.log(resp)
        //     this.products = resp
        // })
    }
    
    Login(){
        // Process checkout data here
        this.authService.signIn(this.User.value)
            .subscribe(
                res => {
                    console.log(res)
                },
                err => {
                    console.log(err)
                }
            )
      }

}