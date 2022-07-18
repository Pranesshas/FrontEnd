import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MapDetailsVo } from '../models/Map-details-vo';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = "http://localhost:9191/"
  constructor(private http: HttpClient) { }

  saveMap(mapDetails: MapDetailsVo): Observable<any> {
    return this.http.post(`${this.baseUrl}` + "mapUser", mapDetails);
  }

  unAssignMap(mapDetails: MapDetailsVo): Observable<any> {
    return this.http.post(`${this.baseUrl}` + "unassignUser", mapDetails);
  }
}
