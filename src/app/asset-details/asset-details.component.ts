import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetsService } from '../Services/assets.service';
import { AssetDetailsVo } from '../models/Asset-details-vo';
import { MethodCall } from '@angular/compiler';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

startPosition:number = 0;
totalAssets : any; 
assetTypes: any;
  constructor(private assetsService:AssetsService ,
    private router: Router,    
    ) { }

  ngOnInit(): void {
    let searchObject : AssetDetailsVo= new AssetDetailsVo();
    this.searchList(searchObject,this.startPosition);
    this.getAssetTypes();
  }
  
  getAssets(){
    this.assetsService.getAssets().subscribe((data)=>{   
      console.log(data);
      this.totalAssets=data;
    })
  }
  getAssetTypes(){
    this.assetsService.getAssetTypes().subscribe((data)=>{
      debugger
      
      this.assetTypes= data;
      console.log(this.assetTypes);
    })
  }
  onClick(id){
    this.router.navigate(["/map/"+id]);
  }
  
  onSubmit(form: NgForm){  
    debugger
    let formValue = form.value;
    let assetDetails :AssetDetailsVo = new AssetDetailsVo();
    assetDetails.product_id=formValue.product_id;
    assetDetails.product_name=formValue.product;
    assetDetails.make=formValue.brand;
    assetDetails.processor=formValue.processor;
    assetDetails.product_number=formValue.product_no;
    assetDetails.laptop_number=formValue.laptop_no;
    assetDetails.ram=formValue.ram;
    assetDetails.hdd=formValue.hdd;
    assetDetails.cd_rom=formValue.cd_rom;
    assetDetails.os=formValue.os;
    assetDetails.model_no=formValue.model_no;
    assetDetails.asset_date=formValue.date;
    assetDetails.is_active=formValue.is_active;
    assetDetails.is_available=formValue.is_available;
    assetDetails.is_declared=formValue.is_declared;
    assetDetails.is_old=formValue.is_old;
    debugger
    assetDetails.asset_number=formValue.asset_number;
    assetDetails.product_type=form.value.product_type;
    console.log(form.value.product_type);

    console.log(assetDetails);
    this.saveAssetDetails(assetDetails);
  }

  
  
  onSearch(form: NgForm){
    let formValue = form.value;
    let searchObject :AssetDetailsVo = new AssetDetailsVo();
    debugger
    searchObject.product_id=formValue.product_id;
    searchObject.product_name=formValue.product;
    searchObject.make=formValue.brand;
    searchObject.processor=formValue.processor;
    searchObject.product_number=formValue.product_no;
    searchObject.laptop_number=formValue.laptop_no;
    searchObject.ram=formValue.ram;
    searchObject.hdd=formValue.hdd;
    searchObject.cd_rom=formValue.cd_rom;
    searchObject.os=formValue.os;
    searchObject.model_no=formValue.model_no;
    searchObject.asset_date=formValue.date;
    searchObject.is_active=formValue.is_active;
    searchObject.is_available=formValue.is_available;
    searchObject.is_declared=formValue.is_declared;
    searchObject.is_old=formValue.is_old;
    searchObject.product_type=form.value.product_type;
    debugger
    searchObject.asset_number=formValue.asset_number;


    // if (formValue.product_id == null) {
    //   searchObject.product_id = null;
    // } else {
    //   searchObject.product_id = formValue.product_id;
    // }

    // if (formValue.product_name == null) {
    //   searchObject.product_name = null;
    // } else {
    //   searchObject.product_name = formValue.product_name;
    // }

    // if (formValue.brand == null) {
    //   searchObject.make = null;
    // } else {
    //   searchObject.make = formValue.brand;
    // }

    // if (formValue.processor == null) {
    //   searchObject.processor = null;
    // } else {
    //   searchObject.processor = formValue.processor;
    // }

    // if (formValue.product_number == null) {
    //   searchObject.product_number = null;
    // } else {
    //   searchObject.product_number= formValue.product_number;
    // }

    // if (formValue.laptop_number == null) {
    //   searchObject.laptop_number = null;
    // } else {
    //  searchObject.laptop_number= formValue.laptop_number;
    // }
    // if (formValue.ram == null) {
    //   searchObject.ram = null;
    // } else {
    //   searchObject.ram = formValue.ram;
    // }
    // if (formValue.hdd == null) {
    //   searchObject.hdd = null;
    // } else {
    //   searchObject.hdd= formValue.hdd;
    // }

    // if (formValue.cd_rom == null) {
    //   searchObject.cd_rom = null;
    // } else {
    //   searchObject.cd_rom = formValue.cd_rom;
    // }

    // if (formValue.os == null) {
    //   searchObject.os = null;
    // } else {
    //   searchObject.os = formValue.os ;
    // }

    // if (formValue.model_no == null) {
    //   searchObject.model_no = null;
    // } else {
    //   searchObject.model_no = formValue.model_no;
    // }

    // if (formValue.date == null) {
    //   searchObject.date = null;
    // } else {
    //   searchObject.date= formValue.date;
    // }

    // if (formValue.is_active == null) {
    //   searchObject.is_active = false;
    // } else {
    //   searchObject.is_active= true;
    // }
    // if (formValue.is_available == null) {
    //   searchObject.is_available = false;
    // } else {
    //   searchObject.is_available= true;
    // }
    // if (formValue.is_declared == null) {
    //   searchObject.is_declared = false;
    // } else {
    //   searchObject.is_declared= true;
    // }
    // if (formValue.is_old == null ) {
    //   searchObject.is_old = false;
    // } else {
    //   searchObject.is_old= true;
    // }
    
    this.searchList(searchObject,this.startPosition); 
  }
   searchList(searchObject,startPosition)
   {
    this.assetsService.searchAssets(searchObject,startPosition).subscribe((data) => {
        console.log(data);
        this.totalAssets=data.assetList;
        console.log(data);
       
    });
  }

  saveAssetDetails(assetDetails){
    this.assetsService.saveAssets(assetDetails).subscribe((data)=>{
      console.log(data);
  });
  }

  onCancel(form: NgForm)
  { 
    form.reset();
  }

}


