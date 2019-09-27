import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
    ApiSearchParam, ApiSearchResult, Application, ApplicationSearchParam, ApplicationsResult,
    SubscribeParam, SubscribeResult, ApiOverview
} from './apis.models';



@Injectable()
export class ApisService {

    constructor(private http: HttpClient) { }

    search(param: ApiSearchParam): Observable<any> {
        const searchParams = new HttpParams()
            .append('apiStatus', param.apiStatus)
            .append('query', param.query)
            .append('limit', <any>param.limit)
            .append('offset', <any>param.offset);
        const headerParams = new HttpHeaders()
            .append('Content-Type', 'application/json')
        return this.http.get<ApiSearchResult>(ApiEndpoints.apis.search, { params: searchParams, headers: headerParams });
    }

    getUserApplicationsActions(appId: string): Observable<ApplicationsResult> {
        const searchParams = new HttpParams()
            .append('apiId', appId);
        return this.http.get<ApplicationsResult>(ApiEndpoints.apis.applications, { params: searchParams });
    }

    getUserSubscriptions(appId: string): Observable<any> {
        const searchParams = new HttpParams()
            .append('apiId', appId);
        return this.http.get<any>(ApiEndpoints.subscriptions, { params: searchParams });
    }

    subscribe(param: SubscribeParam): Observable<SubscribeResult> {
        return this.http.get<SubscribeResult>(ApiEndpoints.apis.subscribe);
    }

    getApiOverview(param): Observable<ApiOverview> {
        return this.http.get<ApiOverview>(ApiEndpoints.apis.apiOverview+param);
    }

}
