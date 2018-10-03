import { Component, AfterViewInit } from '@angular/core';
import { ApiService, IntervallType, IntervallPeriod } from './api.service';
import { StockData } from './models/StockData';
import { SearchResult } from './models/SearchResult';
declare const M: any;
declare const ApexCharts: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit
{
  stockArray: StockData[] = new Array();
  symbol: string;
  searchResult: SearchResult[]
  isLoading;

   chart;

  constructor(private apiservice: ApiService)
  {

  }

  ngAfterViewInit()
  {

  }

  onSearch()
  {
    this.isLoading = true;
    this.searchResult = [];

    this.apiservice.GetSearch(this.symbol).subscribe(data =>
    {
      this.searchResult = data['bestMatches'];
      this.isLoading = false;

    });
  }

  search()
  {
    this.apiservice.GetStockData(this.symbol, IntervallPeriod.SIXTEEN).subscribe(data =>
    {
      const da = data['Time Series (Daily)'];

      Object.keys(da).forEach(key =>
      {
        const stockdata: StockData = da[key];
        stockdata.Date = new Date(key);
        this.stockArray.push(stockdata);
      });

      this.draw();
    })
  }

  draw()
  {
    const seriesData = new Array();
    this.stockArray.forEach(data =>
    {
      const stockdat: any = new Object();

      stockdat.x = data.Date;
      stockdat.y = [Number(data["1. open"]), Number(data["2. high"]), Number(data["3. low"]), Number(data["4. close"])];
      seriesData.push(stockdat);
    });

    const options = {
      chart: {
        height: 350,
        type: 'candlestick',
      },
      series: [{
        data: seriesData
      }],
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      stroke: {
        width: [1, 9]
      },
      xaxis: {
        type: 'datetime'
      }
    }

    this.chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );

    this.chart.render();
  }
}
