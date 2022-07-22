import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetsService } from 'src/app/Services/assets.service';
import { UserService } from 'src/app/Services/user.service';
import { MapDetailsVo } from '../../models/Map-details-vo';
import { MapService } from 'src/app/Services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  project: any;
  projects: any;
  projectName: any;
  selectedId: number;
  display: boolean ;
  names:any;
  user_id: number;
  id: number;
  laptop: any;
  user: any;
  name: String;
  success: boolean;
  showUser: boolean = false;
  isAlert:boolean=false;
  alertMsg:string;
  

  constructor(private assetsService: AssetsService,
    private userService: UserService,
    private mapService: MapService,
    private unmapService: MapService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.display=false; 
    // this.getProjects();
    this.getUserDetails();
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedId = +params['assetId'];
      });
    this.getAssetsDetails();
  }

  getProjects() {
    this.assetsService.getProjects().subscribe((data) => {
      this.projects = data;
    })
  }

  getUserDetails() {
    // this.projectName = value;
    this.userService.getUsersPerProject().subscribe((data) => {
      console.log(data);
      this.names = data;
    })
  }

  onChangeName(id: number) {
    
    this.user_id = id;
    
  }

  getAssetsDetails() {

    this.assetsService.getAssetsDetails(this.selectedId).subscribe((data) => {
      
      console.log(data);
      this.laptop = data.product;
      if (!this.laptop._available) {
        this.display = true;
        this.user = data.user;
        this.project = data.user.project;
        this.name = data.user.firstName;
      }
    })
  }

  onSubmit() {
    let mapDetails: MapDetailsVo = new MapDetailsVo();
    // let MapDetailsVo :mapDetails = new MapDetailsVo();
    
    mapDetails.asset_id = this.laptop.id;
    mapDetails.user_id = this.user_id;
    mapDetails.asset_type = this.laptop.product_type.id;
    this.mapService.saveMap(mapDetails).subscribe((data) => {
      // this.userService.getUsers().subscribe(( data ) =>{    
      if (data !== undefined && data !== null && data.operationStatus === "SUCCESS") {
        
        this.success=true;
        this.alertMsg = 'Data has been submitted successfully !!';

      } else {
        this.success = false;
      }
      this.ngOnInit();
    });
  }

  onClickUnassign() {
    let mapDetails: MapDetailsVo = new MapDetailsVo();
    mapDetails.asset_id = this.laptop.id;
    mapDetails.user_id = this.user.id;
    mapDetails.asset_type = this.laptop.product_name;
    
    this.mapService.unAssignMap(mapDetails).subscribe((data) => {
      // this.userService.getUsers().subscribe(( data ) =>{      
      if (data !== undefined && data !== null && data.operationStatus === "SUCCESS") {
        this.success = true;
      } else {
        this.success = false;
      }
      this.ngOnInit();
    });
  }

  onClickUser() {
    this.showUser = true;
  }

  onClickDelete(laptop: any) {
    if (laptop._available) {
      this.assetsService.deleteAssets(laptop.id).subscribe((data) => {
        if (data !== undefined && data !== null && data.operationStatus === "SUCCESS") {
          this.router.navigate(["/assets"]);
        }
      }
      );
    } else {
      // this.showMsg = true;
      this.isAlert=true;
      this.alertMsg= 'Please remove assignment before deletion.';
    }
  }

  onClickReassign(laptop: any) 
  {
    this.display = false;
  }

  Cancel()
  {
    this.router.navigate(["../assets"]);
  }

  onCancel()
  {
    this.ngOnInit();
  }

}


