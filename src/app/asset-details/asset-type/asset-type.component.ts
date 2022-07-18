import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetDetailsVo } from 'src/app/models/Asset-details-vo';
import { AssetsService } from 'src/app/Services/assets.service';

@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent implements OnInit {
  assetValue : String="";
  assetTypes : any;
  asset_type : number;
  constructor(private assetsService:AssetsService,
    ) { }

  ngOnInit(): void {
    this.getAssetTypes();
  }
  


  getAssetTypes(){
    this.assetsService.getAssetTypes().subscribe((data)=>{
      debugger
      
      this.assetTypes= data;
      console.log(this.assetTypes);
    })


  }
  onSubmit(){
    this.saveAssets();
  }

  onSearch(form:NgForm){

  }
  saveAssets(){
    debugger
    if(!!this.assetValue && this.assetValue!=""){
      this.assetsService.saveAssetType(this.assetValue).subscribe((data)=>{
        console.log(data);
        this.ngOnInit();
      });
      
    }
  }

  onSave(form: NgForm){  
    debugger
    let formValue = form.value;
    let assetDetails :AssetDetailsVo = new AssetDetailsVo();
    assetDetails.asset_number=formValue.asset_number;
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
    assetDetails.is_active=formValue.is_active;
    assetDetails.is_available=formValue.is_available;
    assetDetails.is_declared=formValue.is_declared;
    assetDetails.is_old=formValue.is_old;
    assetDetails.product_type=this.asset_type;
    console.log(form.value.product_type);
    debugger
    if(form.value.assetDate!=null){
     assetDetails.date=formValue.assetDate;
      // assetDetails.date = this.datePipe.transform(formValue.date);

    }

    console.log(assetDetails);
    this.saveAssetDetails(assetDetails);
  }

  saveAssetDetails(assetDetails){
    this.assetsService.saveAssets(assetDetails).subscribe((data)=>{
      console.log(data);
      
  });
}
}

