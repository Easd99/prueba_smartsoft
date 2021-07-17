import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service'
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'


@Component({
    selector: 'hello-word',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass']
})


export class SignupComponent{
    title = "prueba";
    User = this.formBuilder.group({
        username: '',
        password: ''
    });

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ){}
    
    SignUp(){
        // Process checkout data here
        this.authService.signUp(this.User.value)
            .subscribe(
                res => {
                    console.log(res)
                    localStorage.setItem('id', res.id )
                    this.router.navigate(['/home'])
                },
                err => {
                    console.log(err)
                }
            )
      }

}