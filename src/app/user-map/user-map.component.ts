import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  userDetails : UserMapVo[]=[];
  details:any;

  constructor(private route: ActivatedRoute,
    private userService : UserService,
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

  onScroll(): void {
    this.incrementPageNumber();
    this.getUserMapSearchDetails(this.searchObj);
  }

  private incrementPageNumber(): void {
  this.searchObj.page_number += 1;
  }
  
 

  onSearch(form: NgForm){
    
  let formValue = form.value;
   this.searchObj.project = formValue.designation;
   this.searchObj.name= formValue.name;
  // this.searchObj. = formValue.asset_type;
  this.searchObj.make = formValue.make;
  this.searchObj.model_no=formValue.model_number;
  this.searchObj.product_number=formValue.product_number;
  // this.searchObj.asset_date=formValue.maped_date;
  this.defaultPageNumber();
  this.getUserMapSearchDetails(this.searchObj);
  }

getUserMapSearchDetails(searchObj:UserMapVo): void{
  
  this.userService.getSearchResultsforMappingData(searchObj).subscribe((data)=> {
        
    this.results = !!searchObj.page_number ? this.results.concat(data.mapList) : data.mapList;
    this.tableCount=data.assetCount;
    console.log(data);
  }
  )
}

onCancel(form: NgForm) {
  form.reset();
}

onClickName(id:number){  
  this.router.navigate(["/user/" + id]);
}
}
