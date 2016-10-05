import { Component, OnInit, Inject, Input } from '@angular/core';
import { ISPPersonalLink, ICategory } from './../../Shared/ISPPersonalLink';
import { MockPsaLinksListService } from './../../Shared/MockPsaLinksListService';
import { PsaLinksListService } from './../../Shared/PsaLinksListService';
import { Injectable } from '@angular/core';

@Component({
  selector: 'psa-categories',
   templateUrl: '$BASEURL$PsaLinks/PsaLinksWebPartComponent/PsaCategoriesComponent/PsaCategoriesComponent.html',
   providers:[MockPsaLinksListService]
})
export class PsaCategoriesComponent implements OnInit {
  @Input("server-url") serverUrl:string;
  _mockPsaLinksListService:MockPsaLinksListService;
  _psaLinksListService: PsaLinksListService;
  constructor(@Inject(MockPsaLinksListService) mockService:MockPsaLinksListService, @Inject(PsaLinksListService) psaLinksListService:PsaLinksListService ) {
    this._mockPsaLinksListService = mockService;
    this._psaLinksListService = psaLinksListService;
   }
  categories:ICategory[]=[];
  links:ISPPersonalLink[];
  ngOnInit() {
    if(this.serverUrl === ""){
      this._mockPsaLinksListService.getLinks().subscribe(links=>{this.transformResponse(links)});
    }else{
      this._psaLinksListService.getLinks(this.serverUrl).subscribe(links=>{this.transformResponse(links)});
    }
   }
   private transformResponse(links:ISPPersonalLink[]){
        links.forEach(link=>{
        let categoriesFound = this.categories.filter(x=>x.name ==link.Link_x0020_category);
        if(categoriesFound.length === 0){
          let newCategory:ICategory = {
            name : link.Link_x0020_category,
            links : [link]
          }
          this.categories.push(newCategory);
        }else{
          categoriesFound[0].links.push(link);
        }
      });
  }
}