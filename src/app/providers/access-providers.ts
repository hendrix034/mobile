import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders{

    server: string= 'http://192.168.100.4/thesis/api/';

    constructor(
        public http: HttpClient 
    ) {}

    postData(body, file){
        let headers = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        })
        let option = {
            headers: headers
        }
        return this.http.post(this.server + file, JSON.stringify(body), option)
        .timeout(59000)
        .map(res => res);

    }
}