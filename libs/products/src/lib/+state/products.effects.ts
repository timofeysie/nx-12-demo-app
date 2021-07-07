import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductsService } from './../services/products/products.service';
import { ProductsActionTypes } from './../+state/products.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import * as productActions from './../+state/products.actions';
import { of } from 'rxjs';
import { Product } from '@demo-app/data-models';

@Injectable()
export class ProductsEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(ProductsActionTypes.LoadProducts),
    mergeMap(() =>
      this.productService
        .getProducts()
        .pipe(
          map(
            (products: Product[]) =>
               productActions.loadProductsSuccess({ payload: products })
          ),
          catchError(error => of(productActions.loadProductsFail(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}