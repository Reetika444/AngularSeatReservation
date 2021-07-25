import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class DataService {
  data:any;
  constructor(
    private httpClient:HttpClient
  ) { }

  // getData(){
  //  return this.data = [
  //    {
  //      "name":"Reetika",
  //    },
  //    {
  //      "name":"test",
  //    }
  //  ]
  // }


  getData(){
   return this.httpClient.get('http://127.0.0.1:8000/ticket');
  }

  insertData(data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post('http://127.0.0.1:8000/addticket',data,{ headers, responseType: 'text'});
  }


  inserticket(data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post('http://127.0.0.1:8000/inserticket',data,{ headers, responseType: 'text'});
    // return this.httpClient.post('https://secret-anchorage-10300.herokuapp.com/inserticket',data,{ headers, responseType: 'text'});
  }

}
