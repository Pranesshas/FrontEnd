import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetsService } from '../Services/assets.service';
import { AssetDetailsVo } from '../models/Asset-details-vo';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

  totalAssets: any[] = [];
  assetTypes: any;
  assetcount:number;
  private defaultPageSize : number = 10;
  private searchObject: AssetDetailsVo = new AssetDetailsVo();

  constructor(private assetsService: AssetsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setDefaultPageSize();
    this.defaultPageNumber();
    this.searchList(this.searchObject);
    this.getAssetTypes(); 
  }

  private setDefaultPageSize(){
    this.searchObject.page_size = this.defaultPageSize;
  }

  getAssets() {
    this.assetsService.getAssets().subscribe((data) => {
      this.totalAssets = data;
    })
  }

  onScroll(): void {
      this.incrementPageNumber();
      this.searchList(this.searchObject);
  }

  private incrementPageNumber(): void {
    this.searchObject.page_number += 1;
  }

  private defaultPageNumber(): void {
    this.searchObject.page_number = 0;
  }

  getAssetTypes() {
    this.assetsService.getAssetTypes().subscribe((data) => {
      this.assetTypes = data;
      console.log(this.assetTypes);
    })
  }
  onClick(id) {
    this.router.navigate(["/map/" + id]);
  }

  onSubmit(form: NgForm) {
    let formValue = form.value;
    let assetDetails: AssetDetailsVo = new AssetDetailsVo();
    assetDetails.product_id = formValue.product_id;
    assetDetails.product_name = formValue.product;
    assetDetails.make = formValue.brand;
    assetDetails.processor = formValue.processor;
    assetDetails.product_number = formValue.product_no;
    assetDetails.laptop_number = formValue.laptop_no;
    assetDetails.ram = formValue.ram;
    assetDetails.hdd = formValue.hdd;
    assetDetails.cd_rom = formValue.cd_rom;
    assetDetails.os = formValue.os;
    assetDetails.model_no = formValue.model_no;
    assetDetails.asset_date = formValue.date;
    assetDetails.is_active = formValue.is_active;
    assetDetails.is_available = formValue.is_available;
    assetDetails.is_declared = formValue.is_declared;
    assetDetails.is_old = formValue.is_old;
    assetDetails.asset_number = formValue.asset_number;
    assetDetails.product_type = form.value.product_type;
    console.log(form.value.product_type);

    console.log(assetDetails);
    this.saveAssetDetails(assetDetails);
  }

  onSearch(form: NgForm) {
    let formValue = form.value;
    this.searchObject.product_id = formValue.product_id;
    this.searchObject.product_name = formValue.product;
    this.searchObject.make = formValue.brand;
    this.searchObject.processor = formValue.processor;
    this.searchObject.product_number = formValue.product_no;
    this.searchObject.laptop_number = formValue.laptop_no;
    this.searchObject.ram = formValue.ram;
    this.searchObject.hdd = formValue.hdd;
    this.searchObject.cd_rom = formValue.cd_rom;
    this.searchObject.os = formValue.os;
    this.searchObject.model_no = formValue.model_no;
    this.searchObject.asset_date = formValue.asset_date;
    this.searchObject.is_active = formValue.is_active;
    this.searchObject.is_available = formValue.is_available;
    this.searchObject.is_declared = formValue.is_declared;
    this.searchObject.is_old = formValue.is_old;
    this.searchObject.product_type = form.value.product_type;
    this.searchObject.asset_number = formValue.asset_number;


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
    this.defaultPageNumber();
    this.searchList(this.searchObject);
  }
  searchList(searchObject: AssetDetailsVo): void {
    this.assetsService.searchAssets(searchObject).subscribe((data) => {
      this.totalAssets = !!searchObject.page_number ? this.totalAssets.concat(data.assetList) : data.assetList;
      this.assetcount=data.assetCount;
      console.log(data);
    });
  }

  saveAssetDetails(assetDetails) {
    this.assetsService.saveAssets(assetDetails).subscribe((data) => {
      console.log(data);
    });
  }

  onCancel(form: NgForm) {
    form.reset();
  }

}


