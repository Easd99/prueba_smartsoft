import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service'
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'


@Component({
    selector: 'hello-word',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.sass']
})


export class SigninComponent{
    title = "prueba";
    User = this.formBuilder.group({
        username: '',
        password: ''
    });

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ){
        // this.productService.getProducts().subscribe((resp: any) => {
        //     console.log(resp)
        //     this.products = resp
        // })
    }
    
    SignIn(){
        // Process checkout data here
        this.authService.signIn(this.User.value)
            .subscribe(
                res => {
                    console.log(res)
                    localStorage.setItem('id', res.ok.id )
                    this.router.navigate(['/home'])
                },
                err => {
                    console.log(err)
                }
            )
      }

}