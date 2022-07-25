import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetDetailsVo } from 'src/app/models/Asset-details-vo';
import { AssetTypeVo } from 'src/app/models/Asset-type-vo';

import { AssetsService } from 'src/app/Services/assets.service';

@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent implements OnInit {
  show:boolean=false;
  assetValue : String="";
  assetTypes : AssetTypeVo[] = [];
  asset_type : number;

  file: File = null;
  loading: boolean = false; 
  success : boolean = false;
  alertMsg : String;
  isError: boolean = false;
  is_confi: boolean = false;
  constructor(private assetsService:AssetsService,
    ) { }

  ngOnInit(): void {
    this.getAssetTypes();
    console.log(this.asset_type);
  }
  
  onClick()
  {
    this.show=true;
  }

  onCancel()
  {
    this.show=false;
  }
 
  onClear(form: NgForm)
  { 
    form.reset();
    this.asset_type=0;
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
    // this.show=false;
  }

  onSearch(form:NgForm)
  {
  }

  saveAssets(){
    console.log(this.is_confi);
    let assetType :AssetTypeVo = new AssetTypeVo();
    debugger
    assetType.asset_name=this.assetValue;
    assetType.is_confi=this.is_confi;
    if(!!assetType.asset_name && assetType.asset_name!=""){
      this.assetsService.saveAssetType(assetType).subscribe((data)=>{
        console.log(data);
        this.ngOnInit();
      });
      
    }
  }

  checkAsset():AssetTypeVo{
   
    return this.assetTypes.find(asset=>asset.id==this.asset_type)
  }

  onSave(form: NgForm){  
    let formValue = form.value;
    debugger  
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
    assetDetails.note=formValue.note;
    assetDetails.asset_date=formValue.asset_date;
    console.log(form.value.product_type);
    if(form.value.assetDate!=null){
     assetDetails.asset_date=formValue.asset_date;
      // assetDetails.date = this.datePipe.transform(formValue.date);
    }
    assetDetails.asset_value=formValue.asset_value;
    
    console.log(assetDetails);
    this.saveAssetDetails(assetDetails);
    form.reset();
  }

  saveAssetDetails(assetDetails){
    const formData = new FormData();
    debugger
    if(this.file != undefined){
      // Set image name
      const fileName = "PURCHASE"+".xlsx" ;
      // Get blob image from base64string
     


      
      // this.client = form.value;
      formData.append('assetDetails', JSON.stringify(assetDetails));
      formData.append('file',this.file, this.file.name);
    }else{
      formData.append('assetDetails', JSON.stringify(assetDetails));
      formData.append('file', null);
    }
    console.log(formData);
    
    this.assetsService.saveAssets(formData).subscribe((data)=>{
      console.log(data);
      debugger
      if(data !== undefined && data !== null &&  data.operationStatus === "SUCCESS"){
        
        this.alertMsg=data.operationMessage;
        this.success=true;
        
      } else {
        this.isError=true;
        this.alertMsg=data.operationMessage;
      }
      
  });
}

onChange(event) {
  this.file = event.target.files[0];
}


}

