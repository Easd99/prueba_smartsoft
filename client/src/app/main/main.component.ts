import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/products.service'
import {AuthService} from '../service/auth.service'
import {Router} from '@angular/router'


@Component({
    selector: 'hello-word',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})


export class MainComponent implements OnInit{
    title = "prueba";
    public products: Array<any> = []

    ngOnInit(){
        this.productService.getProducts().subscribe((resp: any) => {
            console.log(resp)
            this.products = resp
        })
    }

    
    deleteProduct(id:any){
        this.productService.deleteProduct(id).subscribe((resp: any) => {
            console.log(resp)
            this.ngOnInit();
        },
        err => {
            console.log(err)
        })
    }
    logout(){
        localStorage.removeItem('id')
        window.location.reload();
    }
    


    constructor(
        private productService: ProductService,
        public authService: AuthService,
        private router: Router,
    ){}

}