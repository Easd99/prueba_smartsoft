import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/products.service'
import {AuthService} from '../service/auth.service'
import { FormBuilder } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router'


@Component({
    selector: 'hello-word',
    templateUrl: './updateproduct.component.html',
    styleUrls: ['./updateproduct.component.sass']
})


export class UpdateproductComponent implements OnInit{
    

    public product: Array<any> = []

    Product = this.formBuilder.group({
        name: '',
        price: '',
        inventory: '',
        category: ''
    });

    

    ngOnInit(){
        const id = this.activateRoute.snapshot.params.id
        this.productService.getProduct(id).subscribe((resp: any) => {
            console.log(resp)
            this.product = resp
            var categ = ''
            if(resp.categories[0]){
                categ = resp.categories[0].name
            }
            this.Product.patchValue({
                name: resp.name,
                price: resp.price,
                inventory: resp.inventory,
                category: categ
            })
        })
        
        
    }

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
    ){}

    logout(){
        localStorage.removeItem('id')
        window.location.reload();
    }
    updateProduct(){
        const rex = /^[A-Z]+$/i;
        const id = this.activateRoute.snapshot.params.id
        if (rex.test(this.Product.value.name) == true &&
            !isNaN(this.Product.value.price) &&
            !isNaN(this.Product.value.inventory)){

            this.productService.putProduct(this.Product.value, id)
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