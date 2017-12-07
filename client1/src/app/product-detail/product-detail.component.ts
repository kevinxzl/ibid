import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,Params } from '@angular/router';
import { Product, ProductService, Comment } from "../shared/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Comment[];

  private newRating: number = 5;
  private newComment: string = "";

  private isCommentHidden: boolean = true;

  isWatched: boolean = false;
  currentBid: number;

  constructor( private routeInfo: ActivatedRoute,
               private productService: ProductService
            ) {
  }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"];
    //this.productTitle = this.routeInfo.snapshot.params["prodTitle"];
    //this.routeInfo.params.subscribe((params: Params) => this.productTitle = params["id"]);
    this.productService.getProduct(productId)
    .subscribe(
        product => {
          this.product = product;
          this.currentBid = product.price;
        });

    this.productService.getCommentsForProductdId(productId)
    .subscribe( comments => this.comments = comments );
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), "匿名评价", this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct() {
    this.isWatched = ! this.isWatched;
  }

}
