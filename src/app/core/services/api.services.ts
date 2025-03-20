import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uri } from '../models/uri/uri';
import { inject, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export abstract class ApiService {
    protected readonly _uri: Uri
    protected readonly http: HttpClient = inject(HttpClient)
    private url = environment.server

    protected constructor(extendUrl: string) {
        this._uri = new Uri(this.url)
        this._uri = this._uri.appendPath(extendUrl)
    }

    protected get uri(): string {
        return this._uri.get()
    }

    protected get<T>(
        url: string,
        options?: any
    ): Observable<T> {
        return this.http.get<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected post<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.post<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.put<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected delete<T>(url: string, options?: any): Observable<T> {
        return this.http.delete<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.patch<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected head<T>(url: string, options?: any): Observable<T> {
        return this.http.head<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected options<T>(url: string, options?: any): Observable<T> {
        return this.http.options<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }
}
