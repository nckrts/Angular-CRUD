import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.model";
// import {map, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  baseUrl = "http://localhost:3001/products"


  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMassage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 4000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: isError ? ['.msg-error'] : ['msg-sucess']
    })
  }

  create(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl,  product).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
      this.showMassage('Error DATABASE', true);
      return EMPTY;

  }


  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById (id: string): Observable<Product>{
    const url= `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url= `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }


  delete (id: string): Observable<Product> {
    const url= `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

}



