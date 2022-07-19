import { Component, OnInit } from '@angular/core';
import { NgForm, SelectControlValueAccessor } from '@angular/forms';
import { UserDetailsVo } from '../models/User-details-vo';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  userSaved : any;
  allUsers: any;
  success:boolean;
  isShow:boolean=false;
  value:any;

  constructor(private router: Router,
    private userService: UserService) {   
   }

  ngOnInit(): void {
    this.getAllUsers();
  }
  onShow()
  {
    this.isShow=true;
  }

  onSubmit(form: NgForm){
    
    let formValue = form.value;
    debugger
    let userDetails :UserDetailsVo = new UserDetailsVo();  
    userDetails.firstName=formValue.firstName;
    userDetails.lastName=formValue.lastName;
    userDetails.subject=formValue.subject;
    userDetails.email=formValue.email;
    userDetails.phone=formValue.phone;
    debugger
    userDetails.project=formValue.project;

    this.userService.saveUsers(userDetails).subscribe((data) => {

      // this.userService.getUsers().subscribe(( data ) =>{
        debugger
        if (data !== undefined && data !== null && data.operationStatus === "SUCCESS"){
          this.success=true;
        } else {
          this.success=false;
        }
        this.ngOnInit();
    this.isShow=false;
  });
  }

 
  onClick(id){
    debugger
this.value=id;
this.router.navigate(["/"+id]);
// api 
  }

  getAllUsers(){
    this.userService.getUsers().subscribe((data) =>{
      debugger
      this.allUsers=data;
      for(let i=0;i<this.allUsers.length;i++){
        this.allUsers[i].firstName= this.allUsers[i].firstName + " "+ this.allUsers[i].lastName;
      }
  });
}
}
