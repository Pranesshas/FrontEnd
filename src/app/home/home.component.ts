import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails : any;
total: any;
totalMapped:number;
totalAssets:number;
details:any;
totalUsers:number;

  constructor(private router:Router,
    private dashboardService:UserService) { }

  ngOnInit(): void {
    this.getDashboardDetails();
    this.getDashboardMetrics();
  }
  onClick(){
    this.router.navigate(["/assets"])
  }
  onClickName(id){
    this.router.navigate(["/user/"+id]);
  }
  onClick1()
  {
    this.router.navigate(["/userMap"]);
  }
  
  getDashboardDetails(){
    this.dashboardService.getDashboardDetails().subscribe((data)=>{
      console.log(data);
      this.details=data;
      for(let i=0;i<this.details.length;i++){
        this.details[i].created_date=this.details[i].created_date.replaceAll("T"," Time ");
      }
      this.userDetails=this.details;
    })
  }

  getDashboardMetrics(){
    this.dashboardService.getDashboardMetrics().subscribe((data)=>{
      this.total=data;
      this.totalMapped=this.total.totalMap;
      this.totalAssets=this.total.totalAssets;
      this.totalUsers=this.total.totalUsers;
    })
  }
}
