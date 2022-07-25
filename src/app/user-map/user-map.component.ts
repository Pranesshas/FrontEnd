import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserMapVo} from 'src/app/models/User-map-vo'
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {

  private searchObj : UserMapVo=new UserMapVo();
  private defaultPageSize : number = 10;
   results : UserMapVo[]=[];
  tableCount : number;
  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.setDefaultPageSize();
    this.defaultPageNumber();
    this.getUserMapSearchDetails(this.searchObj);
  }

  private setDefaultPageSize(){
    this.searchObj.page_size = this.defaultPageSize;
  }

  private defaultPageNumber(): void {
    this.searchObj.page_number = 0;
  }

  getUserMapSearchDetails(searchObj:UserMapVo): void{

    
    this.userService.getSearchResultsforMappingData(searchObj).subscribe((data)=> {
      console.log(data);
      
      this.results = !!searchObj.page_number ? this.results.concat(data.mapList) : data.mapList;
      this.tableCount=data.assetCount;

    }
    )

  }
  onScroll(): void {
    this.incrementPageNumber();
    this.getUserMapSearchDetails(this.searchObj);
}

private incrementPageNumber(): void {
  this.searchObj.page_number += 1;
}

onClickName(id:number){
  
  this.router.navigate(["/user/" + id]);
}

}
