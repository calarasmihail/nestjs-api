import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getOneProduct(prodId: string) {
        const product = this.findProductById(prodId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProductById(productId);
        const updatedProduct = {...product};
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string) {
        const index = this.findProductById(productId)[1];
        this.products.splice(index, 1);
    }

    private findProductById(prodId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === prodId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}