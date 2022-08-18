import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserDetailsVo } from '../models/User-details-vo';
import { UserMapVo } from '../models/User-map-vo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl= "http://localhost:9191/"
  constructor(private http: HttpClient) { }

  saveUsers(userdetails:UserDetailsVo ): Observable<any>{

    return this.http.post(`${this.baseUrl}`+"api/addUser",userdetails);
  }

  getUsers(): Observable<any>{
    
    return this.http.get(`${this.baseUrl}`+"api/allUsers");
  }

  getUsersPerProject(): Observable<any>{
    
    return this.http.get(`${this.baseUrl}`+"api/getUserDetails");
  }

  getDashboardDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`+"api/dashboard");
  }

  getDashboardMetrics():Observable<any>{
    return this.http.get(`${this.baseUrl}`+"api/dashboard/metrics");
  }

  getUserDetailsPerId(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}`+"api/getAssets/"+ userId);

  }

  getSearchResultsforMappingData(searchObj:UserMapVo):Observable<any>{
    return this.http.post(`${this.baseUrl}`+"api/userMap/search",searchObj);

  }
}
