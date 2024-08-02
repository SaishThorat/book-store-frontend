export interface CartType{
    id:number,
    unit:number
    user:UserDetails,
    Book:BookDetails
}

 interface UserDetails{
    id:number,
    name:string,
}

interface BookDetails{
    Title:string,
    Price:number,
    Image:string,
    authors:string
   
}