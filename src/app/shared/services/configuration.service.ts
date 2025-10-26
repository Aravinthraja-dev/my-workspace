import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SettingsConfigDTO, UOM } from "../models/settings-config";

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {

    private baseUrl = 'http://127.0.0.1:8000/api/configrations/';
    private uomurl = 'http://127.0.0.1:8000/api/uom/';

    constructor(private http: HttpClient) { }

    /** 🔹 Get the existing BOM Settings (usually only one record) */
    getSettings(): Observable<SettingsConfigDTO[]> {
        return this.http.get<SettingsConfigDTO[]>(this.baseUrl);
    }

    /** 🔹 Create new BOM Settings */
    createSettings(data: SettingsConfigDTO): Observable<SettingsConfigDTO> {
        return this.http.post<SettingsConfigDTO>(this.baseUrl, data);
    }

    /** 🔹 Update existing BOM Settings */
    updateSettings(id: number, data: SettingsConfigDTO): Observable<SettingsConfigDTO> {
        return this.http.put<SettingsConfigDTO>(`${this.baseUrl}${id}/`, data);
    }

    /** 🔹 Get all UOMs for dropdown */
    getAllUOM(): Observable<UOM[]> {
        return this.http.get<UOM[]>(this.uomurl);
    }
}