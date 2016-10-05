import {
  BaseClientSideWebPart,
  IWebPartContext
} from '@microsoft/sp-client-preview';
import { Injectable, Inject } from '@angular/core';
import { Observable }from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { _do } from 'rxjs/operator/do';
import 'rxjs/Rx';
import { ISPPersonalLink } from './ISPPersonalLink';
import {RequestOptions, Request, RequestMethod, Headers, Http, Response} from '@angular/http'
@Injectable()
export class PsaLinksListService {
  _http:Http;
  constructor(@Inject(Http) http: Http) {
    this._http = http;
   }

  getLinks(serverUrl:string):Observable<ISPPersonalLink[]>{
    let headers = new Headers({ 'Accept': 'application/json;odata=nometadata' });
    let options = new RequestOptions({ headers: headers });
    let url = serverUrl+"/_api/web/lists/GetByTitle('PersonalLinks')/Items?$Order=Link_x0020_category,Order0";
    return this._http.get(url,options)
        .map((response: Response) =>
        <ISPPersonalLink[]>response.json().value
        );
  }
}