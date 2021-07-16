import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/products.service'
import {AuthService} from '../service/auth.service'
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'


@Component({
    selector: 'hello-word',
    templateUrl: './newproduct.component.html',
    styleUrls: ['./newproduct.component.sass']
})


export class NewproductComponent{
    
    Product = this.formBuilder.group({
        name: '',
        price: '',
        inventory: '',
        category: ''
    });

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private router: Router,
    ){}

    newProduct(){
        const rex = /^[A-Z]+$/i;
        
        if (rex.test(this.Product.value.name) == true &&
            !isNaN(this.Product.value.price) &&
            !isNaN(this.Product.value.inventory)){

            this.productService.postProduct(this.Product.value)
            .subscribe(
                res => {
                    console.log(res)
                },
                err => {
                    console.log(err)
                }
            )
        
           
        }else{
            console.log("error")
        }

      }

}