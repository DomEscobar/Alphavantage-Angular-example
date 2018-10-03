import { Component, Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
declare var unescape: any;


export class BaseService
{
  protected http: Http;
  protected jsonp: Jsonp;
  private apiUrl = '';

  constructor(private injector: Injector, api = 'https://www.alphavantage.co/query?apikey=XSGLKDQT4V4TTZ6A&')
  {
    this.apiUrl = api;
    this.http = this.injector.get(Http);
    this.jsonp = this.injector.get(Jsonp);
  }

  /**
   * http Get
   * @param path
   * @param param
   */
  get(path: string, param: any = '', showError = true): Observable<Response>
  {
    const observer = this.http.get(this.apiUrl + path + param, {
    });

    return observer;
  }

  /**
   * http post
   * @param path
   * @param param
   */
  post(path: string, creds: any = '', showLoading = true): Observable<Response>
  {
    const observer = this.http.post(this.apiUrl + path, creds, {
      headers: this.getHeader()
    });

    return observer;
  }

  /**
 * http put
 * @param path
 * @param param
 */
  put(path: string, creds: any = ''): Observable<Response>
  {
    const observer = this.http.put(this.apiUrl + path, creds, {
      headers: this.getHeader()
    });
    return observer;
  }

  delete(path: string, id: any = ''): Observable<Response>
  {
    const observer = this.http.delete(this.apiUrl + path + '/' + id, {
      headers: this.getHeader()
    });

    return observer;
  }

  private getHeader(content = 'application/json'): Headers
  {
    const authHeader = new Headers({
      'Accept': content,
      'Content-Type': content
    });

    return authHeader;
  }
}
