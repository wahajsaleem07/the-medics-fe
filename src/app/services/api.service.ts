import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';

//import { String } from '../enums/api-urls';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    //private apiUrl = `${environment.apiUrl}/`;
    private apiUrl = "http://localhost:3000";

    constructor(private httpClient: HttpClient) { }

    get<T>(endpoint: String, params?: any, reqOpts?: object) {
        //const formattedEndpoint = this.getFormattedEndpoint(endpoint, params);
        return this.httpClient.get<T>(this.apiUrl + endpoint);
    }

    post<T>(endpoint: String, body: any, reqOpts?: object) {
        return this.httpClient.post<T>(this.apiUrl + endpoint, body, reqOpts);
    }

    put<T>(endpoint: String, body: any, reqOpts?: object) {
        return this.httpClient.put<T>(this.apiUrl + endpoint, body, reqOpts);
    }

    delete<T>(endpoint: String, reqOpts?: object) {
        return this.httpClient.delete<T>(this.apiUrl + endpoint, reqOpts);
    }

    patch<T>(endpoint: String, body: any, reqOpts?: object) {
        return this.httpClient.patch<T>(this.apiUrl + endpoint, body, reqOpts);
    }

    private getFormattedEndpoint(endpoint: String, params: any): string {
        return endpoint.replace(/{(\w+)}/g, match => {
            return params[match.replace(/{|}/g, '')] || match;
        });
    }
}
