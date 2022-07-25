export class Pagination {
    page_number: number = 0;
    page_size: number = 0;
}

export class UserMapVo extends Pagination{
    user_id : number;
    asset_id:number;
     name: String;
     project : String;
    make: String;
    product_type : String;
    model_no: String;
    product_number: String;
    
}