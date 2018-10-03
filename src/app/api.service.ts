import { Injectable, Injector } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService extends BaseService
{
  constructor(injector: Injector)
  {
    super(injector);
  }

  GetMacd(symbol: string, intervallType: IntervallType, timeperiode = 10): Observable<any>
  {
    return this.get('function=MACD&symbol=' + symbol + '&interval=' + intervallType + '&time_period=' + timeperiode + '&series_type=open').pipe(map((response) =>
    {
      return response.json() as any;
    }));
  }

  GetStockData(symbol: string, intervallPeriod: IntervallPeriod = IntervallPeriod.THIRTEEN): Observable<any>
  {
    return this.get('function=TIME_SERIES_DAILY&symbol=' + symbol + '&interval=' + intervallPeriod).pipe(map((response) =>
    {
      return response.json() as any;
    }));
  }

  GetCurrentStockData(symbol: string): Observable<any>
  {
    return this.get('function=GLOBAL_QUOTE&symbol=' + symbol).pipe(map((response) =>
    {
      return response.json() as any;
    }));
  }

  GetSearch(search: string): Observable<any>
  {
    return this.get('function=SYMBOL_SEARCH&keywords=' + search).pipe(map((response) =>
    {
      return response.json() as any;
    }));
  }
}

export enum IntervallType
{
  day = 'daily',
  weekly = 'weekly',
  monthly = 'monthly'
}

export enum IntervallPeriod
{
  ONE = '1min',
  FIVE = '5min',
  FIFTHEEN = '15min',
  THIRTEEN = '30min',
  SIXTEEN = '60min'
}
