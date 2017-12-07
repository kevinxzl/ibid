import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs'
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter< ProductSearchParams > = new EventEmitter();

  constructor( private http: Http) { }

  getAllCategories(): Observable<string[]> {
    return this.http.get("/api/categories")
    .map( res => res.json());
  }

  getProducts(): Observable<Product[]> {
    return this.http.get("/api/products")
    .map( res => res.json());
  }

  getProduct( id: number ): Observable< Product > {
    return this.http.get("/api/product/"+id)
    .map( res => res.json());
  }

  getCommentsForProductdId( id: number) : Observable < Comment[] > {
    return this.http.get("api/product/"+id+"/comments")
    .map( res => res.json());
  }

  search( params: ProductSearchParams ): Observable< Product[] > {
    return this.http.get("/api/products", {search: this.encodeParams( params )})
    .map( res => res.json());
  }

  private encodeParams( params: ProductSearchParams ) {
    /*
    let result: URLSearchParams;

    result = Object.keys( params )
    .filter( key => params[ key ])
    .reduce(( sum: URLSearchParams, key:string) => {
      sum.append( key, params[key] );
      return sum;
    }, new URLSearchParams());

    return result;
    */
    return Object.keys( params )
    .filter( key => params[key])
    .reduce(( sum: URLSearchParams, key:string) => {
      sum.append( key, params[key] );
      return sum;
    }, new URLSearchParams());
  }


}//End ProductService

export class Product {
  constructor(
    public id : number,
    public title : string,
    public price : number,
    public rating: number,
    public desc : string,
    public categories : Array<string>
  ){

  }
}// End Product

export class Comment {
  constructor( public id: number,
               public productId: number,
               public timestamp: string,
               public user: string,
               public rating: number,
               public content: string
  )
  {

  }
}// End Comment

export class ProductSearchParams {

  constructor( public title: string,
               public price: number,
               public category: string
  ){

  }
}// End ProductSearchParams
