import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductMaster } from "../models/product-master";

@Injectable({
    providedIn: 'root'
})

export class ProductMasterService {

    private baseUrl = 'http://127.0.0.1:8000/api/productmaster/';

    constructor(private http: HttpClient) { }

    getAll(): Observable<ProductMaster[]> {
        return this.http.get<ProductMaster[]>(this.baseUrl);
    }

    create(field: ProductMaster): Observable<ProductMaster> {
        return this.http.post<ProductMaster>(this.baseUrl, field);
    }

    update(id: number, field: ProductMaster): Observable<ProductMaster> {
        return this.http.put<ProductMaster>(`${this.baseUrl}${id}/`, field);
    }

    delete(id: number): Observable<ProductMaster> {
        return this.http.delete<ProductMaster>(`${this.baseUrl}${id}/`);
    }
}