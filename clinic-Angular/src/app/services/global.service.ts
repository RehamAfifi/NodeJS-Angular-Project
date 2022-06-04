import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public navFlag:boolean= false
   public imgUrl = "http://localhost:3000/"
  // public urlPath = "http://dashboard.roshetah.com/api/auth/"
  public urlPath ="http://localhost:3000/user/login"
  public allUrl="http://localhost:3000/user/all/:1/:5"
  public isLogIn : boolean = false
  constructor(private http : HttpClient) { }

  login(obj:any) : Observable<any>{
    return this.http.post(this.urlPath , obj )
  }
  allu():Observable<any>{
    return this.http.get(this.allUrl)
  }
  // loadRoles():Observable<any>{
  //   return this.http.get(`${this.urlPath}loadRoles/1`)
  // }
  // uploadImg(obj:any):Observable<any>{
  //   return this.http.post(`${this.urlPath}StoreAccountImages` , obj)
  // }
    uploadImg(obj:any):Observable<any>{
    return this.http.patch(`${this.imgUrl}user /changeImage` , obj)
    
  }

}
