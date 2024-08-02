export interface BookType {
    ISBN?:number,
    title:string
    url:string,
    author:string,
    yearOfPublication?:number,
    discount?:number,
    price?:number
}

export interface Books {
    Id?:number,
    Title:string
    Image:string,
    authors:string,
    yearOfPublication?:number,
    discount?:number,
    Price?:number
    User_id:string
    review_summary?:string
    review_text?:string
    descriptions?:string
    publisher?:string
    categories?:string
    ratingsCount?:number
    sentiment_label?:number
}