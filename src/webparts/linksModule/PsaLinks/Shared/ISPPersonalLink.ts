export interface ISPPersonalLink{
  ID:number;
  Title:string;
  Link_x0020_category:string;
  Link_x0027_s_x0020_web_x0020_add: ISPLink;
  Order0:number;
}
export interface ISPLink{
    Url: string,
    Description: string
}
export interface ICategory{
  name:string,
  links:ISPPersonalLink[]
}