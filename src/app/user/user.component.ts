import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  value:any;
  user_detail:any;
  selectedId : number;
  constructor(private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedId = +params['userId'];
      });
      this.getUserDetailsPerId();
  }
  

  getUserDetailsPerId(){
    debugger
    this.userService.getUserDetailsPerId(this.selectedId).subscribe((data)=>{
      debugger
      console.log(data);
      this.value=data.productList;
      this.user_detail=data.user;
      
    })
  }

}



