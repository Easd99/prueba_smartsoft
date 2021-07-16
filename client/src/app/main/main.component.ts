import {Component} from '@angular/core';
import {ProductService} from '../service/products.service'


@Component({
    selector: 'hello-word',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})


export class MainComponent{
    title = "prueba";
    public products: Array<any> = []

    constructor(
        private productService: ProductService
    ){
        this.productService.getProducts().subscribe((resp: any) => {
            console.log(resp)
            this.products = resp
        })
    }

}