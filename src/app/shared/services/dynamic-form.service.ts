import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DynamicForm } from "../../pages/dynamic-form/dynamic-form";
import { FormField } from "../models/dynamic-form";

@Injectable({
    providedIn: 'root'
})

export class DynamicFormService {

    private baseUrl = 'http://127.0.0.1:8000/api/formfields/';

    constructor(private http: HttpClient) { }

    getAll(): Observable<FormField[]> {
        return this.http.get<FormField[]>(this.baseUrl);
    }

    create(field: FormField): Observable<FormField> {
        return this.http.post<FormField>(this.baseUrl, field);
    }

    update(id: number, field: FormField): Observable<FormField> {
        return this.http.put<FormField>(`${this.baseUrl}${id}/`, field);
    }

    delete(id: number): Observable<FormField> {
        return this.http.delete<FormField>(`${this.baseUrl}${id}/`);
    }
}