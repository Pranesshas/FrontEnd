import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AssetDetailsVo } from '../models/Asset-details-vo';
import { AssetTypeVo } from '../models/Asset-type-vo';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private baseUrl= "http://localhost:9191/"
  constructor(private http: HttpClient) { }

  getAssets(): Observable<any>{
    
    return this.http.get(`${this.baseUrl}`+"available");
  }
  getProjects(): Observable<any>{
    
    return this.http.get(`${this.baseUrl}`+"project");
  }

  getAssetsDetails(assetId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}` +"get/"+ assetId);

  }

  saveAssets(formData: FormData):Observable<any>{
    return this.http.post(`${this.baseUrl}` +"addAssets",formData);


  }

 
  deleteAssets(asset_id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}` +"delete/"+ asset_id);

  }
  searchAssets(searchObject:AssetDetailsVo,startPosition : number):Observable<any>
  {
    return this.http.post(`${this.baseUrl}` +"asset/search/"+startPosition,searchObject);
  }

  getAssetTypes():Observable<any>
  {
    return this.http.get(`${this.baseUrl}` +"getAssetTypes");
  }

  
  saveAssetType(assetType :AssetTypeVo):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+"saveAssetType",assetType);
  }
  getUsersPerProject(project:String): Observable<any>{
    
    return this.http.get(`${this.baseUrl}`+project);
  }
}
